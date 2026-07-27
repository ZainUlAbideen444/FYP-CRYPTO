import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function TransactionTable({
  transactions = [],
  search = "",
  filter = "ALL",
  sort = "NEWEST",
}) {
  let filtered = [...transactions];

  // Search
  if (search.trim()) {
    const query = search.toLowerCase();

    filtered = filtered.filter(
      (tx) =>
        tx.coin.toLowerCase().includes(query) ||
        tx.symbol.toLowerCase().includes(query)
    );
  }

  // Filter
  if (filter !== "ALL") {
    filtered = filtered.filter(
      (tx) => tx.type === filter
    );
  }

  // Sort
  switch (sort) {
    case "OLDEST":
      filtered.reverse();
      break;

    case "HIGH":
      filtered.sort((a, b) => b.total - a.total);
      break;

    case "LOW":
      filtered.sort((a, b) => a.total - b.total);
      break;

    default:
      break;
  }

  if (!filtered.length) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-16 text-center">
        <h2 className="text-2xl text-white font-bold mb-3">
          No Transactions Found
        </h2>

        <p className="text-gray-500">
          Your trading history will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <div className="hidden lg:block overflow-hidden rounded-3xl border border-[#242424] bg-[#111111]">

        <table className="w-full">

          <thead className="bg-[#181818]">

            <tr className="text-left">

              <th className="px-6 py-5 text-gray-400">
                Type
              </th>

              <th className="px-6 py-5 text-gray-400">
                Coin
              </th>

              <th className="px-6 py-5 text-gray-400">
                Quantity
              </th>

              <th className="px-6 py-5 text-gray-400">
                Price
              </th>

              <th className="px-6 py-5 text-gray-400">
                Total
              </th>

              <th className="px-6 py-5 text-gray-400">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((tx) => (

              <tr
                key={tx.id}
                className="border-t border-[#242424] hover:bg-[#181818] transition"
              >

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
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

                </td>

                <td className="px-6 py-5">

                  <div>

                    <h3 className="text-white font-semibold">
                      {tx.coin}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {tx.symbol}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-5 text-white">
                  {Number(tx.quantity).toFixed(4)}
                </td>

                <td className="px-6 py-5 text-white">
                  $
                  {Number(tx.price).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="px-6 py-5 font-bold text-white">
                  $
                  {Number(tx.total).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="px-6 py-5 text-gray-400 text-sm">
                  {tx.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden space-y-5">

        {filtered.map((tx) => (

          <div
            key={tx.id}
            className="bg-[#111111] border border-[#242424] rounded-3xl p-6"
          >

            <div className="flex justify-between items-center mb-5">

              <div>

                <h3 className="text-xl text-white font-bold">
                  {tx.coin}
                </h3>

                <p className="text-gray-500">
                  {tx.symbol}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  tx.type === "BUY"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {tx.type}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <Info
                label="Quantity"
                value={Number(tx.quantity).toFixed(4)}
              />

              <Info
                label="Price"
                value={`$${Number(tx.price).toLocaleString()}`}
              />

              <Info
                label="Total"
                value={`$${Number(tx.total).toLocaleString()}`}
              />

              <Info
                label="Date"
                value={tx.date}
              />

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">
        {label}
      </p>

      <p className="text-white font-semibold break-words">
        {value}
      </p>
    </div>
  );
}