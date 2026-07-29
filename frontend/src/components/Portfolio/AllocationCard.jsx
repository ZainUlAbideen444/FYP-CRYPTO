export default function AllocationCard({ portfolio = [] }) {
  if (!portfolio.length) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg">
        <h2 className="text-lg font-bold text-white mb-2">
          Portfolio Allocation
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed">
          Asset allocation breakdown will appear here automatically once assets are acquired.
        </p>
      </div>
    );
  }

  const totalValue = portfolio.reduce(
    (sum, asset) =>
      sum + Number(asset.value || asset.currentValue || 0),
    0
  );

  const colors = [
    "bg-emerald-500",
    "bg-teal-400",
    "bg-cyan-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-amber-400",
    "bg-sky-400",
  ];

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Asset Distribution
          </h2>

          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {portfolio.length} Holdings
          </span>
        </div>

        <div className="space-y-5">
          {portfolio.map((asset, index) => {
            const value = Number(
              asset.value || asset.currentValue || 0
            );

            const percent =
              totalValue > 0
                ? (value / totalValue) * 100
                : 0;

            return (
              <div key={asset._id || asset.symbol}>
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <span className="text-white font-semibold text-sm">
                      {asset.name}
                    </span>
                    <span className="text-slate-400 font-mono text-xs ml-2">
                      {asset.symbol}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-white font-mono font-semibold text-sm">
                      $
                      {value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-emerald-400 font-mono text-xs font-bold ml-2">
                      {percent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800/60">
                  <div
                    className={`h-full rounded-full ${
                      colors[index % colors.length]
                    }`}
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800/80">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
            Total Evaluation
          </span>

          <span className="text-white font-mono font-extrabold text-lg">
            $
            {totalValue.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}