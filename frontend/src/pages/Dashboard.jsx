import { useEffect, useState } from "react";

import PageHeader from "../components/UI/PageHeader";
import DashboardStats from "../components/Dashboard/DashboardStats";
import PortfolioOverview from "../components/Dashboard/PortfolioOverview";
import MarketOverview from "../components/Dashboard/MarketOverview";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import QuickActions from "../components/Dashboard/QuickActions";

import { useMarketContext } from "../context/MarketContext";
import { getTradeSummary } from "../services/tradeService";

export default function Dashboard() {
  const { coins } = useMarketContext();

  const [loading, setLoading] = useState(true);

  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getTradeSummary();

      const summary = data.summary;

      setWallet(summary.walletBalance);
      setPortfolio(summary.holdings);
      setTransactions(summary.recentTrades);
      setPortfolioValue(summary.holdingsValue);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-400">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Monitor your portfolio and market performance."
      />

     <DashboardStats
    wallet={wallet}
    portfolio={portfolio}
    portfolioValue={portfolioValue}
/>

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <PortfolioOverview
            portfolio={portfolio}
          />
        </div>

        <MarketOverview
          coins={coins}
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RecentTransactions
            transactions={transactions}
          />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}