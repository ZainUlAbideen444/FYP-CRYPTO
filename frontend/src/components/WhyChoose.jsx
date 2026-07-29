import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaWallet,
  FaChartLine,
  FaCoins,
  FaUserGraduate,
  FaServer,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserGraduate />,
    title: "Beginner Friendly",
    text: "Practice trading with virtual money before entering the real crypto market.",
  },
  {
    icon: <FaCoins />,
    title: "Real-Time Prices",
    text: "Market data is powered by the CoinGecko API for realistic trading.",
  },
  {
    icon: <FaWallet />,
    title: "$10,000 Wallet",
    text: "Every account begins with a virtual balance to practice trading.",
  },
  {
    icon: <FaChartLine />,
    title: "Portfolio Analytics",
    text: "Track investments, profits, losses and overall performance.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Login",
    text: "JWT authentication with encrypted passwords protects your account.",
  },
  {
    icon: <FaServer />,
    title: "Modern MERN Stack",
    text: "Built using React, Node.js, Express and MongoDB Atlas.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#0A0D12] py-16 lg:py-24">

      {/* Ambient Lighting Gradients */}
      <div className="absolute left-[-150px] top-1/3 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute right-[-150px] bottom-1/3 h-[450px] w-[450px] rounded-full bg-teal-500/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT: Section Intro & Features Grid */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              Why Crypto Web
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">
              Learn Like A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Professional Trader
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-400">
              Crypto Web recreates a professional cryptocurrency trading
              environment using live prices, virtual trading, portfolio
              management and detailed analytics.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">

              {features.map((item, index) => (

                <div
                  key={index}
                  className="group relative rounded-2xl border border-slate-800/80 bg-[#11151F]/80 p-5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27]"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-lg shadow-inner group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-300">

                    {item.icon}

                  </div>

                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-emerald-400 transition-colors">

                    {item.title}

                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">

                    {item.text}

                  </p>

                </div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT: Live Portfolio Preview Card */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >

            <div className="rounded-3xl border border-slate-800/90 bg-[#11151F]/90 p-6 sm:p-7 shadow-[0_0_50px_-12px_rgba(16,185,129,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-slate-700">

              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">

                <div>

                  <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                    Portfolio Balance
                  </p>

                  <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    $12,486
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm">

                  <FaChartLine className="text-xl" />

                </div>

              </div>

              <div className="mt-5 space-y-2.5">

                <DashboardRow
                  coin="Bitcoin"
                  symbol="BTC"
                  amount="$6,245"
                  change="+8.4%"
                />

                <DashboardRow
                  coin="Ethereum"
                  symbol="ETH"
                  amount="$2,950"
                  change="+4.1%"
                />

                <DashboardRow
                  coin="BNB"
                  symbol="BNB"
                  amount="$1,865"
                  change="+2.9%"
                />

                <DashboardRow
                  coin="Solana"
                  symbol="SOL"
                  amount="$1,426"
                  change="+10.8%"
                />

              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">

                <Stat
                  value="24"
                  label="Trades"
                />

                <Stat
                  value="87%"
                  label="Win Rate"
                />

                <Stat
                  value="+18%"
                  label="Growth"
                />

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

function DashboardRow({ coin, symbol, amount, change }) {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-slate-800/60 bg-[#0B0E14]/60 p-3.5 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/40">

      <div>

        <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
          {coin}
        </h3>

        <p className="text-xs font-medium text-slate-500">
          {symbol}
        </p>

      </div>

      <div className="text-right">

        <h3 className="text-sm font-bold text-white font-mono">
          {amount}
        </h3>

        <p className="text-xs font-semibold text-emerald-400 font-mono">
          {change}
        </p>

      </div>

    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-[#0B0E14]/80 p-3.5 text-center">

      <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight">
        {value}
      </h2>

      <p className="mt-0.5 text-xs text-slate-400 font-medium">
        {label}
      </p>

    </div>
  );
}