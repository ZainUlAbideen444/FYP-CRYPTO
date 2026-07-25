import { useMemo, useState } from "react";
import { useTradeContext } from "../context/TradeContext";

export default function useTrade() {
  const { coins, wallet, portfolio, buy, sell } = useTradeContext();

  const [selectedCoin, setSelectedCoinState] = useState(coins[0]);
  const [quantity, setQuantity] = useState("");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message }

  // Keep selectedCoin's price fresh as the simulated market ticks.
  const liveSelectedCoin = useMemo(
    () => coins.find((c) => c.symbol === selectedCoin.symbol) || selectedCoin,
    [coins, selectedCoin]
  );

  const total = quantity === "" ? 0 : Number(quantity) * liveSelectedCoin.price;

  const holding = portfolio.find((p) => p.symbol === liveSelectedCoin.symbol);
  const ownedQuantity = holding ? holding.quantity : 0;

  function setSelectedCoin(coin) {
    setSelectedCoinState(coin);
    setFeedback(null);
  }

  function handleBuy() {
    const result = buy(liveSelectedCoin.symbol, quantity);
    setFeedback({ type: result.success ? "success" : "error", message: result.message });
    if (result.success) setQuantity("");
    return result;
  }

  function handleSell() {
    const result = sell(liveSelectedCoin.symbol, quantity);
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
    handleBuy,
    handleSell,
  };
}
