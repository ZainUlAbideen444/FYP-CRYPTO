import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaChartLine,
  FaExchangeAlt,
  FaWallet,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: <FaUserPlus />,
    title: "Create Account",
    description:
      "Register securely and receive a virtual balance of $10,000 to begin trading instantly.",
  },
  {
    number: "02",
    icon: <FaChartLine />,
    title: "Watch Live Market",
    description:
      "Track real-time cryptocurrency prices powered by the CoinGecko API.",
  },
  {
    number: "03",
    icon: <FaExchangeAlt />,
    title: "Trade Virtually",
    description:
      "Buy and sell Bitcoin, Ethereum, BNB and Solana without risking real money.",
  },
  {
    number: "04",
    icon: <FaWallet />,
    title: "Track Performance",
    description:
      "Monitor your portfolio, profits, losses and trading history from one dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0A0D12] py-16 lg:py-24">

      {/* Ambient Lighting Gradients */}
      <div className="absolute left-[-100px] top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute right-[-100px] bottom-1/4 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            How It Works
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Start Trading In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Four Simple Steps
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-400">
            Learn cryptocurrency trading through a simple process designed
            specifically for beginners.
          </p>
        </div>

        {/* Grid Container */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">

          {steps.map((step) => (

            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-slate-800/80 bg-[#11151F]/80 p-7 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27]"
            >
              {/* Subtle Edge Glow on Hover */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/30 transition-all duration-500" />

              <div className="flex items-center justify-between">
                
                {/* Icon Container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-2xl text-emerald-400 shadow-md group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Step Number Backdrop Badge */}
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-800 group-hover:text-emerald-500/20 transition-colors duration-300">
                  {step.number}
                </span>

              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-400">
                {step.description}
              </p>

              {/* Controlled Accent Progress Bar */}
              <div className="mt-6 h-[2px] w-12 rounded-full bg-emerald-500/30 group-hover:w-24 group-hover:bg-emerald-400 transition-all duration-300" />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}