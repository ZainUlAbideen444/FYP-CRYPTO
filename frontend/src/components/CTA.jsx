import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">

      {/* Ambient Lighting Mesh */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-br from-[#121622] via-[#0D1018] to-[#0A0D12] p-8 sm:p-12 lg:p-16 shadow-[0_0_60px_-15px_rgba(16,185,129,0.15)] backdrop-blur-xl"
        >

          {/* Top Decorative Border Highlight */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Ready To Start?
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">

                Build Your Crypto{" "}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Trading Skills
                </span>

              </h2>

              <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">

                Join thousands of beginners learning cryptocurrency trading
                with virtual funds, live market prices, portfolio tracking
                and detailed performance analytics.

              </p>

            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">

              <Link
                to="/register"
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 lg:w-72"
              >
                <span>Create Free Account</span>

                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />

              </Link>

              <Link
                to="/market"
                className="flex w-full items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/40 px-7 py-4 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-slate-500 hover:bg-slate-800/80 hover:text-white lg:w-72"
              >
                Explore Market
              </Link>

            </div>

          </div>

          <div className="mt-12 grid gap-6 border-t border-slate-800/80 pt-8 sm:grid-cols-3">

            <div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                $10K+
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                Virtual Trading Balance
              </p>

            </div>

            <div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                24/7
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                Live Coin Prices
              </p>

            </div>

            <div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                100%
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                Risk Free Learning
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}