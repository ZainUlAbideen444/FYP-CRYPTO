import mongoose from "mongoose";
import User from "../models/User.js";
import Holding from "../models/Holding.js";
import Trade from "../models/Trade.js";
import { getQuote } from "../services/marketService.js";
import { getAnalytics } from "../services/portfolioService.js";
import { httpError } from "../utils/httpError.js";

function validQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 1e12)
    throw httpError(400, "Quantity must be a positive number.");
  return quantity;
}

async function execute(work) {
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      result = await work(session);
    });
    return result;
  } finally {
    await session.endSession();
  }
}

export async function buy(req, res, next) {
  try {
    const quantity = validQuantity(req.body.quantity || req.body.amount);
    const coinId = req.body.coinId || req.body.symbol?.toLowerCase();

    console.log("========== BUY ==========");
    console.log("User:", req.user._id);
    console.log("Coin:", coinId);
    console.log("Quantity:", quantity);

    const coin = await getQuote(coinId);
    console.log("Coin Found:", coin);

    const total = Number((coin.price * quantity).toFixed(8));
    if (total <= 0) throw httpError(400, "Order value must be positive.");

    await execute(async (session) => {
      const debit = await User.findOneAndUpdate(
        { _id: req.user._id, walletBalance: { $gte: total } },
        { $inc: { walletBalance: -total } },
        { new: true, session }
      );
      if (!debit) throw httpError(400, "Insufficient virtual balance.");

      console.log("Wallet Updated");

      const holding = await Holding.findOne({
        userId: req.user._id,
        coinId: coin.id,
      }).session(session);

      if (holding) {
        const newQuantity = holding.quantity + quantity;
        holding.averageBuyPrice =
          (holding.quantity * holding.averageBuyPrice + total) / newQuantity;
        holding.quantity = newQuantity;
        holding.investedAmount += total;
        await holding.save({ session });
      } else {
        await Holding.create(
          [
            {
              userId: req.user._id,
              coinId: coin.id,
              symbol: coin.symbol,
              name: coin.name,
              quantity,
              averageBuyPrice: coin.price,
              investedAmount: total,
            },
          ],
          { session }
        );
      }

      await Trade.create(
        [
          {
            userId: req.user._id,
            coinId: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            type: "buy",
            quantity,
            price: coin.price,
            totalValue: total,
          },
        ],
        { session }
      );
    });

    const user = await User.findById(req.user._id);
    const summary = await getAnalytics(user);

    // Safe Socket.io emit check
    const io = req.app.get("io");
    if (io) io.to(String(req.user._id)).emit("portfolio:updated", summary);

    return res.status(201).json({
      success: true,
      message: `Bought ${quantity} ${coin.symbol}.`,
      summary,
    });
  } catch (error) {
    console.error("BUY ERROR:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to execute buy order.",
    });
  }
}

export async function sell(req, res, next) {
  try {
    const quantity = validQuantity(req.body.quantity || req.body.amount);
    const rawCoin = (req.body.coinId || req.body.symbol || "").toLowerCase();

    console.log("========== SELL ==========");
    console.log("User:", req.user._id);
    console.log("Coin Request:", rawCoin);
    console.log("Quantity:", quantity);

    const coin = await getQuote(rawCoin);
    const total = Number((coin.price * quantity).toFixed(8));
    let realizedProfit = 0;

    await execute(async (session) => {
      // Find holding by exact coinId OR flexible matching for BNB/binancecoin
      const holdings = await Holding.find({ userId: req.user._id }).session(
        session
      );
      const holding = holdings.find(
        (h) =>
          h.coinId?.toLowerCase() === coin.id.toLowerCase() ||
          h.symbol?.toLowerCase() === coin.symbol.toLowerCase() ||
          (rawCoin === "bnb" && h.coinId?.toLowerCase().includes("binance"))
      );

      if (!holding || holding.quantity + 1e-10 < quantity) {
        throw httpError(
          400,
          `Insufficient holding. You own ${holding ? holding.quantity : 0} ${
            coin.symbol
          }.`
        );
      }

      realizedProfit = Number(
        ((coin.price - holding.averageBuyPrice) * quantity).toFixed(8)
      );
      const remaining = holding.quantity - quantity;

      if (remaining <= 1e-10) {
        await holding.deleteOne({ session });
      } else {
        holding.quantity = remaining;
        holding.investedAmount = remaining * holding.averageBuyPrice;
        await holding.save({ session });
      }

      await User.updateOne(
        { _id: req.user._id },
        { $inc: { walletBalance: total } },
        { session }
      );

      await Trade.create(
        [
          {
            userId: req.user._id,
            coinId: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            type: "sell",
            quantity,
            price: coin.price,
            totalValue: total,
            realizedProfit,
          },
        ],
        { session }
      );
    });

    const user = await User.findById(req.user._id);
    const summary = await getAnalytics(user);

    const io = req.app.get("io");
    if (io) io.to(String(req.user._id)).emit("portfolio:updated", summary);

    return res.status(201).json({
      success: true,
      message: `Sold ${quantity} ${coin.symbol}.`,
      realizedProfit,
      summary,
    });
  } catch (error) {
    console.error("SELL ERROR:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to execute sell order.",
    });
  }
}

export async function history(req, res) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 25, 1), 100);
    const [trades, total] = await Promise.all([
      Trade.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Trade.countDocuments({ userId: req.user._id }),
    ]);
    res.json({
      success: true,
      trades,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function summary(req, res) {
  try {
    const analytics = await getAnalytics(req.user);
    res.json({ success: true, summary: analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}