import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/UI/PageHeader";

import SummaryCards from "../components/Portfolio/SummaryCards";
import HoldingsTable from "../components/Portfolio/HoldingsTable";
import AllocationCard from "../components/Portfolio/AllocationCard";
import TransactionHistory from "../components/Portfolio/TransactionHistory";

import {
  getPortfolioSummary,
  getHoldings,
} from "../services/PortfolioService";

import { getTradeHistory } from "../services/tradeService";

import {
  FaEye,
  FaEyeSlash,
  FaArrowUpRightFromSquare,
  FaPlus,
  FaRightLeft,
  FaChartPie,
  FaListUl,
  FaClockRotateLeft,
} from "react-icons/fa6";

export default function Portfolio() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [summary, setSummary] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      const [summaryData, holdingsData, historyData] = await Promise.all([
        getPortfolioSummary(),
        getHoldings(),
        getTradeHistory(),
      ]);

      setSummary(summaryData.summary || summaryData);
      setHoldings(holdingsData.holdings || holdingsData || []);
      setTransactions(historyData.trades || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
          Loading Portfolio Dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-[1500px] mx-auto">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-[#0B0E17] via-[#121827] to-[#0B0E17] p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Live Asset Telemetry
            </div>
            <PageHeader
              title="Portfolio Command"
              subtitle="Real-time performance analytics, allocation maps, and transaction auditing."
            />
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setHideBalance(!hideBalance)}
              className="px-4 py-2.5 rounded-xl border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-all text-xs font-semibold flex items-center gap-2"
            >
              {hideBalance ? <FaEyeSlash className="text-sky-400" /> : <FaEye />}
              <span>{hideBalance ? "Show Values" : "Hide Values"}</span>
            </button>

            <button
              onClick={() => navigate("/market")}
              className="px-4 py-2.5 rounded-xl border border-slate-700/60 bg-slate-900/80 hover:border-sky-500/40 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center gap-2"
            >
              <FaRightLeft className="text-sky-400" />
              Trade Market
            </button>

            <button
              onClick={() => navigate("/wallet")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
            >
              <FaPlus />
              Deposit Funds
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className={hideBalance ? "blur-md select-none transition-all duration-300" : "transition-all duration-300"}>
        <SummaryCards
          wallet={summary?.walletBalance || 0}
          portfolio={holdings}
          portfolioValue={summary?.holdingsValue || 0}
        />
      </div>

      {/* Main Content Area with Segmented Control */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80 text-xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-slate-800 text-sky-400 shadow-md border border-slate-700/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FaListUl /> Overview
            </button>
            <button
              onClick={() => setActiveTab("allocation")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === "allocation"
                  ? "bg-slate-800 text-sky-400 shadow-md border border-slate-700/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FaChartPie /> Allocation
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === "activity"
                  ? "bg-slate-800 text-sky-400 shadow-md border border-slate-700/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FaClockRotateLeft /> Trade History
            </button>
          </div>

          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            Active Holdings: <strong className="text-slate-200">{holdings.length} Assets</strong>
          </span>
        </div>

        {/* Dynamic View Sections */}
        {(activeTab === "overview" || activeTab === "holdings") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Asset Portfolio
              </h2>
            </div>
            <div
              className={`rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-xl ${
                hideBalance ? "blur-md select-none" : ""
              }`}
            >
              <HoldingsTable portfolio={holdings} />
            </div>
          </div>
        )}

        {/* Bento Grid layout for Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-5 space-y-3">
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono px-1">
                Distribution Breakdown
              </h2>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md shadow-xl">
                <AllocationCard portfolio={holdings} coins={[]} />
              </div>
            </div>

            <div className="xl:col-span-7 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
                  Recent Orders
                </h2>
                <button
                  onClick={() => navigate("/history")}
                  className="text-xs font-semibold text-sky-400 hover:underline flex items-center gap-1"
                >
                  View All <FaArrowUpRightFromSquare className="text-[10px]" />
                </button>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md shadow-xl">
                <TransactionHistory transactions={transactions} />
              </div>
            </div>
          </div>
        )}

        {/* Standalone Tab Views */}
        {activeTab === "allocation" && (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md shadow-xl">
            <AllocationCard portfolio={holdings} coins={[]} />
          </div>
        )}

        {activeTab === "activity" && (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md shadow-xl">
            <TransactionHistory transactions={transactions} />
          </div>
        )}
      </div>
    </div>
  );
}