import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function RecentTransactions({
  transactions = [],
}) {
  const recent = transactions.slice(0, 5);

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

          <p className="text-gray-500">
            Your latest trading activity
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {transactions.length} Total
        </span>
      </div>

      {recent.length === 0 ? (
        <div className="flex justify-center items-center h-72">
          <div className="text-center">
            <h3 className="text-xl text-white font-semibold mb-2">
              No Transactions
            </h3>

            <p className="text-gray-500">
              Buy or sell crypto to see history.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {recent.map((tx) => (
            <div
              key={tx._id}
              className="flex justify-between items-center p-5 rounded-2xl border border-[#222] bg-[#181818] hover:border-red-500/30 transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                    tx.type === "buy"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {tx.type === "buy" ? (
                    <FaArrowTrendUp />
                  ) : (
                    <FaArrowTrendDown />
                  )}
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    {tx.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {tx.symbol}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Quantity
                </p>

                <p className="text-white font-semibold">
                  {tx.quantity.toFixed(4)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Price
                </p>

                <p className="text-white font-semibold">
                  $
                  {tx.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    tx.type === "buy"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.type.toUpperCase()}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}