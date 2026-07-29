import { Link } from "react-router-dom";

// Dashboard sub-components
import DashboardStats from "../components/dashboard/DashboardStats";
import MarketOverview from "../components/dashboard/MarketOverview";
import PortfolioOverview from "../components/dashboard/PortfolioOverview";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function Dashboard({
  wallet = 10000,
  portfolio = [],
  portfolioValue = 0,
  coins = [],
  transactions = [],
}) {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 relative min-h-screen bg-[#0A0D12] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased pb-16">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-8">

        {/* =========================================
            1. INDUSTRIAL COMPACT HEADER BAR
        ========================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Trading Overview
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitor live markets, portfolio metrics, and execute simulated trades.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              to="/market"
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-900/80 text-slate-200 hover:border-emerald-500/40 hover:text-emerald-400 transition-all duration-200"
            >
              Markets
            </Link>
            <Link
              to="/trading"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              Open Trading Desk
            </Link>
          </div>
        </div>

        {/* =========================================
            2. KEY METRICS / STATS ROW
        ========================================= */}
        <section>
          <DashboardStats
            wallet={wallet}
            portfolio={portfolio}
            portfolioValue={portfolioValue}
          />
        </section>

        {/* =========================================
            3. MAIN DASHBOARD GRID LAYOUT
        ========================================= */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Left Column (Portfolio & Activity Logs) */}
          <div className="lg:col-span-8 space-y-8">
            <PortfolioOverview
              portfolio={portfolio}
              coins={coins}
            />

            <RecentTransactions
              transactions={transactions}
            />
          </div>

          {/* Right Column (Quick Actions & Market Watchlist) */}
          <div className="lg:col-span-4 space-y-8">
            <QuickActions />

            <MarketOverview
              coins={coins}
            />
          </div>

        </div>

      </div>
    </div>
  );
}