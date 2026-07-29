import { formatCurrency, formatPercent } from "../utils/formatCurrency";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function MarketCard({ coin }) {
  const isPositive = coin.change24h >= 0;

  return (
    <div className="group relative rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27]">
      <div className="flex justify-between items-start">
        {/* Symbol / Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs group-hover:scale-105 transition-transform">
            {coin.symbol?.[0]}
          </div>

          <div>
            <h3 className="text-white font-bold text-sm tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
              {coin.name}
            </h3>
            <p className="text-slate-500 font-mono text-xs mt-1">
              {coin.symbol?.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Change Badge */}
        <span
          className={`inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded border ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}
        >
          {isPositive ? (
            <FaArrowTrendUp className="text-[10px]" />
          ) : (
            <FaArrowTrendDown className="text-[10px]" />
          )}
          {formatPercent(coin.change24h)}
        </span>
      </div>

      {/* Price Display */}
      <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-baseline justify-between">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Price</span>
        <h2 className="text-lg font-mono font-bold text-white tracking-tight">
          {formatCurrency(coin.price)}
        </h2>
      </div>
    </div>
  );
}