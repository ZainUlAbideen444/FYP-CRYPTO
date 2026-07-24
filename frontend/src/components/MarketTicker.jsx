import {
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa";

import { SiBinance, SiSolana } from "react-icons/si";

const coins = [
  {
    icon: <FaBitcoin />,
    name: "BTC",
    price: "$118,430",
    change: "+2.4%",
  },
  {
    icon: <FaEthereum />,
    name: "ETH",
    price: "$4,580",
    change: "+1.8%",
  },
  {
    icon: <SiBinance />,
    name: "BNB",
    price: "$910",
    change: "-0.6%",
  },
  {
    icon: <SiSolana />,
    name: "SOL",
    price: "$241",
    change: "+4.2%",
  },
];

export default function MarketTicker() {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 overflow-hidden">

      <div className="animate-marquee whitespace-nowrap py-3 flex gap-16">

        {coins.concat(coins).map((coin, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-white text-lg font-semibold"
          >
            {coin.icon}

            <span>{coin.name}</span>

            <span>{coin.price}</span>

            <span
              className={
                coin.change.startsWith("+")
                  ? "text-green-300"
                  : "text-white"
              }
            >
              {coin.change}
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}