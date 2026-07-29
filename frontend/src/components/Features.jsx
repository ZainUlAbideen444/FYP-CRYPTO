import { motion } from "framer-motion";
import {
  FaCoins,
  FaChartLine,
  FaWallet,
  FaUserShield,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCoins />,
    title: "Real-Time Market",
    description:
      "Track live cryptocurrency prices powered by the CoinGecko API with a professional trading interface.",
  },
  {
    icon: <FaChartLine />,
    title: "Virtual Trading",
    description:
      "Practice buying and selling cryptocurrencies using virtual funds without financial risk.",
  },
  {
    icon: <FaWallet />,
    title: "Portfolio Management",
    description:
      "Monitor holdings, investment value, profits, losses and overall portfolio performance.",
  },
  {
    icon: <FaUserShield />,
    title: "Secure Authentication",
    description:
      "JWT authentication and encrypted passwords provide a secure user experience.",
  },
];

export default function Features() {
  return (
    <section className=" mt-11 relative py-16 lg:py-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            Platform Features
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Everything You Need To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Learn Crypto Trading
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Crypto Web combines live cryptocurrency data, virtual trading,
            portfolio management and performance analytics into one modern
            learning platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-14">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="group relative rounded-2xl border border-slate-800/80 bg-[#11151F]/80 p-7 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-slate-700 hover:bg-[#161B27]"
            >
              {/* Subtle Top Border Glow on Hover */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/30 transition-all duration-500" />

              <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                
                {/* Icon Badge */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl text-emerald-400 shadow-md group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-300">
                  {feature.icon}
                </div>

                <div>
                  {/* Feature Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

              </div>

              {/* Minimal Accent Accent Bar on Hover */}
              <div className="mt-6 h-[2px] w-12 rounded-full bg-emerald-500/30 group-hover:w-24 group-hover:bg-emerald-400 transition-all duration-300" />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}