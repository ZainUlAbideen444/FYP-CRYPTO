import {
  FaWallet,
  FaChartLine,
  FaArrowTrendUp,
  FaPercent,
} from "react-icons/fa6";

export default function PerformanceStats({
  wallet,
  portfolioValue,
  invested,
}) {
  const profit = portfolioValue - invested;

  const roi =
    invested > 0
      ? ((profit / invested) * 100).toFixed(2)
      : "0.00";

  const stats = [
    {
      title: "Wallet Balance",
      value: `$${wallet.toLocaleString()}`,
      icon: <FaWallet />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Portfolio Value",
      value: `$${portfolioValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      icon: <FaChartLine />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Profit",
      value: `${profit >= 0 ? "+" : ""}$${profit.toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      )}`,
      icon: <FaArrowTrendUp />,
      color:
        profit >= 0
          ? "text-green-400"
          : "text-red-400",
      bg:
        profit >= 0
          ? "bg-green-500/10"
          : "bg-red-500/10",
    },
    {
      title: "ROI",
      value: `${roi}%`,
      icon: <FaPercent />,
      color:
        roi >= 0
          ? "text-yellow-400"
          : "text-red-400",
      bg:
        roi >= 0
          ? "bg-yellow-500/10"
          : "bg-red-500/10",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-[#111111] border border-[#242424] rounded-3xl p-6 hover:border-red-500/40 transition-all"
        >
          <div className="flex justify-between items-center mb-6">
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

          <h2
            className={`text-3xl font-black mt-2 ${item.color}`}
          >
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}