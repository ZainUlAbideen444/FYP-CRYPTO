import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiBinance, SiSolana } from "react-icons/si";
import { formatCurrency, formatPercent } from "../utils/formatCurrency";

const ICONS = {
  BTC: <FaBitcoin className="text-yellow-500" />,
  ETH: <FaEthereum className="text-indigo-400" />,
  BNB: <SiBinance className="text-yellow-400" />,
  SOL: <SiSolana className="text-purple-400" />,
};

export default function CoinOverview({ coins }) {
  return (
    <div className="bg-[#111111] border border-[#232323] rounded-3xl p-7">
      <h2 className="text-white text-2xl font-bold mb-8">Market Overview</h2>

      <div className="space-y-5">
        {coins.map((coin) => (
          <div
            key={coin.symbol}
            className="flex justify-between items-center bg-[#181818] rounded-2xl p-5 hover:bg-[#202020] transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{ICONS[coin.symbol] || <FaBitcoin />}</div>
              <div>
                <h3 className="text-white font-semibold">{coin.name}</h3>
                <p className="text-gray-500">Live Price</p>
              </div>
            </div>

            <div className="text-right">
              <h3 className="text-white font-semibold">{formatCurrency(coin.price)}</h3>
              <p className={coin.change >= 0 ? "text-green-500" : "text-red-500"}>
                {formatPercent(coin.change)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
