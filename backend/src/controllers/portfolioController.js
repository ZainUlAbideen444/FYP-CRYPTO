import mongoose from "mongoose";
import User from "../models/User.js";
import Holding from "../models/Holding.js";
import Trade from "../models/Trade.js";
import { getPortfolio, getAnalytics } from "../services/portfolioService.js";
export async function portfolio(req, res) { res.json({ success: true, summary: await getAnalytics(req.user) }); }
export async function holdings(req, res) { res.json({ success: true, holdings: await getPortfolio(req.user._id) }); }
export async function performance(req, res) { const summary = await getAnalytics(req.user); res.json({ success: true, performance: { totalProfit: summary.totalProfit, totalProfitPercent: summary.totalProfitPercent, winLoss: summary.winLoss, recentTrades: summary.recentTrades } }); }
export async function reset(req, res) { const session = await mongoose.startSession(); try { await session.withTransaction(async () => { await User.updateOne({ _id: req.user._id }, { $set: { walletBalance: 10000 } }, { session }); await Holding.deleteMany({ userId: req.user._id }, { session }); await Trade.deleteMany({ userId: req.user._id }, { session }); }); } finally { await session.endSession(); } const user = await User.findById(req.user._id); const summary = await getAnalytics(user); req.app.get("io").to(String(req.user._id)).emit("portfolio:updated", summary); res.json({ success: true, message: "Portfolio reset to $10,000.", summary }); }
