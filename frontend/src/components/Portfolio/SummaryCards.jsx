import {
  FaWallet,
  FaChartLine,
  FaCoins,
  FaArrowTrendUp,
} from "react-icons/fa6";

export default function SummaryCards({
  wallet,
  portfolio,
  portfolioValue,
}) {
  const totalInvested = portfolio.reduce(
    (sum, coin) => sum + coin.invested,
    0
  );

  const profit = portfolioValue - totalInvested;

  const totalCoins = portfolio.reduce(
    (sum, coin) => sum + coin.quantity,
    0
  );

  const cards = [
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
      title: "Profit / Loss",
      value: `${profit >= 0 ? "+" : ""}$${profit.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      icon: <FaArrowTrendUp />,
      color: profit >= 0 ? "text-green-400" : "text-red-400",
      bg: profit >= 0 ? "bg-green-500/10" : "bg-red-500/10",
    },
    {
      title: "Assets Owned",
      value: totalCoins,
      icon: <FaCoins />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#111111] border border-[#242424] rounded-3xl p-6 transition-all duration-300 hover:border-red-500/40 hover:-translate-y-1"
        >
          <div className="flex justify-between items-center mb-6">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${card.bg} ${card.color}`}
            >
              {card.icon}
            </div>

            <span className="text-xs uppercase tracking-widest text-gray-500">
              Crypto Web
            </span>
          </div>

          <h4 className="text-gray-400 text-sm mb-2">
            {card.title}
          </h4>

          <h2 className={`text-3xl font-black ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}