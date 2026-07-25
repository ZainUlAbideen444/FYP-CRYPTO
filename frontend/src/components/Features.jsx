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
      "Track live cryptocurrency prices using the CoinGecko API with fast updates and a clean trading interface.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <FaChartLine />,
    title: "Virtual Trading",
    description:
      "Buy and sell cryptocurrencies using virtual funds without risking real money.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FaWallet />,
    title: "Portfolio Management",
    description:
      "Monitor holdings, profit/loss, investment value and transaction history in one dashboard.",
    color: "from-red-500 to-red-700",
  },
  {
    icon: <FaUserShield />,
    title: "Secure Authentication",
    description:
      "JWT authentication with encrypted passwords provides a secure login system.",
    color: "from-blue-500 to-cyan-500",
  },
];

export default function Features() {
  return (
    <section className="bg-[#050505] py-32">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-20">

          <span className="uppercase tracking-[5px] text-red-500 font-semibold">
            Features
          </span>

          <h2 className="text-white text-5xl font-black mt-5">
            Powerful Features
          </h2>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto leading-8">
            Crypto Web provides everything a beginner needs to learn,
            practice and understand cryptocurrency trading.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                duration: .3,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 overflow-hidden hover:border-red-500 transition-all duration-300"
            >

              {/* Glow */}

              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 blur-3xl opacity-0 group-hover:opacity-100 duration-500"></div>

              <div
                className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-3xl shadow-lg`}
              >
                {feature.icon}
              </div>

              <h3 className="text-white text-3xl font-bold mt-8">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-6 leading-8 text-lg">
                {feature.description}
              </p>

              <button className="mt-8 text-red-500 font-semibold hover:text-red-400 transition">
                Learn More →
              </button>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
