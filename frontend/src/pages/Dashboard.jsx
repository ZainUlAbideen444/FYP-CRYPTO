import {
  FaWallet,
  FaArrowTrendUp,
  FaChartPie,
  FaBitcoin,
} from "react-icons/fa6";

import DashboardStatCard from "../components/DashboardStatCard";
import CoinOverview from "../components/CoinOverview";
import RecentTransactions from "../components/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="space-y-10">

      <div>

        <h1 className="text-white text-4xl font-black">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, Demo User 👋
        </p>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">

        <DashboardStatCard
          title="Wallet Balance"
          value="$10,000"
          change="+0%"
          icon={<FaWallet />}
          color="bg-green-600 text-white"
        />

        <DashboardStatCard
          title="Portfolio Value"
          value="$12,486"
          change="+18.7%"
          icon={<FaChartPie />}
          color="bg-red-600 text-white"
        />

        <DashboardStatCard
          title="Today's Profit"
          value="$862"
          change="+4.6%"
          icon={<FaArrowTrendUp />}
          color="bg-blue-600 text-white"
        />

        <DashboardStatCard
          title="Coins Owned"
          value="4"
          change="+1"
          icon={<FaBitcoin />}
          color="bg-yellow-500 text-white"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <CoinOverview />

        <RecentTransactions />

      </div>

    </div>
  );
}