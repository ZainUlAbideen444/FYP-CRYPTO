import { formatCurrency, formatPercent } from "../utils/formatCurrency";

export default function MarketCard({ coin }) {
  return (
    <div className="bg-[#111111] border border-[#222] rounded-3xl p-6 hover:border-red-500 duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white text-xl font-bold">
            {coin.name}
          </h3>

          <p className="text-gray-500 mt-2">
            {coin.symbol}
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-white text-2xl font-bold">
            {formatCurrency(coin.price)}
          </h2>

          <span
            className={`font-semibold ${
              coin.change24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {formatPercent(coin.change24h)}
          </span>
        </div>
      </div>
    </div>
  );
}