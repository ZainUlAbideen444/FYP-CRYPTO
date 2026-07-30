import PageHeader from "../components/UI/PageHeader";

import PerformanceStats from "../components/Performance/PerformanceStats";
import PortfolioGrowthChart from "../components/Performance/PortfolioGrowthChart";
import AssetAllocationChart from "../components/Performance/AssetAllocationChart";
import BestWorstAssets from "../components/Performance/BestWorstAssets";
import TradingInsights from "../components/Performance/TradingInsights";

import { useTradeContext } from "../context/TradeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { FaChartPie, FaWallet, FaVault } from "react-icons/fa6";

export default function Performance() {
  const { wallet, portfolio, coins, loading } = useTradeContext();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Calculating portfolio analytics...
        </span>
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

  const netWorth = (wallet?.balance || 0) + portfolioValue;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Performance Analytics"
        subtitle="Monitor your portfolio growth, profit & loss, ROI and investment allocation."
      />

      {/* Top Portfolio Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Net Worth */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
              Total Net Worth
            </p>
            <h3 className="text-2xl font-mono font-extrabold text-white mt-1">
              {formatCurrency(netWorth)}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FaVault />
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
              Live Holdings Value
            </p>
            <h3 className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">
              {formatCurrency(portfolioValue)}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
            <FaChartPie />
          </div>
        </div>

        {/* Total Cash Balance */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
              Available Cash
            </p>
            <h3 className="text-2xl font-mono font-extrabold text-white mt-1">
              {formatCurrency(wallet?.balance || 0)}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
            <FaWallet />
          </div>
        </div>
      </div>

      {/* Primary Key Stats Row */}
      <PerformanceStats
        wallet={wallet}
        portfolioValue={portfolioValue}
        invested={invested}
      />

      {/* Main Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart (Spans 2 Columns) */}
        <div className="lg:col-span-2">
          <PortfolioGrowthChart portfolioValue={portfolioValue} />
        </div>

        {/* Asset Allocation Chart (1 Column) */}
        <div className="lg:col-span-1">
          <AssetAllocationChart portfolio={portfolio} coins={coins} />
        </div>
      </div>

      {/* Asset Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BestWorstAssets portfolio={portfolio} coins={coins} />
        <TradingInsights
          portfolio={portfolio}
          coins={coins}
          wallet={wallet}
        />
      </div>
    </div>
  );
}