import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa6";
import { formatCurrency, formatPercent } from "../utils/formatCurrency";

export default function CoinTable({ coins }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 overflow-hidden backdrop-blur-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse">
          <thead>
            <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-mono text-xs uppercase tracking-wider">
              <th className="text-left px-6 py-3.5 font-semibold">Asset</th>
              <th className="text-right px-6 py-3.5 font-semibold">Price</th>
              <th className="text-center px-6 py-3.5 font-semibold">24h Change</th>
              <th className="text-right px-6 py-3.5 font-semibold">Market Cap</th>
              <th className="text-center px-6 py-3.5 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {coins.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-slate-500 py-12 text-xs font-mono">
                  No coins match your search query.
                </td>
              </tr>
            ) : (
              coins.map((coin) => {
                const isPositive = (coin.change24h ?? coin.change ?? 0) >= 0;

                return (
                  <tr
                    key={coin.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Coin Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FaStar className="text-slate-700 hover:text-amber-400 cursor-pointer transition-colors text-xs" />
                        <div>
                          <h3 className="text-white font-bold text-sm leading-none group-hover:text-emerald-400 transition-colors">
                            {coin.name}
                          </h3>
                          <p className="text-slate-500 text-xs font-mono mt-1">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-right text-white font-mono font-semibold text-sm">
                      {formatCurrency(coin.price)}
                    </td>

                    {/* 24h Change */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                          isPositive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {formatPercent(coin.change24h ?? coin.change)}
                      </span>
                    </td>

                    {/* Market Cap */}
                    <td className="px-6 py-4 text-right text-slate-300 font-mono text-sm">
                      {formatCurrency(coin.marketCap)}
                    </td>

                    {/* Trade Action */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate(`/trading?coin=${coin.symbol}`)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all duration-200 flex items-center gap-1.5"
                        >
                          Trade
                          <FaArrowRight className="text-[10px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}