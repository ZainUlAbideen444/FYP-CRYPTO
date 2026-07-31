import { useTradeContext } from "../context/TradeContext";
import { useMarketContext } from "../context/MarketContext";
import { CoinIcon } from "../utils/getCoinIcons";

export default function Portfolio() {
  const { portfolio = [], loading: tradeLoading } = useTradeContext();
  const { coins = [], loading: marketLoading } = useMarketContext();

  const loading = tradeLoading || marketLoading;

  // Process holdings against live market prices
  const processedHoldings = portfolio.map((item) => {
    // 1. Standardize Ticker Symbol (e.g., 'bnb' -> 'BNB')
    const symbol = String(item.symbol || item.coinSymbol || item.coinId || "").toUpperCase();

    // 2. Match with Live Market Context
    const liveCoin = coins.find(
      (c) => c.symbol?.toUpperCase() === symbol || c.id?.toLowerCase() === symbol.toLowerCase()
    );

    const quantity = Number(item.quantity || item.amount || 0);

    // Live price from market context or fallback to item's saved price
    const currentPrice = Number(
      liveCoin?.price || liveCoin?.current_price || item.currentPrice || item.price || 0
    );

    // Purchase / Entry price
    const avgBuyPrice = Number(
      item.avgBuyPrice ?? item.buyPrice ?? item.averagePrice ?? item.priceAtPurchase ?? currentPrice
    );

    const currentValue = quantity * currentPrice;
    const totalCost = Number(item.investedAmount ?? (quantity * avgBuyPrice));
    const pnl = currentValue - totalCost;
    const pnlPercentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

    return {
      ...item,
      symbol,
      liveCoin,
      quantity,
      avgBuyPrice,
      currentPrice,
      currentValue,
      totalCost,
      pnl,
      pnlPercentage,
    };
  });

  // Aggregate Totals
  const totalValuation = processedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalCostBasis = processedHoldings.reduce((sum, h) => sum + h.totalCost, 0);
  const totalPnL = totalValuation - totalCostBasis;
  const totalPnLPercent = totalCostBasis > 0 ? (totalPnL / totalCostBasis) * 100 : 0;

  if (loading) {
    return (
      <div className="p-12 text-center font-mono text-slate-400">
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Syncing portfolio holdings...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white font-mono uppercase tracking-wide">
          Portfolio Performance
        </h1>
        <span className="text-xs font-mono text-slate-400 bg-[#0B0E17] border border-slate-800 px-3 py-1.5 rounded-full">
          Open Positions: <strong className="text-white">{processedHoldings.length}</strong>
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="bg-[#0B0E17] border border-slate-800 p-4 rounded-xl shadow-md">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Portfolio Value
          </span>
          <div className="text-2xl font-bold text-white mt-1">
            ${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-[#0B0E17] border border-slate-800 p-4 rounded-xl shadow-md">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Total Invested
          </span>
          <div className="text-2xl font-bold text-slate-300 mt-1">
            ${totalCostBasis.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className={`bg-[#0B0E17] border p-4 rounded-xl shadow-md ${
          totalPnL >= 0 ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5"
        }`}>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Total PnL (Unrealized)
          </span>
          <div className={`text-2xl font-bold mt-1 ${totalPnL >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {totalPnL >= 0 ? "+" : "-"}${Math.abs(totalPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs ml-2 font-normal">
              ({totalPnLPercent >= 0 ? "+" : ""}{totalPnLPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#0B0E17] shadow-lg">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 uppercase text-slate-400 bg-slate-900/50">
              <th className="p-3.5">Asset</th>
              <th className="p-3.5">Quantity</th>
              <th className="p-3.5">Avg Buy Price</th>
              <th className="p-3.5">Current Price</th>
              <th className="p-3.5">Market Value</th>
              <th className="p-3.5 text-right">Profit / Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {processedHoldings.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500 font-mono">
                  No active holdings found. Buy assets from the Trading Terminal to populate this table.
                </td>
              </tr>
            ) : (
              processedHoldings.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <CoinIcon coin={item.liveCoin || { symbol: item.symbol }} size="w-7 h-7" textSize="text-xs" />
                    <div>
                      <span className="font-bold text-white block uppercase">{item.symbol}</span>
                      <span className="text-[10px] text-slate-500 font-sans">Spot Holding</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-200 font-semibold">{item.quantity}</td>
                  <td className="p-3.5 text-slate-400">
                    ${item.avgBuyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3.5 text-slate-200 font-medium">
                    ${item.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3.5 text-white font-bold">
                    ${item.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`p-3.5 text-right font-bold ${item.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    <div>{item.pnl >= 0 ? "+" : "-"}${Math.abs(item.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-[10px] font-normal opacity-80">
                      {item.pnlPercentage >= 0 ? "+" : ""}{item.pnlPercentage.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}