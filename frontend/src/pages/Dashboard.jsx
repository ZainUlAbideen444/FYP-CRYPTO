import React from "react";
import { Link } from "react-router-dom";
import { useTradeContext } from "../context/TradeContext";
import { useMarketContext } from "../context/MarketContext";
import { CoinIcon } from "../utils/getCoinIcons";
import { 
  FaWallet, 
  FaChartLine, 
  FaArrowTrendUp, 
  FaCoins, 
  FaRightLeft, 
  FaBriefcase, 
  FaStore 
} from "react-icons/fa6";

export default function Dashboard() {
  const { 
    wallet = 10000, 
    portfolio = [], 
    transactions = [], 
    loading: tradeLoading 
  } = useTradeContext();
  
  const { coins = [], loading: marketLoading } = useMarketContext();

  const loading = tradeLoading || marketLoading;

  // 1. Compute Portfolio Metrics Live
  const processedHoldings = portfolio.map((item) => {
    const symbol = String(item.symbol || item.coinSymbol || item.coinId || "").toUpperCase();
    const liveCoin = coins.find(
      (c) => c.symbol?.toUpperCase() === symbol || c.id?.toLowerCase() === symbol.toLowerCase()
    );

    const quantity = Number(item.quantity || item.amount || 0);
    const currentPrice = Number(liveCoin?.price || liveCoin?.current_price || item.currentPrice || 0);
    const avgBuyPrice = Number(
      item.avgBuyPrice ?? item.buyPrice ?? item.priceAtPurchase ?? currentPrice
    );

    const currentValue = quantity * currentPrice;
    const totalCost = Number(item.investedAmount ?? (quantity * avgBuyPrice));
    const pnl = currentValue - totalCost;

    return {
      ...item,
      symbol,
      liveCoin,
      quantity,
      currentPrice,
      currentValue,
      totalCost,
      pnl,
    };
  });

  const portfolioValue = processedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalCostBasis = processedHoldings.reduce((sum, h) => sum + h.totalCost, 0);
  const totalProfit = portfolioValue - totalCostBasis;
  const assetsOwnedCount = processedHoldings.filter((h) => h.quantity > 0).length;

  // Formatting helpers
  const formatUSD = (val) =>
    `$${Number(val || 0).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <div className="p-12 text-center font-mono text-slate-400">
        Loading dashboard live metrics...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
            Trading Overview
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Monitor live markets, portfolio metrics, and execute simulated trades.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/market"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono text-xs font-semibold rounded-xl transition-all"
          >
            Markets
          </Link>
          <Link
            to="/trade"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10"
          >
            Open Trading Desk
          </Link>
        </div>
      </div>

      {/* Metric Cards Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {/* Wallet Balance */}
        <div className="bg-[#0B0E17] border border-slate-800/80 p-4 rounded-xl flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <FaWallet className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Wallet Balance
            </span>
            <div className="text-xl font-bold text-emerald-400">
              {formatUSD(wallet)}
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            • LIVE
          </span>
        </div>

        {/* Portfolio Value */}
        <div className="bg-[#0B0E17] border border-slate-800/80 p-4 rounded-xl flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-2">
              <FaChartLine className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Portfolio Value
            </span>
            <div className="text-xl font-bold text-white">
              {formatUSD(portfolioValue)}
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            • LIVE
          </span>
        </div>

        {/* Total Profit */}
        <div className="bg-[#0B0E17] border border-slate-800/80 p-4 rounded-xl flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <FaArrowTrendUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Total Profit
            </span>
            <div className={`text-xl font-bold ${totalProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {totalProfit >= 0 ? "+" : "-"}{formatUSD(Math.abs(totalProfit))}
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            • LIVE
          </span>
        </div>

        {/* Assets Owned */}
        <div className="bg-[#0B0E17] border border-slate-800/80 p-4 rounded-xl flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
              <FaCoins className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Assets Owned
            </span>
            <div className="text-xl font-bold text-amber-400">
              {assetsOwnedCount}
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            • LIVE
          </span>
        </div>
      </div>

      {/* Middle Row: Portfolio Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <div className="lg:col-span-2 bg-[#0B0E17] border border-slate-800/80 rounded-xl p-5">
          <h2 className="text-sm font-bold font-mono text-white mb-4">
            Portfolio Overview
          </h2>
          {processedHoldings.length === 0 ? (
            <div className="border border-dashed border-slate-800/80 rounded-lg p-12 text-center space-y-2">
              <p className="font-mono text-xs font-bold text-slate-300">No Assets Yet</p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Buy your first cryptocurrency to unlock real-time performance and distribution analytics.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-800/60 rounded-lg">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40 uppercase">
                    <th className="p-3">Asset</th>
                    <th className="p-3">Holding</th>
                    <th className="p-3">Current Price</th>
                    <th className="p-3">Value</th>
                    <th className="p-3 text-right">PnL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {processedHoldings.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-900/30">
                      <td className="p-3 flex items-center gap-2">
                        <CoinIcon coin={h.liveCoin || { symbol: h.symbol }} size="w-5 h-5" />
                        <span className="font-bold text-white uppercase">{h.symbol}</span>
                      </td>
                      <td className="p-3 text-slate-300">{h.quantity}</td>
                      <td className="p-3 text-slate-300">${h.currentPrice.toFixed(2)}</td>
                      <td className="p-3 text-white font-bold">${h.currentValue.toFixed(2)}</td>
                      <td className={`p-3 text-right font-bold ${h.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {h.pnl >= 0 ? "+" : "-"}${Math.abs(h.pnl).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0B0E17] border border-slate-800/80 rounded-xl p-5 space-y-4">
          <div>
            <h2 className="text-sm font-bold font-mono text-white">Quick Actions</h2>
            <p className="text-[11px] text-slate-500 font-mono">Fast shortcuts for core trading tools</p>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <Link
              to="/trade"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FaRightLeft className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-white block group-hover:text-emerald-400 transition-colors">Trade Crypto</span>
                <span className="text-[10px] text-slate-500">Execute market buys and sells.</span>
              </div>
            </Link>

            <Link
              to="/portfolio"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <FaBriefcase className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-white block group-hover:text-sky-400 transition-colors">View Portfolio</span>
                <span className="text-[10px] text-slate-500">Track your current coin holdings.</span>
              </div>
            </Link>

            <Link
              to="/market"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FaStore className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-white block group-hover:text-indigo-400 transition-colors">Markets</span>
                <span className="text-[10px] text-slate-500">Browse live CoinGecko prices.</span>
              </div>
            </Link>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FaWallet className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-white block">Virtual Wallet</span>
                <span className="text-[10px] text-slate-500">Check available trading cash.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Transactions & Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-[#0B0E17] border border-slate-800/80 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold font-mono text-white">Recent Transactions</h2>
              <p className="text-[11px] text-slate-500 font-mono">Your latest buy and sell executions</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
              {transactions.length} Total
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="border border-dashed border-slate-800/80 rounded-lg p-10 text-center space-y-1">
              <p className="font-mono text-xs font-bold text-slate-300">No Transactions Recorded</p>
              <p className="text-[11px] text-slate-500">Execute a trade in the terminal to view activity logs.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-800/60 rounded-lg font-mono text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40 uppercase text-[10px]">
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Asset</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5">Price</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {transactions.slice(0, 5).map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/30">
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.type === "BUY" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-2.5 font-bold text-white uppercase">{tx.symbol}</td>
                      <td className="p-2.5 text-slate-300">{tx.amount || tx.quantity}</td>
                      <td className="p-2.5 text-slate-300">${Number(tx.price).toFixed(2)}</td>
                      <td className="p-2.5 text-right text-slate-200 font-bold">
                        ${(Number(tx.amount || tx.quantity) * Number(tx.price)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Market Overview Sidebar */}
        <div className="bg-[#0B0E17] border border-slate-800/80 rounded-xl p-5">
          <h2 className="text-sm font-bold font-mono text-white mb-4">
            Market Overview
          </h2>
          {coins.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono">No market data available.</p>
          ) : (
            <div className="space-y-3 font-mono">
              {coins.slice(0, 5).map((coin) => {
                const price = Number(coin.price || coin.current_price || 0);
                const change = Number(coin.change || coin.price_change_percentage_24h || 0);
                return (
                  <div key={coin.id || coin.symbol} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/40">
                    <div className="flex items-center gap-2">
                      <CoinIcon coin={coin} size="w-5 h-5" />
                      <div>
                        <span className="font-bold text-white text-xs block uppercase">{coin.symbol}</span>
                        <span className="text-[9px] text-slate-500 block truncate max-w-[70px]">{coin.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">${price.toFixed(2)}</div>
                      <div className={`text-[10px] font-bold ${change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}