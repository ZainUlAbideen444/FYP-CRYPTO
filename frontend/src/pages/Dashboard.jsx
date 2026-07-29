import {
  FaWallet,
  FaBitcoin,
  FaArrowTrendUp,
  FaChartLine,
} from "react-icons/fa6";



import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-10">


      

      {/* HERO */}

      <section className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#111111] via-[#0b0b0b] to-[#050505] p-10">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-red-500/10 blur-[120px]" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <span className="inline-block rounded-full bg-red-600/15 border border-red-500/20 px-4 py-2 text-red-400 text-sm tracking-widest uppercase">

              Welcome Back

            </span>

            <h1 className="mt-6 text-5xl font-black text-white leading-tight">

              Crypto Trading

              <br />

              Simulator

            </h1>

            <p className="mt-6 max-w-xl text-gray-400 leading-8">

              Practice buying and selling cryptocurrency using
              live market prices without risking real money.

              Build your portfolio, track your performance
              and improve your trading skills.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/market"
                className="rounded-2xl bg-red-600 px-7 py-4 font-semibold text-white hover:bg-red-700 duration-300"
              >
                Explore Market
              </Link>

              <Link
                to="/trading"
                className="rounded-2xl border border-red-500 px-7 py-4 font-semibold text-red-400 hover:bg-red-600 hover:text-white duration-300"
              >
                Start Trading
              </Link>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <Card
              icon={<FaWallet />}
              title="$10,000"
              subtitle="Virtual Wallet"
            />

            <Card
              icon={<FaBitcoin />}
              title="4"
              subtitle="Supported Coins"
            />

            <Card
              icon={<FaArrowTrendUp />}
              title="Live"
              subtitle="CoinGecko Prices"
            />

            <Card
              icon={<FaChartLine />}
              title="Portfolio"
              subtitle="Performance Analytics"
            />

          </div>

        </div>

      </section>

    </div>
  );
}

function Card({ icon, title, subtitle }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-7 hover:border-red-500 transition duration-300 hover:-translate-y-2">

      <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-500 text-2xl mb-5">

        {icon}

      </div>

      <h2 className="text-3xl font-black text-white">

        {title}

      </h2>

      <p className="mt-2 text-gray-400">

        {subtitle}

      </p>

    </div>
  );
}