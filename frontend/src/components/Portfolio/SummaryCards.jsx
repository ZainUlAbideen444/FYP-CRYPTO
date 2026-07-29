import {
  FaWallet,
  FaChartLine,
  FaCoins,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function SummaryCards({
  wallet = 0,
  portfolio = [],
  portfolioValue = 0,
}) {
  const totalInvested = portfolio.reduce(
    (sum, coin) =>
      sum + Number(coin.investedAmount || coin.invested || 0),
    0
  );

  const profit = portfolioValue - totalInvested;

  const cards = [
    {
      title: "Wallet Balance",
      value: `$${wallet.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      icon: <FaWallet />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Portfolio Value",
      value: `$${portfolioValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      icon: <FaChartLine />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Net Profit / Loss",
      value: `${profit >= 0 ? "+" : ""}$${profit.toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      )}`,
      icon: profit >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />,
      color: profit >= 0 ? "text-emerald-400" : "text-rose-400",
      bg: profit >= 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20",
    },
    {
      title: "Assets Owned",
      value: portfolio.length,
      icon: <FaCoins />,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27]"
        >
          <div className="flex justify-between items-center mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${card.bg} ${card.color} transition-transform group-hover:scale-105`}
            >
              {card.icon}
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-slate-800 bg-slate-900/80 text-slate-400">
              LIVE
            </span>
          </div>

          <h3 className="text-slate-400 text-xs font-semibold tracking-wider uppercase mb-1">
            {card.title}
          </h3>

          <h2 className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}