import {
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa";

import {
  SiBinance,
  SiSolana,
} from "react-icons/si";

const coins = [
  {
    icon: <FaBitcoin className="text-yellow-400" />,
    symbol: "BTC",
    price: "$118,430",
    change: "+2.40%",
    positive: true,
  },
  {
    icon: <FaEthereum className="text-indigo-400" />,
    symbol: "ETH",
    price: "$4,580",
    change: "+1.80%",
    positive: true,
  },
  {
    icon: <SiBinance className="text-yellow-500" />,
    symbol: "BNB",
    price: "$910",
    change: "-0.60%",
    positive: false,
  },
  {
    icon: <SiSolana className="text-purple-400" />,
    symbol: "SOL",
    price: "$241",
    change: "+4.20%",
    positive: true,
  },
];

export default function MarketTicker() {
  return (
    <section className="border-y border-white/10 bg-[#0b0b0d]">

      <div className="max-w-7xl mx-auto overflow-hidden">

        <div className="flex animate-marquee whitespace-nowrap">

          {[...coins, ...coins, ...coins].map((coin, index) => (

            <div
              key={index}
              className="mx-8 flex items-center gap-4 py-4"
            >

              <div className="text-2xl">
                {coin.icon}
              </div>

              <span className="font-semibold text-white">
                {coin.symbol}
              </span>

              <span className="text-gray-400">
                {coin.price}
              </span>

              <span
                className={
                  coin.positive
                    ? "rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400"
                    : "rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400"
                }
              >
                {coin.change}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}