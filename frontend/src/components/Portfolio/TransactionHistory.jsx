import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function TransactionHistory({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Transaction History
        </h2>

        <div className="py-12 text-center">
          <p className="text-gray-500">
            No transactions available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-[#242424]">
        <h2 className="text-2xl font-bold text-white">
          Transaction History
        </h2>

        <span className="text-gray-500 text-sm">
          {transactions.length} Transactions
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-6 gap-4 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-gray-500 border-b border-[#242424]">
          <div>Type</div>
          <div>Coin</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
          <div>Date</div>
        </div>

        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="grid grid-cols-6 gap-4 items-center px-8 py-5 border-b border-[#1d1d1d] hover:bg-[#181818] transition"
          >
            {/* Type */}
            <div>
              <span
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm ${
                  tx.type === "BUY"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {tx.type === "BUY" ? (
                  <FaArrowTrendUp />
                ) : (
                  <FaArrowTrendDown />
                )}

                {tx.type}
              </span>
            </div>

            {/* Coin */}
            <div>
              <h3 className="text-white font-semibold">
                {tx.coin}
              </h3>

              <p className="text-gray-500 text-sm">
                {tx.symbol}
              </p>
            </div>

            {/* Qty */}
            <div className="text-white">
              {Number(tx.quantity).toFixed(4)}
            </div>

            {/* Price */}
            <div className="text-gray-300">
              $
              {Number(tx.price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Total */}
            <div className="font-semibold text-white">
              $
              {Number(tx.total).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Date */}
            <div className="text-gray-500 text-sm">
              {tx.date}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-5 space-y-5">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-[#181818] border border-[#242424] rounded-2xl p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-white font-semibold">
                  {tx.coin}
                </h3>

                <p className="text-gray-500 text-sm">
                  {tx.symbol}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  tx.type === "BUY"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {tx.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="text-white">
                  {Number(tx.quantity).toFixed(4)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Price</p>
                <p className="text-white">
                  $
                  {Number(tx.price).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Total</p>
                <p className="text-white font-semibold">
                  $
                  {Number(tx.total).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Date</p>
                <p className="text-white text-xs">
                  {tx.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}