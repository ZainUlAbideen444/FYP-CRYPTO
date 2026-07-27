import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaMoneyBillTrendUp,
  FaReceipt,
} from "react-icons/fa6";

export default function TransactionStats({ transactions = [] }) {
  const buys = transactions.filter(
    (tx) => tx.type === "BUY"
  );

  const sells = transactions.filter(
    (tx) => tx.type === "SELL"
  );

  const totalBuy = buys.reduce(
    (sum, tx) => sum + tx.total,
    0
  );

  const totalSell = sells.reduce(
    (sum, tx) => sum + tx.total,
    0
  );

  const stats = [
    {
      title: "Total Transactions",
      value: transactions.length,
      icon: <FaReceipt />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Buy",
      value: `$${totalBuy.toLocaleString(undefined,{
        maximumFractionDigits:2,
      })}`,
      icon: <FaArrowTrendUp />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Sell",
      value: `$${totalSell.toLocaleString(undefined,{
        maximumFractionDigits:2,
      })}`,
      icon: <FaArrowTrendDown />,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Trading Volume",
      value: `$${(totalBuy + totalSell).toLocaleString(undefined,{
        maximumFractionDigits:2,
      })}`,
      icon: <FaMoneyBillTrendUp />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-[#111111] border border-[#242424] rounded-3xl p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>

            <span className="text-xs text-gray-500">
              LIVE
            </span>
          </div>

          <p className="text-gray-400 text-sm">
            {item.title}
          </p>

          <h2 className={`text-3xl font-black mt-2 ${item.color}`}>
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}