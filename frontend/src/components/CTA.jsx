import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-32">

      <div className="absolute left-0 top-0 w-96 h-96 bg-red-600/10 blur-[180px] rounded-full"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-red-500/10 blur-[180px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto px-6"
      >

        <div className="rounded-[35px] border border-red-600/20 bg-gradient-to-r from-[#111111] to-[#191919] p-16 text-center shadow-[0_25px_80px_rgba(255,0,0,.15)]">

          <span className="uppercase tracking-[5px] text-red-500 font-semibold">
            Start Today
          </span>

          <h2 className="text-white text-5xl font-black mt-6 leading-tight">
            Ready To Become A
            <br />
            Better Crypto Trader?
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mt-8 text-lg leading-8">
            Learn cryptocurrency trading with real-time prices,
            virtual investments, portfolio management,
            and performance tracking.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-2xl text-white font-semibold text-lg"
            >
              Create Free Account
            </Link>

            <Link
              to="/market"
              className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              Explore Market
            </Link>

          </div>

        </div>

      </motion.div>

    </section>
  );
}