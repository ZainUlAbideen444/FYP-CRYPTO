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
    text: "Learn cryptocurrency trading without risking your own money.",
  },
  {
    icon: <FaCoins />,
    title: "Real-Time Prices",
    text: "Live cryptocurrency market data powered by CoinGecko API.",
  },
  {
    icon: <FaWallet />,
    title: "Virtual Wallet",
    text: "Every user starts with a $10,000 virtual balance.",
  },
  {
    icon: <FaChartLine />,
    title: "Portfolio Analytics",
    text: "Track profits, losses, investment value and holdings.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Authentication",
    text: "JWT authentication with encrypted passwords keeps accounts safe.",
  },
  {
    icon: <FaServer />,
    title: "MERN Stack",
    text: "Built using React, Express, Node.js and MongoDB Atlas.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#050505] py-32">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="uppercase tracking-[5px] text-red-500 font-semibold">
              Why Choose Us
            </span>

            <h2 className="text-white text-5xl font-black mt-5 leading-tight">

              Designed For Future
              <br />
              Crypto Traders

            </h2>

            <p className="text-gray-400 mt-8 leading-8 text-lg">

              Crypto Web provides a realistic cryptocurrency trading
              environment where beginners can learn, practice and improve
              their trading strategies before entering real markets.

            </p>

            <div className="mt-12 space-y-6">

              {features.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex gap-5 items-start bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-red-500 transition"
                >

                  <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center text-white text-xl">

                    {item.icon}

                  </div>

                  <div>

                    <h3 className="text-white text-xl font-semibold">

                      {item.title}

                    </h3>

                    <p className="text-gray-400 mt-2 leading-7">

                      {item.text}

                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <div className="relative">

              <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-red-600/20 blur-[120px]"></div>

              <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(255,0,0,.15)]">

                <h3 className="text-white text-2xl font-bold mb-8">

                  Dashboard Overview

                </h3>

                <div className="space-y-5">

                  <DashboardCard title="Wallet Balance" value="$10,000" color="text-green-400"/>

                  <DashboardCard title="Portfolio Value" value="$12,485" color="text-white"/>

                  <DashboardCard title="Today's Profit" value="+12.45%" color="text-green-400"/>

                  <DashboardCard title="Trades Completed" value="148" color="text-red-400"/>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-[#111111] rounded-2xl p-5 flex justify-between items-center border border-[#202020]">

      <div>

        <p className="text-gray-400 text-sm">
          {title}
        </p>

        <h3 className={`text-2xl font-bold mt-2 ${color}`}>
          {value}
        </h3>

      </div>

      <div className="w-12 h-12 rounded-xl bg-red-600/20"></div>

    </div>
  );
}