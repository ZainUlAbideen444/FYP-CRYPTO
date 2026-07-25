import { useNavigate } from "react-router-dom";
import { FaStar, FaEye } from "react-icons/fa";
import { formatCurrency, formatPercent, formatNumber } from "../utils/formatCurrency";

export default function CoinTable({ coins }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111111] rounded-3xl border border-[#222] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#191919]">
          <tr className="text-gray-400">
            <th className="text-left px-6 py-5">Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>Market Cap</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {coins.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-10">
                No coins match your search.
              </td>
            </tr>
          ) : (
            coins.map((coin) => (
              <tr key={coin.symbol} className="border-t border-[#222] hover:bg-[#181818]">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <FaStar className="text-gray-500" />
                    <div>
                      <h3 className="text-white font-semibold">{coin.name}</h3>
                      <p className="text-gray-500">{coin.symbol}</p>
                    </div>
                  </div>
                </td>

                <td className="text-center text-white">{formatCurrency(coin.price)}</td>

                <td
                  className={`text-center font-semibold ${
                    coin.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatPercent(coin.change)}
                </td>

                <td className="text-center text-white">
                  {coin.marketCap || `$${formatNumber(coin.price * 19000000, 0)}`}
                </td>

                <td>
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/trading?coin=${coin.symbol}`)}
                      className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white flex items-center gap-2"
                    >
                      <FaEye />
                      Trade
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
