import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function HoldingsTable({ portfolio = [] }) {
  if (!portfolio.length) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-12 text-center backdrop-blur-xl shadow-lg">
        <h2 className="text-xl text-white font-bold mb-2">
          No Holdings Found
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          You don't own any digital assets yet. Execute trades on the market desk to start constructing your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 overflow-hidden backdrop-blur-xl shadow-lg">

      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 text-slate-400 font-mono text-xs uppercase tracking-wider font-semibold">
        <div>Asset</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Avg Buy</div>
        <div className="text-center">Current</div>
        <div className="text-center">Invested</div>
        <div className="text-center">Value</div>
        <div className="text-right">P/L</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-800/50">
        {portfolio.map((item) => {
          const currentPrice = Number(item.currentPrice || 0);
          const avgBuy = Number(item.averageBuyPrice || 0);
          const invested = Number(item.investedAmount || 0);
          const quantity = Number(item.quantity || 0);

          const currentValue =
            item.currentValue ??
            currentPrice * quantity;

          const profit =
            item.profitLoss ??
            currentValue - invested;

          const profitPercent =
            item.profitLossPercent ??
            (invested > 0
              ? (profit / invested) * 100
              : 0);

          return (
            <div
              key={item._id || item.symbol}
              className="grid grid-cols-7 gap-4 items-center px-6 py-4 hover:bg-slate-800/30 transition-colors"
            >
              {/* Asset Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                  {item.symbol?.[0]}
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm leading-none">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mt-1">
                    {item.symbol}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="text-center text-slate-200 font-mono text-sm">
                {quantity.toFixed(4)}
              </div>

              {/* Avg Buy */}
              <div className="text-center text-slate-400 font-mono text-sm">
                $
                {avgBuy.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>

              {/* Current Price */}
              <div className="text-center text-white font-mono text-sm">
                $
                {currentPrice.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>

              {/* Invested */}
              <div className="text-center text-slate-400 font-mono text-sm">
                $
                {invested.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>

              {/* Current Value */}
              <div className="text-center text-white font-mono font-bold text-sm">
                $
                {currentValue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>

              {/* Profit / Loss */}
              <div className="text-right">
                <div
                  className={`inline-flex items-center justify-end gap-1.5 font-mono text-sm font-bold ${
                    profit >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {profit >= 0 ? (
                    <FaArrowTrendUp className="text-xs" />
                  ) : (
                    <FaArrowTrendDown className="text-xs" />
                  )}
                  <span>
                    {profit >= 0 ? "+" : ""}
                    {profit.toFixed(2)}
                  </span>
                </div>
                <div
                  className={`text-[11px] font-mono ${
                    profit >= 0 ? "text-emerald-500/80" : "text-rose-500/80"
                  }`}
                >
                  ({profitPercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}