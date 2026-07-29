import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function RecentTransactions({
  transactions = [],
}) {
  const recent = transactions.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 sm:p-8 backdrop-blur-xl shadow-lg h-full">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Recent Transactions
          </h2>

          <p className="text-slate-400 text-xs font-medium mt-0.5">
            Your latest buy and sell executions
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono font-bold">
          {transactions.length} Total
        </span>
      </div>

      {recent.length === 0 ? (
        <div className="flex justify-center items-center h-52 border border-dashed border-slate-800 rounded-xl">
          <div className="text-center px-4">
            <h3 className="text-sm text-slate-300 font-semibold mb-1">
              No Transactions Recorded
            </h3>

            <p className="text-slate-500 text-xs">
              Execute a trade in the terminal to view activity logs.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map((tx) => (
            <div
              key={tx._id}
              className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm border ${
                    tx.type === "buy"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  }`}
                >
                  {tx.type === "buy" ? (
                    <FaArrowTrendUp />
                  ) : (
                    <FaArrowTrendDown />
                  )}
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">
                    {tx.name}
                  </h3>

                  <p className="text-slate-500 text-xs font-mono uppercase">
                    {tx.symbol}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:flex items-center gap-4 sm:gap-8 font-mono text-xs">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase font-sans">
                    Quantity
                  </p>

                  <p className="text-slate-200 font-semibold">
                    {tx.quantity.toFixed(4)}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 text-[10px] uppercase font-sans">
                    Executed
                  </p>

                  <p className="text-slate-200 font-semibold">
                    $
                    {tx.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md font-bold ${
                      tx.type === "buy"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {tx.type.toUpperCase()}
                  </span>

                  <p className="text-slate-500 text-[10px] font-sans mt-0.5">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}