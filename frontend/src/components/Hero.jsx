import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowTrendUp,
  FaBitcoin,
  FaEthereum,
  FaChevronRight,
  FaShieldHalved,
  FaChartLine,
  FaWallet,
} from "react-icons/fa6";
import { SiBinance, SiSolana } from "react-icons/si";

const coins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$118,430",
    change: "+2.40%",
    icon: <FaBitcoin className="text-amber-400 text-2xl" />,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$4,580",
    change: "+1.82%",
    icon: <FaEthereum className="text-sky-400 text-2xl" />,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: "$910",
    change: "+0.94%",
    icon: <SiBinance className="text-yellow-400 text-2xl" />,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "$241",
    change: "+4.21%",
    icon: <SiSolana className="text-purple-400 text-2xl" />,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0D12] min-h-[90vh] flex items-center py-16 lg:py-24">
      
      {/* Refined Ambient Glows */}
      <div className="absolute left-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute right-[-150px] bottom-[-100px] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Pill Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              MERN Stack Trading Platform
            </span>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl leading-[1.1]">
              Learn Crypto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Trading Safely.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-9 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">
              Practice cryptocurrency paper trading using real-time market data,
              a $10,000 virtual balance, and advanced analytics. Build strategy 
              and confidence with zero financial risk.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-9">
              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-11 py-5.5 text-md font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Trading Free</span>
                <FaChevronRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/market"
                className="rounded-xl border border-slate-700/80 bg-slate-900/50 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              >
                Explore Live Markets
              </Link>
            </div>

            {/* Value Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 max-w-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <FaWallet className="text-lg" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">$10K</h3>
                  <p className="text-xs text-slate-400">Virtual Wallet</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <FaChartLine className="text-lg" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">24/7</h3>
                  <p className="text-xs text-slate-400">Real-Time Data</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <FaShieldHalved className="text-lg" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">100%</h3>
                  <p className="text-xs text-slate-400">Risk Free</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Live Market Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-slate-800 bg-[#12161F]/90 p-6 sm:p-7 shadow-2xl backdrop-blur-xl hover:border-slate-700 transition-all duration-300">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                <div>
                  <h2 className="text-xl font-bold text-white">Live Market</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Powered by real-time API feeds</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FaArrowTrendUp className="text-lg" />
                </div>
              </div>

              {/* Coin List */}
              <div className="mt-5 space-y-3">
                {coins.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="group flex items-center justify-between rounded-xl border border-slate-800/60 bg-[#0B0E14]/60 p-3.5 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 border border-slate-800">
                        {coin.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {coin.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">{coin.symbol}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <h3 className="text-sm font-bold text-white font-mono">{coin.price}</h3>
                      <p className="text-xs font-semibold text-emerald-400 font-mono">{coin.change}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Action CTA */}
              <Link
                to="/market"
                className="mt-8 flex w-full items-center justify-center gap-4 rounded-xl border border-slate-700/80 bg-slate-800/40 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-800 hover:text-white hover:border-slate-600"
              >
                <span>View Complete Market</span>
                <FaChevronRight className="text-xs text-slate-400" />
              </Link>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}