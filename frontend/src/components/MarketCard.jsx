import { formatCurrency, formatPercent } from "../utils/formatCurrency";

export default function MarketCard({ name, symbol, price, change }) {
  return (
    <div className="bg-[#111111] border border-[#222] rounded-3xl p-6 hover:border-red-500 duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <p className="text-gray-500 mt-2">{symbol}</p>
        </div>

        <div className="text-right">
          <h2 className="text-white text-2xl font-bold">{formatCurrency(price)}</h2>
          <span className={`font-semibold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {formatPercent(change)}
          </span>
        </div>
      </div>
    </div>
  );
}
