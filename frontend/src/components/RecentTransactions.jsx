const transactions = [
  {
    coin: "Bitcoin",
    type: "BUY",
    amount: "0.05 BTC",
    price: "$118,000",
  },
  {
    coin: "Ethereum",
    type: "SELL",
    amount: "1.2 ETH",
    price: "$4,550",
  },
  {
    coin: "Solana",
    type: "BUY",
    amount: "5 SOL",
    price: "$238",
  },
];

export default function RecentTransactions() {
  return (
    <div className="bg-[#111111] border border-[#232323] rounded-3xl p-7">

      <h2 className="text-white text-2xl font-bold mb-8">
        Recent Transactions
      </h2>

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

          {transactions.map((t, index) => (

            <tr
              key={index}
              className="border-t border-[#222]"
            >

              <td className="py-5 text-white">
                {t.coin}
              </td>

              <td
                className={
                  t.type === "BUY"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {t.type}
              </td>

              <td className="text-gray-300">
                {t.amount}
              </td>

              <td className="text-right text-white">
                {t.price}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}