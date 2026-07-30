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

  if (trade.loading || !trade.selectedCoin?.id)
    return (
      <div className="flex flex-col items-center justify-center py-36 space-y-4">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
          Streaming Order Book Feeds...
        </span>
      </div>
    );

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16">
      {/* Binance Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-4 gap-4">
        <PageHeader
          title="Spot Trading Terminal"
          subtitle="Real-time order matching engine with instant virtual settlement."
        />
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SPOT / USDT LIVE
          </div>
        </div>
      </div>

      {/* Main Exchange Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Full Height Buy Panel */}
        <div className="lg:col-span-4 min-h-[620px]">
          <BuySellCard type="Buy" trade={trade} />
        </div>

        {/* Full Height Sell Panel */}
        <div className="lg:col-span-4 min-h-[620px]">
          <BuySellCard type="Sell" trade={trade} />
        </div>

        {/* Account Telemetry & Portfolio Summary */}
        <div className="lg:col-span-4 min-h-[620px]">
          <TradeSummary trade={trade} />
        </div>
      </div>
    </div>
  );
}