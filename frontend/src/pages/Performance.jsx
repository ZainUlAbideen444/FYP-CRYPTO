import { FaArrowTrendUp, FaBullseye, FaCoins, FaScaleBalanced } from "react-icons/fa6";
import PageHeader from "../components/UI/PageHeader";
import Card from "../components/UI/Card";
import DashboardStatCard from "../components/DashboardStatCard";
import { useTradeContext } from "../context/TradeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { calculatePortfolioProfit } from "../utils/calculateProfit";

export default function Performance() {
  const { coins, portfolio, transactions, realizedProfit } = useTradeContext();

  const sells = transactions.filter((t) => t.type === "SELL");
  const wins = sells.filter((t) => t.profit > 0);
  const winRate = sells.length === 0 ? 0 : (wins.length / sells.length) * 100;

  const { profit: unrealizedProfit } = calculatePortfolioProfit(portfolio, coins);
  const totalProfit = realizedProfit + unrealizedProfit;

  const bestTrade = sells.reduce(
    (best, t) => (t.profit > (best?.profit ?? -Infinity) ? t : best),
    null
  );

  // Simple equity-over-trades sparkline built from cumulative realized P/L.
  const equityPoints = [...sells].reverse().reduce((acc, t) => {
    const previous = acc.length ? acc[acc.length - 1] : 0;
    return [...acc, previous + t.profit];
  }, []);
  const chartPoints = equityPoints.length ? [0, ...equityPoints] : [0, 0];
  const maxPoint = Math.max(...chartPoints, 1);
  const minPoint = Math.min(...chartPoints, 0);
  const range = maxPoint - minPoint || 1;

  const svgWidth = 600;
  const svgHeight = 160;
  const stepX = svgWidth / (chartPoints.length - 1 || 1);
  const path = chartPoints
    .map((point, i) => {
      const x = i * stepX;
      const y = svgHeight - ((point - minPoint) / range) * svgHeight;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-10">
      <PageHeader
        title="Performance"
        subtitle="Review your trading results, win rate, and recent activity."
      />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">
        <DashboardStatCard
          title="Total Profit"
          value={formatCurrency(totalProfit)}
          change={totalProfit >= 0 ? "Overall gain" : "Overall loss"}
          icon={<FaArrowTrendUp />}
          color="bg-green-600 text-white"
        />
        <DashboardStatCard
          title="Win Rate"
          value={`${winRate.toFixed(0)}%`}
          change={`${wins.length}/${sells.length || 0} winning sells`}
          icon={<FaBullseye />}
          color="bg-red-600 text-white"
        />
        <DashboardStatCard
          title="Total Trades"
          value={transactions.length}
          change={`${sells.length} sells`}
          icon={<FaScaleBalanced />}
          color="bg-blue-600 text-white"
        />
        <DashboardStatCard
          title="Best Trade"
          value={bestTrade ? formatCurrency(bestTrade.profit) : "—"}
          change={bestTrade ? bestTrade.symbol : "No sells yet"}
          icon={<FaCoins />}
          color="bg-yellow-500 text-white"
        />
      </div>

      <Card title="Realized P/L Over Trades">
        {sells.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">
            Sell a coin to start tracking your performance curve.
          </p>
        ) : (
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-40"
            preserveAspectRatio="none"
          >
            <line x1="0" y1={svgHeight - ((0 - minPoint) / range) * svgHeight} x2={svgWidth} y2={svgHeight - ((0 - minPoint) / range) * svgHeight} stroke="#2b2b2b" strokeWidth="1" />
            <path d={path} fill="none" stroke="#ef4444" strokeWidth="3" />
          </svg>
        )}
      </Card>

      <Card title="Recent Trades">
        {transactions.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">No trades yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left pb-4">Coin</th>
                <th className="text-left">Type</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
                <th className="text-right">P/L</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 10).map((t) => (
                <tr key={t.id} className="border-t border-[#222]">
                  <td className="py-4 text-white">{t.coin}</td>
                  <td className={t.type === "BUY" ? "text-green-500" : "text-red-500"}>
                    {t.type}
                  </td>
                  <td className="text-right text-gray-300">{t.quantity}</td>
                  <td className="text-right text-gray-300">{formatCurrency(t.price)}</td>
                  <td className="text-right text-white">{formatCurrency(t.total)}</td>
                  <td className="text-right">
                    {t.type === "SELL" ? (
                      <span className={t.profit >= 0 ? "text-green-500" : "text-red-500"}>
                        {formatCurrency(t.profit)}
                      </span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
