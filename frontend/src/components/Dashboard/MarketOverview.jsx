import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function MarketOverview({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-8 backdrop-blur-xl shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
          Market Overview
        </h2>
        <p className="text-slate-400 text-sm">
          No market data available.
        </p>
      </div>
    );
  }

  const sortedCoins = [...coins].sort(
    (a, b) => b.change - a.change
  );

  const topGainers = sortedCoins
    .filter((coin) => coin.change >= 0)
    .slice(0, 3);

  const topLosers = [...sortedCoins]
    .reverse()
    .filter((coin) => coin.change < 0)
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg space-y-7">

      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Market Overview
        </h2>
        <p className="text-slate-400 text-xs font-medium mt-1">
          Top market movers across supported assets
        </p>
      </div>

      {/* Top Gainers */}
      <div>
        <h3 className="text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
          <FaArrowTrendUp />
          Top Gainers
        </h3>

        <div className="space-y-3">
          {topGainers.map((coin) => (
            <div
              key={coin.symbol}
              className="flex justify-between items-center p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-sm">
                  {coin.symbol[0]}
                </div>

                <div>
                  <h4 className="text-white text-sm font-semibold tracking-tight">
                    {coin.name}
                  </h4>
                  <p className="text-slate-500 text-xs font-mono uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h4 className="text-slate-200 text-sm font-bold font-mono">
                  $
                  {coin.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </h4>

                <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold mt-0.5">
                  +{coin.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div>
        <h3 className="text-rose-400 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
          <FaArrowTrendDown />
          Top Losers
        </h3>

        <div className="space-y-3">
          {topLosers.length === 0 ? (
            <div className="text-slate-500 text-xs py-2 italic">
              No losing assets right now.
            </div>
          ) : (
            topLosers.map((coin) => (
              <div
                key={coin.symbol}
                className="flex justify-between items-center p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-rose-500/40 hover:bg-slate-900/90 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold text-rose-400 text-sm">
                    {coin.symbol[0]}
                  </div>

                  <div>
                    <h4 className="text-white text-sm font-semibold tracking-tight">
                      {coin.name}
                    </h4>

                    <p className="text-slate-500 text-xs font-mono uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h4 className="text-slate-200 text-sm font-bold font-mono">
                    $
                    {coin.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </h4>

                  <span className="inline-block px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 font-mono text-xs font-bold mt-0.5">
                    {coin.change}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}