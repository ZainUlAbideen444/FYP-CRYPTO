import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/UI/PageHeader";
import BuySellCard from "../components/Trading/BuySellCard";
import TradeSummary from "../components/Trading/TradeSummary";

import useTrade from "../hooks/useTrade";

export default function Trading() {
  const trade = useTrade();
  const [searchParams] = useSearchParams();

  // If the user arrived here via a "Trade" button on the Market page
  // (e.g. /trading?coin=BTC), preselect that coin.
  useEffect(() => {
    const symbol = searchParams.get("coin");
    if (!symbol) return;
    const match = trade.coins.find((c) => c.symbol === symbol);
    if (match) trade.setSelectedCoin(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Crypto Trading"
        subtitle="Practice buying and selling crypto using virtual funds."
      />

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 grid md:grid-cols-2 gap-8">
          <BuySellCard type="Buy" trade={trade} />
          <BuySellCard type="Sell" trade={trade} />
        </div>

        <TradeSummary trade={trade} />
      </div>
    </div>
  );
}
