import { createContext, useContext } from "react";
import useMarket from "../hooks/useMarket";

const MarketContext = createContext();

export function MarketProvider({ children }) {
  const market = useMarket();

  return (
    <MarketContext.Provider value={market}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarketContext() {
  return useContext(MarketContext);
}