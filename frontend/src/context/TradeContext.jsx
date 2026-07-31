import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTradeData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch summary (analytics)
      const summaryRes = await api.get("/trades/summary");
      const summaryData = summaryRes.data?.summary || summaryRes.data || {};

      // Extracts walletBalance (matches User model field)
      const balance =
        summaryData.walletBalance ??
        summaryData.wallet ??
        summaryData.cash ??
        0;

      // Extract holdings / portfolio array
      const rawPortfolio =
        summaryData.holdings ||
        summaryData.portfolio ||
        summaryData.assets ||
        [];

      setWallet(Number(balance));
      setPortfolio(Array.isArray(rawPortfolio) ? rawPortfolio : []);

      // Fetch history
      const historyRes = await api.get("/trades/history");
      const rawHistory = historyRes.data?.trades || [];
      setHistory(Array.isArray(rawHistory) ? rawHistory : []);
    } catch (error) {
      console.error("Error fetching trade context data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const executeTrade = async (type, coinIdOrSymbol, amount, price) => {
    try {
      const endpoint = type === "BUY" ? "/trades/buy" : "/trades/sell";
      
      // Sends both coinId and quantity to match tradeController.js expectations
      const payload = {
        coinId: coinIdOrSymbol.toLowerCase(),
        quantity: Number(amount),
        price: Number(price),
      };

      const response = await api.post(endpoint, payload);
      await fetchTradeData(); // Refresh holdings & balance immediately

      return { success: true, data: response.data };
    } catch (err) {
      console.error("Execute Trade Error:", err);
      return {
        success: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Transaction failed on server.",
      };
    }
  };

  useEffect(() => {
    fetchTradeData();
  }, [fetchTradeData]);

  return (
    <TradeContext.Provider
      value={{
        portfolio,
        wallet,
        history,
        loading,
        executeTrade,
        refreshTrades: fetchTradeData,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => useContext(TradeContext);