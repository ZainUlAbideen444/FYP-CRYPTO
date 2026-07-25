import { formatCurrency } from "../utils/formatCurrency";

export default function RecentTransactions({ transactions }) {
  return (
    <div className="bg-[#111111] border border-[#232323] rounded-3xl p-7">
      <h2 className="text-white text-2xl font-bold mb-8">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 py-6 text-center">
          No trades yet — head to the Trading page to get started.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-gray-400">
              <th className="text-left pb-4">Coin</th>
              <th className="text-left">Type</th>
              <th className="text-left">Amount</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((t) => (
              <tr key={t.id} className="border-t border-[#222]">
                <td className="py-5 text-white">{t.coin}</td>
                <td className={t.type === "BUY" ? "text-green-500" : "text-red-500"}>
                  {t.type}
                </td>
                <td className="text-gray-300">
                  {t.quantity} {t.symbol}
                </td>
                <td className="text-right text-white">{formatCurrency(t.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
