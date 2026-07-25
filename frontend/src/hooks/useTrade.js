import { useMemo, useState } from "react";
import { useTradeContext } from "../context/TradeContext";

export default function useTrade() {
  const { coins, wallet, portfolio, buy, sell, loading } = useTradeContext();

  const [selectedCoin, setSelectedCoinState] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message }

  // Keep selectedCoin's price fresh as the simulated market ticks.
  const liveSelectedCoin = useMemo(
    () => coins.find((c) => c.id === selectedCoin?.id) || selectedCoin || coins[0] || {},
    [coins, selectedCoin]
  );

  const total = quantity === "" ? 0 : Number(quantity) * (liveSelectedCoin.price || 0);

  const holding = portfolio.find((p) => p.symbol === liveSelectedCoin.symbol);
  const ownedQuantity = holding ? holding.quantity : 0;

  function setSelectedCoin(coin) {
    setSelectedCoinState(coin);
    setFeedback(null);
  }

  async function handleBuy() {
    const result = await buy(liveSelectedCoin.id, quantity);
    setFeedback({ type: result.success ? "success" : "error", message: result.message });
    if (result.success) setQuantity("");
    return result;
  }

  async function handleSell() {
    const result = await sell(liveSelectedCoin.id, quantity);
    setFeedback({ type: result.success ? "success" : "error", message: result.message });
    if (result.success) setQuantity("");
    return result;
  }

  return {
    coins,
    selectedCoin: liveSelectedCoin,
    setSelectedCoin,
    quantity,
    setQuantity,
    total,
    wallet,
    ownedQuantity,
    feedback,
    loading,
    handleBuy,
    handleSell,
  };
}
