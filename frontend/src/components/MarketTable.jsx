import { CoinIcon } from "../utils/getCoinIcons";

export default function MarketTable({ coins = [] }) {
  return (
    <div className="w-full overflow-hidden border border-slate-800 rounded-xl bg-[#0B0E17] shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 uppercase text-slate-400 bg-slate-900/60 text-[11px]">
              <th className="p-3.5">Asset</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">24h Change</th>
              <th className="p-3.5">Market Cap</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {coins.map((coin) => {
              const price = Number(coin.price || coin.current_price || 0);
              const change = Number(coin.change || coin.price_change_percentage_24h || 0);
              const mcap = Number(coin.marketCap || coin.market_cap || 0);

              return (
                <tr key={coin.id || coin.symbol} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <CoinIcon coin={coin} size="w-7 h-7" textSize="text-xs" />
                    <div>
                      <span className="font-bold text-white block text-sm font-sans">{coin.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{coin.symbol}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    ${price > 0 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: price < 1 ? 4 : 2 }) : "0.00"}
                  </td>
                  <td className={`p-3.5 font-bold ${change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                  </td>
                  <td className="p-3.5 text-slate-400">
                    ${mcap > 0 ? mcap.toLocaleString() : "N/A"}
                  </td>
                  <td className="p-3.5 text-right">
                    <a
                      href="/trade"
                      className="px-3.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 font-bold transition-all inline-block"
                    >
                      Trade
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}