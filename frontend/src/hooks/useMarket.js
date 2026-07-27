import { useEffect, useMemo, useState } from "react";
import { getMarketCoins } from "../services/marketService";

export default function useMarket() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadCoins() {
    try {
      const result = await getMarketCoins();
      setCoins(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoins();

    const interval = setInterval(loadCoins, 20000);

    return () => clearInterval(interval);
  }, []);

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) => {
      const value = search.toLowerCase();

      return (
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
      );
    });
  }, [coins, search]);

  return {
    coins,
    filteredCoins,
    loading,
    search,
    setSearch,
    refresh: loadCoins,
  };
}