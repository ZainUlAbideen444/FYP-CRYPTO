import { motion } from "framer-motion";
import {
  FaWallet,
  FaBitcoin,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaWallet className="text-emerald-400 text-2xl" />,
    value: "$10,000",
    title: "Virtual Wallet",
    description: "Every new trader starts with $10,000 virtual funds.",
    accentColor: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: <FaBitcoin className="text-amber-400 text-2xl" />,
    value: "4+",
    title: "Supported Coins",
    description: "Bitcoin, Ethereum, BNB and Solana available for trading.",
    accentColor: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
  {
    icon: <FaChartLine className="text-cyan-400 text-2xl" />,
    value: "24/7",
    title: "Live Market",
    description: "Real-time cryptocurrency prices powered by CoinGecko.",
    accentColor: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: <FaShieldAlt className="text-indigo-400 text-2xl" />,
    value: "100%",
    title: "Risk Free",
    description: "Practice trading without investing real money.",
    accentColor: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
  },
];

export default function Stats() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            Platform Statistics
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built For Learning,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Designed Like A Real Exchange
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Crypto Web provides a professional trading environment using
            real-time prices, virtual funds and portfolio analytics to help
            beginners learn cryptocurrency trading safely.
          </p>
        </div>

        {/* Stats Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="group relative rounded-2xl border border-slate-800/80 bg-[#11151F]/80 p-6 sm:p-7 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27]"
            >
              {/* Top Card Gradient Highlight on Hover */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />

              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-xl border ${item.accentColor} flex items-center justify-center shadow-md`}
              >
                {item.icon}
              </div>

              {/* Number Stat */}
              <h3 className="mt-6 text-4xl font-extrabold text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                {item.value}
              </h3>

              {/* Title */}
              <h4 className="mt-2 text-lg font-bold text-slate-100">
                {item.title}
              </h4>

              {/* Description */}
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}