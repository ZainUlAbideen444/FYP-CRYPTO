import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaChartLine,
  FaExchangeAlt,
  FaWallet,
} from "react-icons/fa";

const steps = [
  {
    id: "01",
    icon: <FaUserPlus />,
    title: "Create Your Account",
    description:
      "Register securely and receive a virtual balance of $10,000 to start trading immediately.",
  },
  {
    id: "02",
    icon: <FaChartLine />,
    title: "Explore Live Market",
    description:
      "View live cryptocurrency prices powered by the CoinGecko API and monitor market trends.",
  },
  {
    id: "03",
    icon: <FaExchangeAlt />,
    title: "Trade Instantly",
    description:
      "Buy and sell Bitcoin, Ethereum, BNB, and Solana using virtual funds without financial risk.",
  },
  {
    id: "04",
    icon: <FaWallet />,
    title: "Track Your Portfolio",
    description:
      "Monitor holdings, profits, losses, and transaction history from one professional dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#050505] py-32">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-24">

          <p className="uppercase tracking-[5px] text-red-500 font-semibold">
            Workflow
          </p>

          <h2 className="text-5xl font-black text-white mt-5">
            How Crypto Web Works
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-6 leading-8">
            Start learning cryptocurrency trading in four simple steps.
            No real investment required.
          </p>

        </div>

        <div className="relative">

          {/* Vertical Line */}

          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-red-600 via-red-500 to-transparent -translate-x-1/2 rounded-full"></div>

          <div className="space-y-20">

            {steps.map((step, index) => (

              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .5 }}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >

                {/* Content */}

                <div className="lg:w-5/12">

                  <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 hover:border-red-500 transition duration-300 shadow-[0_20px_50px_rgba(255,0,0,.08)]">

                    <span className="text-red-500 text-sm tracking-[3px] uppercase">
                      Step {step.id}
                    </span>

                    <h3 className="text-white text-3xl font-bold mt-4">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 leading-8 mt-5 text-lg">
                      {step.description}
                    </p>

                  </div>

                </div>

                {/* Center Icon */}

                <div className="hidden lg:flex w-2/12 justify-center relative">

                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-white text-3xl shadow-[0_0_40px_rgba(239,68,68,.45)] z-10">

                    {step.icon}

                  </div>

                </div>

                {/* Empty Side */}

                <div className="lg:w-5/12"></div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}