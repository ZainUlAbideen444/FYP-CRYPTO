import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function TransactionHistory({
  transactions = [],
}) {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg">
        <h2 className="text-lg font-bold text-white mb-2">
          Trade Log History
        </h2>
        <p className="py-8 text-center text-slate-400 text-xs">
          No historical transaction records found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 overflow-hidden backdrop-blur-xl shadow-lg">

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Trade Log History
        </h2>

        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          {transactions.length} Logs
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">

        <div className="grid grid-cols-6 gap-4 px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 bg-slate-900/60 border-b border-slate-800/80">
          <div>Type</div>
          <div>Asset</div>
          <div>Quantity</div>
          <div>Unit Price</div>
          <div>Total</div>
          <div className="text-right">Timestamp</div>
        </div>

        <div className="divide-y divide-slate-800/50">
          {transactions.map((tx) => {
            const isBuy = String(tx.type).toLowerCase() === "buy";

            return (
              <div
                key={tx._id || tx.id}
                className="grid grid-cols-6 gap-4 items-center px-6 py-3.5 hover:bg-slate-800/30 transition-colors"
              >
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                      isBuy
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {isBuy ? (
                      <FaArrowTrendUp className="text-[10px]" />
                    ) : (
                      <FaArrowTrendDown className="text-[10px]" />
                    )}
                    {String(tx.type).toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm leading-none">
                    {tx.name || tx.coin}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mt-1">
                    {tx.symbol}
                  </p>
                </div>

                <div className="text-slate-200 font-mono text-sm">
                  {Number(tx.quantity).toFixed(4)}
                </div>

                <div className="text-slate-400 font-mono text-sm">
                  $
                  {Number(tx.price).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>

                <div className="font-mono font-bold text-white text-sm">
                  $
                  {Number(
                    tx.totalValue ?? tx.total
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>

                <div className="text-slate-400 text-xs font-mono text-right">
                  {new Date(
                    tx.createdAt ?? tx.date
                  ).toLocaleDateString()}{" "}
                  <span className="text-slate-400 text-[10px]">
                    {new Date(tx.createdAt ?? tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden p-4 space-y-3">
        {transactions.map((tx) => {
          const isBuy = String(tx.type).toLowerCase() === "buy";

          return (
            <div
              key={tx._id || tx.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold text-sm">
                    {tx.name || tx.coin}
                  </h3>
                  <p className="text-slate-400 font-mono text-xs">
                    {tx.symbol}
                  </p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${
                    isBuy
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {String(tx.type).toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800/60">
                <div>
                  <p className="text-slate-400">Quantity</p>
                  <p className="text-white">{Number(tx.quantity).toFixed(4)}</p>
                </div>

                <div>
                  <p className="text-slate-400">Price</p>
                  <p className="text-white">
                    $
                    {Number(tx.price).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Total</p>
                  <p className="text-emerald-400 font-bold">
                    $
                    {Number(
                      tx.totalValue ?? tx.total
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Date</p>
                  <p className="text-slate-300 text-[10px]">
                    {new Date(
                      tx.createdAt ?? tx.date
                    ).toLocaleDateString()}
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