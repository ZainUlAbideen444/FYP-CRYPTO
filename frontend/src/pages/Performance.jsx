import PageHeader from "../components/UI/PageHeader";

import PerformanceStats from "../components/Performance/PerformanceStats";
import PortfolioGrowthChart from "../components/Performance/PortfolioGrowthChart";
import AssetAllocationChart from "../components/Performance/AssetAllocationChart";
import BestWorstAssets from "../components/Performance/BestWorstAssets";
import TradingInsights from "../components/Performance/TradingInsights";

import { useTradeContext } from "../context/TradeContext";

export default function Performance() {
  const {
    wallet,
    portfolio,
    coins,
    loading,
  } = useTradeContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 text-gray-400 text-xl">
        Loading Performance...
      </div>
    );
  }

  const portfolioValue = portfolio.reduce((total, asset) => {
    const liveCoin =
      coins.find((coin) => coin.symbol === asset.symbol) || asset;

    return total + liveCoin.price * asset.quantity;
  }, 0);

  const invested = portfolio.reduce(
  (sum, asset) => sum + asset.investedAmount,
  0
);

  return (
    <div className="space-y-8">

      <PageHeader
        title="Performance Dashboard"
        subtitle="Monitor your portfolio growth, profit & loss, ROI and investment allocation."
      />

      <PerformanceStats
        wallet={wallet}
        portfolioValue={portfolioValue}
        invested={invested}
      />

      <PortfolioGrowthChart
        portfolioValue={portfolioValue}
      />

      <AssetAllocationChart
        portfolio={portfolio}
        coins={coins}
      />

      <BestWorstAssets
        portfolio={portfolio}
        coins={coins}
      />

      <TradingInsights
        portfolio={portfolio}
        coins={coins}
        wallet={wallet}
      />

    </div>
  );
}