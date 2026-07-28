import { useEffect, useState } from "react";

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

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      const [summaryData, holdingsData, historyData] =
        await Promise.all([
          getPortfolioSummary(),
          getHoldings(),
          getTradeHistory(),
        ]);

      setSummary(summaryData.summary || summaryData);

      setHoldings(
        holdingsData.holdings ||
          holdingsData ||
          []
      );

      setTransactions(
        historyData.trades || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-400 text-lg">
        Loading Portfolio...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      <PageHeader
        title="Portfolio"
        subtitle="Track your investments"
      />

      <SummaryCards
        wallet={summary?.walletBalance || 0}
        portfolio={holdings}
        portfolioValue={summary?.holdingsValue || 0}
      />

      <HoldingsTable
        portfolio={holdings}
      />

      <div className="grid xl:grid-cols-5 gap-8">

        <div className="xl:col-span-2">
          <AllocationCard
    portfolio={holdings}
    coins={[]}
/>
        </div>

        <div className="xl:col-span-3">
          <TransactionHistory
            transactions={transactions}
          />
        </div>

      </div>

    </div>
  );
}