import { motion } from "framer-motion";
import {
  FaBitcoin,
  FaEthereum,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { SiBinance, SiSolana } from "react-icons/si";
import Button from "./Button";

const coins = [
  {
    icon: <FaBitcoin className="text-yellow-400 text-2xl" />,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$118,430",
    change: "+2.40%",
  },
  {
    icon: <FaEthereum className="text-indigo-400 text-2xl" />,
    name: "Ethereum",
    symbol: "ETH",
    price: "$4,580",
    change: "+1.80%",
  },
  {
    icon: <SiBinance className="text-yellow-500 text-2xl" />,
    name: "BNB",
    symbol: "BNB",
    price: "$910",
    change: "-0.60%",
  },
  {
    icon: <SiSolana className="text-purple-400 text-2xl" />,
    name: "Solana",
    symbol: "SOL",
    price: "$241",
    change: "+4.20%",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-28 pb-32">

      {/* Background Blur */}

      <div className="absolute -top-40 left-0 w-[550px] h-[550px] rounded-full bg-red-600/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-red-700/10 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-20 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 uppercase tracking-[4px] text-sm font-semibold">

            Real-Time Crypto Trading Simulator

          </span>

          <h1 className="mt-8 text-white text-5xl md:text-7xl font-black leading-[1.05]">

            Learn Crypto

            <br />

            Trading

            <span className="block text-red-500 mt-2">

              Without Risk

            </span>

          </h1>

          <p className="mt-8 text-gray-400 text-xl leading-9 max-w-xl">

            Experience cryptocurrency trading using virtual funds,
            real-time market prices, portfolio management,
            and performance analytics.

            Learn the market confidently without risking
            real money.

          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <Button className="px-8 py-4 rounded-2xl text-lg shadow-[0_15px_45px_rgba(239,68,68,.35)]">
              Start Trading
            </Button>

            <button className="px-8 py-4 rounded-2xl border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition">

              Explore Market

            </button>

          </div>

          {/* Bottom Statistics */}

          <div className="grid grid-cols-3 gap-6 mt-16">

            <div>

              <h2 className="text-red-500 text-4xl font-black">
                $10K
              </h2>

              <p className="text-gray-400 mt-2">
                Virtual Balance
              </p>

            </div>

            <div>

              <h2 className="text-red-500 text-4xl font-black">
                4
              </h2>

              <p className="text-gray-400 mt-2">
                Supported Coins
              </p>

            </div>

            <div>

              <h2 className="text-red-500 text-4xl font-black">
                100%
              </h2>

              <p className="text-gray-400 mt-2">
                Risk Free
              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="rounded-3xl border border-red-600/20 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_70px_rgba(255,0,0,.15)]">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-white text-2xl font-bold">

                  Live Market

                </h2>

                <p className="text-gray-400 mt-2">

                  Top Cryptocurrencies

                </p>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center">

                <FaArrowTrendUp className="text-white text-xl"/>

              </div>

            </div>

            <div className="mt-10 space-y-5">

              {coins.map((coin) => (

                <div
                  key={coin.symbol}
                  className="flex justify-between items-center rounded-2xl bg-[#121212] border border-[#202020] px-5 py-5 hover:border-red-500 transition duration-300 hover:-translate-y-1"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">

                      {coin.icon}

                    </div>

                    <div>

                      <h3 className="text-white font-semibold text-lg">

                        {coin.name}

                      </h3>

                      <p className="text-gray-500">

                        {coin.symbol}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-white font-semibold text-lg">

                      {coin.price}

                    </p>

                    <span
                      className={
                        coin.change.startsWith("+")
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {coin.change}
                    </span>

                  </div>

                </div>

              ))}

            </div>

            <button className="mt-8 w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 transition text-white font-semibold text-lg">

              View Full Market

            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}