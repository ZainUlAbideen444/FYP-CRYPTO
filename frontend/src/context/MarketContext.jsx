// Live coin data now lives inside TradeContext, since prices need to stay in
// sync with the user's portfolio valuation. This file re-exports the same
// hook so any future code that imports from MarketContext still works.
export { useTradeContext as useMarketContext } from "./TradeContext";
