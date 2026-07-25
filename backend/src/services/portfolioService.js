import Holding from "../models/Holding.js";
import Trade from "../models/Trade.js";
import { getQuote } from "./marketService.js";

export async function getPortfolio(userId) {
  const holdings = await Holding.find({ userId }).lean();
  const enriched = await Promise.all(holdings.map(async (holding) => {
    let price = holding.averageBuyPrice;
    try { price = (await getQuote(holding.coinId)).price; } catch { /* use last known average as resilient fallback */ }
    const currentValue = holding.quantity * price;
    return { ...holding, currentPrice: price, currentValue, profitLoss: currentValue - holding.investedAmount, profitLossPercent: holding.investedAmount ? ((currentValue - holding.investedAmount) / holding.investedAmount) * 100 : 0 };
  }));
  return enriched;
}
export async function getAnalytics(user) {
  const [holdings, trades] = await Promise.all([getPortfolio(user._id), Trade.find({ userId: user._id }).sort({ createdAt: -1 }).lean()]);
  const holdingsValue = holdings.reduce((sum, item) => sum + item.currentValue, 0);
  const invested = holdings.reduce((sum, item) => sum + item.investedAmount, 0);
  const unrealizedProfit = holdingsValue - invested;
  const closed = trades.filter((trade) => trade.type === "sell");
  const wins = closed.filter((trade) => trade.realizedProfit > 0).length;
  const losses = closed.filter((trade) => trade.realizedProfit < 0).length;
  const realizedProfit = closed.reduce((sum, trade) => sum + trade.realizedProfit, 0);
  return { walletBalance: user.walletBalance, holdings, recentTrades: trades.slice(0, 10), totalPortfolioValue: user.walletBalance + holdingsValue, holdingsValue, invested, unrealizedProfit, realizedProfit, totalProfit: unrealizedProfit + realizedProfit, totalProfitPercent: invested ? (unrealizedProfit / invested) * 100 : 0, winLoss: { wins, losses, ratio: losses ? wins / losses : wins }, allocation: holdings.map((item) => ({ symbol: item.symbol, name: item.name, value: item.currentValue, percentage: holdingsValue ? (item.currentValue / holdingsValue) * 100 : 0 })) };
}
