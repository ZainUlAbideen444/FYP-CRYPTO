import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

const DEFAULT_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 65000, current_price: 65000 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 3400, current_price: 3400 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", price: 580, current_price: 580 },
  { id: "solana", symbol: "SOL", name: "Solana", price: 145, current_price: 145 },
];

export default function useMarket() {
  const [coins, setCoins] = useState(DEFAULT_COINS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarketData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/market/top");

      // Handle direct array or { coins: [...] }
      const coinList = Array.isArray(res.data)
        ? res.data
        : res.data?.coins || res.data?.data || [];

      if (coinList.length > 0) {
        setCoins(coinList);
        setError(null);
      }
    } catch (err) {
      console.warn("Market fetch failed, using fallback market state:", err.message);
      // Keep default coins active so dropdown & trade terminal remain fully usable
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    // Poll every 30 seconds to prevent hitting API limits
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  return {
    coins,
    loading,
    error,
    refreshMarket: fetchMarketData,
  };
}