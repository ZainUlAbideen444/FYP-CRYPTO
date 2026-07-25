import PageHeader from "../components/UI/PageHeader";

import SummaryCards from "../components/Portfolio/SummaryCards";
import HoldingsTable from "../components/Portfolio/HoldingsTable";
import AllocationCard from "../components/Portfolio/AllocationCard";
import TransactionHistory from "../components/Portfolio/TransactionHistory";

import { useTradeContext } from "../context/TradeContext";

export default function Portfolio() {
  const {
    wallet,
    portfolio,
    transactions,
    coins,
  } = useTradeContext();

  // Calculate live portfolio value
  const portfolioValue = portfolio.reduce((total, asset) => {
    const liveCoin = coins.find(
      (coin) => coin.symbol === asset.symbol
    );

    const currentPrice = liveCoin
      ? liveCoin.price
      : asset.price;

    return total + currentPrice * asset.quantity;
  }, 0);

  return (
    <div className="space-y-10">

      <PageHeader
        title="Portfolio"
        subtitle="Track your investments, profits and crypto holdings."
      />

      {/* Summary */}

      <SummaryCards
        wallet={wallet}
        portfolio={portfolio}
        portfolioValue={portfolioValue}
      />

      {/* Holdings */}

      <HoldingsTable
        portfolio={portfolio}
        coins={coins}
      />

      {/* Bottom Section */}

      <div className="grid xl:grid-cols-5 gap-8">

        <div className="xl:col-span-2">
          <AllocationCard
            portfolio={portfolio}
            coins={coins}
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