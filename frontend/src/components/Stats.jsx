import { motion } from "framer-motion";
import {
  FaWallet,
  FaBitcoin,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaWallet />,
    value: "$10,000",
    title: "Virtual Balance",
    description: "Every user starts with $10,000 virtual trading funds.",
    color: "from-red-600 to-red-500",
  },
  {
    icon: <FaBitcoin />,
    value: "4",
    title: "Supported Coins",
    description: "Bitcoin, Ethereum, Binance Coin and Solana.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <FaChartLine />,
    value: "24/7",
    title: "Live Prices",
    description: "Real-time cryptocurrency prices using CoinGecko API.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FaShieldAlt />,
    value: "100%",
    title: "Risk Free",
    description: "Practice without investing real money.",
    color: "from-blue-500 to-cyan-500",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#050505] py-32">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-20">

          <p className="text-red-500 uppercase tracking-[5px] font-semibold">
            Platform Highlights
          </p>

          <h2 className="text-white text-5xl font-black mt-5">
            Everything You Need To Learn Crypto
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-6 leading-8">
            Crypto Web provides a safe environment for beginners to learn
            cryptocurrency trading with real-time market data and virtual
            investments.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{
                duration: .3,
              }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(255,0,0,.08)]"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl`}
              >
                {item.icon}
              </div>

              <h3 className="text-5xl font-black text-white mt-8">
                {item.value}
              </h3>

              <h4 className="text-xl font-semibold text-white mt-5">
                {item.title}
              </h4>

              <p className="text-gray-400 leading-7 mt-4">
                {item.description}
              </p>

              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-red-600/10 blur-3xl"></div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}