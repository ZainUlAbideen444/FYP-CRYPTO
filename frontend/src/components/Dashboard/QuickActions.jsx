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
    description: "Buy and sell cryptocurrencies.",
    icon: <FaArrowRightArrowLeft />,
    link: "/trading",
    color: "bg-red-600",
  },
  {
    title: "View Portfolio",
    description: "Track your crypto holdings.",
    icon: <FaChartPie />,
    link: "/portfolio",
    color: "bg-blue-600",
  },
  {
    title: "Market",
    description: "Browse live market prices.",
    icon: <FaChartLine />,
    link: "/market",
    color: "bg-green-600",
  },
  {
    title: "Wallet",
    description: "Check your virtual balance.",
    icon: <FaWallet />,
    link: "/portfolio",
    color: "bg-yellow-600",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8 h-full">
      <h2 className="text-2xl font-bold text-white mb-2">
        Quick Actions
      </h2>

      <p className="text-gray-500 mb-8">
        Navigate quickly through your trading dashboard.
      </p>

      <div className="space-y-5">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="group flex items-center gap-5 p-5 rounded-2xl bg-[#181818] border border-[#242424] hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl ${action.color}`}
            >
              {action.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-white font-semibold group-hover:text-red-400 transition">
                {action.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}