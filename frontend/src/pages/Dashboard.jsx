import { FaWallet, FaArrowTrendUp, FaChartPie, FaBitcoin } from "react-icons/fa6";

import DashboardStatCard from "../components/DashboardStatCard";
import CoinOverview from "../components/CoinOverview";
import RecentTransactions from "../components/RecentTransactions";
import { useTradeContext } from "../context/TradeContext";
import useAuth from "../hooks/useAuth";
import { formatCurrency, formatPercent } from "../utils/formatCurrency";
import { calculatePortfolioProfit } from "../utils/calculateProfit";

export default function Dashboard() {
  const { coins, wallet, portfolio, transactions } = useTradeContext();
  const { user } = useAuth();

  const { invested, currentValue, profit } = calculatePortfolioProfit(portfolio, coins);
  const profitPercent = invested === 0 ? 0 : (profit / invested) * 100;

  const todaysTransactions = transactions.filter(
    (t) => new Date(t.date).toDateString() === new Date().toDateString()
  );
  const todaysProfit = todaysTransactions
    .filter((t) => t.type === "SELL")
    .reduce((sum, t) => sum + (t.profit || 0), 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-white text-4xl font-black">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user?.name || "Trader"} 👋
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">
        <DashboardStatCard
          title="Wallet Balance"
          value={formatCurrency(wallet)}
          change="Cash Available"
          icon={<FaWallet />}
          color="bg-green-600 text-white"
        />

        <DashboardStatCard
          title="Portfolio Value"
          value={formatCurrency(currentValue)}
          change={formatPercent(profitPercent)}
          icon={<FaChartPie />}
          color="bg-red-600 text-white"
        />

        <DashboardStatCard
          title="Today's Profit"
          value={formatCurrency(todaysProfit)}
          change={`${todaysTransactions.length} trade${todaysTransactions.length === 1 ? "" : "s"} today`}
          icon={<FaArrowTrendUp />}
          color="bg-blue-600 text-white"
        />

        <DashboardStatCard
          title="Coins Owned"
          value={portfolio.length}
          change={`${transactions.length} total trades`}
          icon={<FaBitcoin />}
          color="bg-yellow-500 text-white"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <CoinOverview coins={coins} />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
}
