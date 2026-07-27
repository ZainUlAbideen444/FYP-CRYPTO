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

  const [summary, setSummary] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      const summaryData = await getPortfolioSummary();
      const holdingsData = await getHoldings();
      const history = await getTradeHistory();

      setSummary(summaryData);
      setHoldings(holdingsData);
      setTransactions(history.trades);
    } catch (err) {
      console.error(err);
    }
  }

  if (!summary)
    return (
      <div className="text-center py-20 text-gray-400">
        Loading Portfolio...
      </div>
    );

  return (
    <div className="space-y-10">

      <PageHeader
        title="Portfolio"
        subtitle="Track your investments"
      />

      <SummaryCards
        wallet={summary.walletBalance}
        portfolio={holdings}
        portfolioValue={summary.holdingsValue}
      />

      <HoldingsTable
        portfolio={holdings}
      />

      <div className="grid xl:grid-cols-5 gap-8">

        <div className="xl:col-span-2">
          <AllocationCard
            portfolio={summary.allocation}
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