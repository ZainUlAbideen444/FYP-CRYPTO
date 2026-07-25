import { useMemo, useState } from "react";
import { useTradeContext } from "../context/TradeContext";

export default function useMarket() {
  const { coins } = useTradeContext();
  const [search, setSearch] = useState("");

  const filteredCoins = useMemo(() => {
    if (!search.trim()) return coins;
    const query = search.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, search]);

  return { coins, filteredCoins, search, setSearch };
}
