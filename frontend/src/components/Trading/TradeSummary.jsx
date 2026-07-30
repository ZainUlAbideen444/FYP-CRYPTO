import { FaWallet } from "react-icons/fa";
import {
  FaBitcoin,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaShieldHalved,
  FaChartLine,
} from "react-icons/fa6";

export default function TradeSummary({ trade }) {
  const portfolioValue = trade.portfolio.reduce(
    (total, coin) => total + coin.currentValue,
    0
  );

  const investedValue = trade.portfolio.reduce(
    (total, coin) => total + coin.investedAmount,
    0
  );

  const profitLoss = portfolioValue - investedValue;

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#0B0E17]/95 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full min-h-[620px]">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-sky-400 text-base" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Account Terminal
            </h2>
          </div>
          <span className="text-[10px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded">
            DEMO ACCOUNT
          </span>
        </div>

        {/* Available Margin / Wallet Card */}
        <div className="rounded-xl border border-slate-800 bg-[#121827] p-5 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <FaWallet className="text-sky-400" /> Margin Available
            </span>
            <span className="text-[10px] font-mono text-slate-400">USDT</span>
          </div>
          <div className="text-3xl font-mono font-bold text-slate-100 tracking-tight">
            ${trade.wallet.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-2 flex items-center gap-1">
            <FaShieldHalved className="text-slate-600" /> Protected Virtual Balance
          </p>
        </div>

        {/* Position Analytics */}
        <div className="rounded-xl border border-slate-800 bg-[#121827] p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
              <FaBitcoin className="text-amber-400" /> Portfolio Stats
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Active Positions</span>
              <span className="text-slate-200 font-bold bg-slate-800 px-2 py-0.5 rounded">
                {trade.portfolio.length} Assets
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Market Valuation</span>
              <span className="text-slate-100 font-bold">
                ${portfolioValue.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Invested</span>
              <span className="text-slate-300">
                ${investedValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* PnL Card */}
        <div
          className={`rounded-xl p-5 border shadow-lg transition-all ${
            profitLoss >= 0
              ? "bg-emerald-950/20 border-emerald-500/30"
              : "bg-rose-950/20 border-rose-500/30"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold flex items-center gap-1.5">
              {profitLoss >= 0 ? (
                <FaArrowTrendUp className="text-emerald-400" />
              ) : (
                <FaArrowTrendDown className="text-rose-400" />
              )}
              Unrealized PnL
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                profitLoss >= 0
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/20 text-rose-400"
              }`}
            >
              {profitLoss >= 0 ? "PROFIT" : "LOSS"}
            </span>
          </div>

          <div
            className={`text-2xl font-mono font-bold tracking-tight ${
              profitLoss >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {profitLoss >= 0 ? "+" : "-"}
            ${Math.abs(profitLoss).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Execution Feedback Notification */}
      {trade.feedback && (
        <div
          className={`mt-4 rounded-xl p-3.5 text-xs font-mono font-semibold text-center border ${
            trade.feedback.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
          }`}
        >
          {trade.feedback.message}
        </div>
      )}
    </div>
  );
}