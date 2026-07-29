export default function PortfolioOverview({
  portfolio,
  coins,
}) {
  if (!portfolio.length) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-8 backdrop-blur-xl shadow-lg h-full">
        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
          Portfolio Overview
        </h2>

        <div className="flex items-center justify-center h-64 border border-dashed border-slate-800 rounded-xl mt-4">
          <div className="text-center px-4">
            <h3 className="text-base font-semibold text-slate-300 mb-1">
              No Assets Yet
            </h3>

            <p className="text-slate-500 text-xs max-w-sm">
              Buy your first cryptocurrency to unlock real-time performance and distribution analytics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const assets = portfolio.map((asset) => {
    const liveCoin = coins.find(
      (coin) => coin.symbol === asset.symbol
    );

    const currentPrice =
      asset.currentPrice ??
      liveCoin?.price ??
      asset.averageBuyPrice;

    const value = asset.currentValue ?? currentPrice * asset.quantity;

    const profit = asset.profitLoss;

    return {
      ...asset,
      currentPrice,
      value,
      profit,
    };
  });

  const totalValue = assets.reduce(
    (sum, coin) => sum + coin.value,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 sm:p-8 backdrop-blur-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Portfolio Overview
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Real-time value and asset breakdown
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">
            Total Asset Value
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mt-0.5">
            $
            {totalValue.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>
      </div>

      <div className="space-y-5">
        {assets.map((coin) => {
          const percent =
            totalValue > 0
              ? (coin.value / totalValue) * 100
              : 0;

          return (
            <div
              key={coin.symbol}
              className="border border-slate-800/80 rounded-xl p-5 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {coin.symbol[0]}
                  </div>

                  <div>
                    <h3 className="text-white font-bold tracking-tight text-base">
                      {coin.name}
                    </h3>

                    <p className="text-slate-500 text-xs font-mono uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-slate-100 font-bold font-mono text-base">
                    $
                    {coin.value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </h3>

                  <span
                    className={`inline-block px-2 py-0.5 rounded-md font-mono text-xs font-bold mt-0.5 ${
                      coin.profit >= 0
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {coin.profit >= 0 ? "+" : ""}
                    ${coin.profit.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Asset Allocation Bar */}
              <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs font-mono bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-sans">
                    Quantity
                  </p>
                  <p className="text-slate-200 font-semibold mt-0.5">
                    {coin.quantity.toFixed(4)}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-sans">
                    Invested
                  </p>
                  <p className="text-slate-200 font-semibold mt-0.5">
                    $
                    {coin.investedAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="text-right sm:text-left">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-sans">
                    Current Price
                  </p>
                  <p className="text-slate-200 font-semibold mt-0.5">
                    $
                    {coin.currentPrice.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}