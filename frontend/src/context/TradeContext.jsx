import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getTopCoins } from "../services/marketService";

import {
  getTradeSummary,
  getTradeHistory,
  buyCoin,
  sellCoin,
} from "../services/tradeService";

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);

  async function refresh() {
    try {
      const [market, summary, history] = await Promise.all([
        getTopCoins(),
        getTradeSummary(),
        getTradeHistory(),
      ]);

      setCoins(market.coins || []);
      setWallet(summary.summary.walletBalance || 0);
      setPortfolio(summary.summary.holdings || []);
      setTransactions(history.trades || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(refresh, 20000);

    return () => clearInterval(interval);
  }, []);

  async function buy(coinId, quantity) {
    try {
      const res = await buyCoin(coinId, quantity);

      await refresh();

      return {
        success: true,
        message: res.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async function sell(coinId, quantity) {
    try {
      const res = await sellCoin(coinId, quantity);

      await refresh();

      return {
        success: true,
        message: res.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  return (
    <TradeContext.Provider
      value={{
        loading,
        coins,
        wallet,
        portfolio,
        transactions,
        refresh,
        buy,
        sell,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
}

export function useTradeContext() {
  return useContext(TradeContext);
}