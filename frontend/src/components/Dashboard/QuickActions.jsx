import { Link } from "react-router-dom";
import {
  FaArrowRightArrowLeft,
  FaChartPie,
  FaChartLine,
  FaWallet,
} from "react-icons/fa6";

const actions = [
  {
    title: "Trade Crypto",
    description: "Execute market buys and sells.",
    icon: <FaArrowRightArrowLeft />,
    link: "/trading",
    iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    title: "View Portfolio",
    description: "Track your current coin holdings.",
    icon: <FaChartPie />,
    link: "/portfolio",
    iconBg: "bg-teal-500/10 border-teal-500/20 text-teal-400",
  },
  {
    title: "Markets",
    description: "Browse live CoinGecko prices.",
    icon: <FaChartLine />,
    link: "/market",
    iconBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  },
  {
    title: "Virtual Wallet",
    description: "Check available trading cash.",
    icon: <FaWallet />,
    link: "/portfolio",
    iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-6 backdrop-blur-xl shadow-lg h-full">
      <div className="border-b border-slate-800/80 pb-4 mb-5">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Quick Actions
        </h2>
        <p className="text-slate-400 text-xs font-medium mt-1">
          Fast shortcuts for core trading tools
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg border ${action.iconBg} group-hover:scale-105 transition-transform duration-200`}
            >
              {action.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-slate-200 font-bold text-sm group-hover:text-emerald-400 transition-colors tracking-tight">
                {action.title}
              </h3>

              <p className="text-slate-400 text-xs truncate">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}