import {
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa";
import { SiBinance, SiSolana } from "react-icons/si";

const coins = [
  {
    icon: <FaBitcoin className="text-yellow-500" />,
    name: "Bitcoin",
    price: "$118,430",
    change: "+2.4%",
  },
  {
    icon: <FaEthereum className="text-indigo-400" />,
    name: "Ethereum",
    price: "$4,580",
    change: "+1.8%",
  },
  {
    icon: <SiBinance className="text-yellow-400" />,
    name: "BNB",
    price: "$910",
    change: "-0.6%",
  },
  {
    icon: <SiSolana className="text-purple-400" />,
    name: "Solana",
    price: "$241",
    change: "+4.2%",
  },
];

export default function CoinOverview() {
  return (
    <div className="bg-[#111111] border border-[#232323] rounded-3xl p-7">

      <h2 className="text-white text-2xl font-bold mb-8">
        Market Overview
      </h2>

      <div className="space-y-5">

        {coins.map((coin) => (

          <div
            key={coin.name}
            className="flex justify-between items-center bg-[#181818] rounded-2xl p-5 hover:bg-[#202020] transition"
          >

            <div className="flex items-center gap-4">

              <div className="text-3xl">

                {coin.icon}

              </div>

              <div>

                <h3 className="text-white font-semibold">

                  {coin.name}

                </h3>

                <p className="text-gray-500">
                  Live Price
                </p>

              </div>

            </div>

            <div className="text-right">

              <h3 className="text-white font-semibold">

                {coin.price}

              </h3>

              <p
                className={
                  coin.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.change}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}