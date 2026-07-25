import { FaBitcoin, FaWallet, FaChartPie, FaArrowTrendUp } from "react-icons/fa6";
import PageHeader from "../components/UI/PageHeader";
import Card from "../components/UI/Card";
import Badge from "../components/UI/badge";
import DashboardStatCard from "../components/DashboardStatCard";
import { useTradeContext } from "../context/TradeContext";
import { formatCurrency, formatPercent } from "../utils/formatCurrency";
import { calculateHoldingProfit, calculatePortfolioProfit } from "../utils/calculateProfit";

const ALLOCATION_COLORS = [
  "bg-yellow-500",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-green-400",
  "bg-red-400",
  "bg-blue-400",
];

export default function Portfolio() {
  const { coins, portfolio, wallet } = useTradeContext();

  const { invested, currentValue, profit } = calculatePortfolioProfit(portfolio, coins);
  const profitPercent = invested === 0 ? 0 : (profit / invested) * 100;

  return (
    <div className="space-y-10">
      <PageHeader
        title="Portfolio"
        subtitle="Track your holdings, allocation, and overall profit or loss."
      />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">
        <DashboardStatCard
          title="Total Invested"
          value={formatCurrency(invested)}
          change={`${portfolio.length} asset${portfolio.length === 1 ? "" : "s"}`}
          icon={<FaWallet />}
          color="bg-green-600 text-white"
        />
        <DashboardStatCard
          title="Current Value"
          value={formatCurrency(currentValue)}
          change={formatPercent(profitPercent)}
          icon={<FaChartPie />}
          color="bg-red-600 text-white"
        />
        <DashboardStatCard
          title="Profit / Loss"
          value={formatCurrency(profit)}
          change={formatPercent(profitPercent)}
          icon={<FaArrowTrendUp />}
          color="bg-blue-600 text-white"
        />
        <DashboardStatCard
          title="Cash Balance"
          value={formatCurrency(wallet)}
          change="Available"
          icon={<FaBitcoin />}
          color="bg-yellow-500 text-white"
        />
      </div>

      {portfolio.length === 0 ? (
        <Card>
          <div className="text-center py-14">
            <p className="text-gray-400 text-lg">
              You don't own any coins yet.
            </p>
            <p className="text-gray-600 mt-2">
              Head to the Trading page to make your first purchase.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <Card title="Your Holdings">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left pb-4">Coin</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Avg Buy</th>
                    <th className="text-right">Current</th>
                    <th className="text-right">Value</th>
                    <th className="text-right">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((holding) => {
                    const coin = coins.find((c) => c.symbol === holding.symbol);
                    const currentPrice = coin ? coin.price : holding.avgBuyPrice;
                    const { currentValue: value, profit: holdingProfit, profitPercent: holdingPercent } =
                      calculateHoldingProfit(holding, currentPrice);

                    return (
                      <tr key={holding.symbol} className="border-t border-[#222]">
                        <td className="py-5">
                          <h3 className="text-white font-semibold">{holding.name}</h3>
                          <p className="text-gray-500 text-sm">{holding.symbol}</p>
                        </td>
                        <td className="text-right text-gray-300">{holding.quantity}</td>
                        <td className="text-right text-gray-300">
                          {formatCurrency(holding.avgBuyPrice)}
                        </td>
                        <td className="text-right text-white">{formatCurrency(currentPrice)}</td>
                        <td className="text-right text-white font-semibold">
                          {formatCurrency(value)}
                        </td>
                        <td className="text-right">
                          <Badge value={formatPercent(holdingPercent)} />
                          <p
                            className={`text-xs mt-1 ${
                              holdingProfit >= 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {formatCurrency(holdingProfit)}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>

          <Card title="Allocation">
            <div className="space-y-5">
              {portfolio.map((holding, index) => {
                const coin = coins.find((c) => c.symbol === holding.symbol);
                const currentPrice = coin ? coin.price : holding.avgBuyPrice;
                const value = holding.quantity * currentPrice;
                const percent = currentValue === 0 ? 0 : (value / currentValue) * 100;

                return (
                  <div key={holding.symbol}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{holding.symbol}</span>
                      <span className="text-gray-400">{percent.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1c1c1c] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ALLOCATION_COLORS[index % ALLOCATION_COLORS.length]}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
