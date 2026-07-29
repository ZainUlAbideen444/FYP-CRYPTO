import {
  FaWallet,
  FaBitcoin,
  FaChartLine,
  FaArrowTrendUp,
} from "react-icons/fa6";

export default function DashboardStats({
  wallet,
  portfolio,
  portfolioValue,
}) {
  const invested = portfolio.reduce(
    (sum, coin) => sum + coin.investedAmount,
    0
  );

  const profit = portfolioValue - invested;

  const stats = [
    {
      title: "Wallet Balance",
      value: `$${wallet.toLocaleString()}`,
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
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
    },
    {
      title: "Total Profit",
      value: `${profit >= 0 ? "+" : ""}$${profit.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      icon: <FaArrowTrendUp />,
      color: profit >= 0 ? "text-emerald-400" : "text-rose-400",
      bg: profit >= 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20",
    },
    {
      title: "Assets Owned",
      value: portfolio.length,
      icon: <FaBitcoin />,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27] hover:-translate-y-1 group"
        >
          {/* Subtle Corner Glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

          <div className="flex justify-between items-center mb-5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-105`}
            >
              {stat.icon}
            </div>

            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
            {stat.title}
          </h3>

          <h2 className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${stat.color}`}>
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}