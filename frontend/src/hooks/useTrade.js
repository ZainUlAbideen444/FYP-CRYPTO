import { useEffect, useMemo, useState } from "react";
import { useMarketContext } from "../context/MarketContext";
import {
  buyCoin,
  sellCoin,
  getTradeSummary,
} from "../services/tradeService";

export default function useTrade() {
  const { coins } = useMarketContext();

  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [feedback, setFeedback] = useState(null);

  async function loadSummary() {
    try {
      const data = await getTradeSummary();
      setWallet(data.summary?.walletBalance || 0);
      setPortfolio(data.summary?.holdings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  // Sync selectedCoin when market coins load without resetting manual selections
  useEffect(() => {
    if (coins && coins.length > 0) {
      if (!selectedCoin) {
        setSelectedCoin(coins[0]);
      } else {
        // Keep selected coin synchronized with live market price updates
        const updatedCoin = coins.find(
          (c) => String(c.id) === String(selectedCoin.id)
        );
        if (updatedCoin) {
          setSelectedCoin(updatedCoin);
        }
      }
    }
  }, [coins]);

  const total = useMemo(() => {
    if (!selectedCoin?.price) return 0;
    return (Number(quantity) || 0) * selectedCoin.price;
  }, [quantity, selectedCoin]);

  const ownedQuantity = useMemo(() => {
    if (!selectedCoin || !portfolio.length) return 0;
    const holding = portfolio.find(
      (item) =>
        item.symbol?.toLowerCase() === selectedCoin.symbol?.toLowerCase() ||
        item.coinId === selectedCoin.id
    );
    return holding?.quantity || holding?.amount || 0;
  }, [portfolio, selectedCoin]);

  async function handleBuy() {
    if (!selectedCoin) return;
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      setFeedback({
        type: "error",
        message: "Please enter a valid quantity.",
      });
      return;
    }

    try {
      const res = await buyCoin(selectedCoin.id, qty);
      setFeedback({
        type: "success",
        message: res.message || "Purchase executed successfully!",
      });
      setQuantity("");
      await loadSummary();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || err.message || "Buy order failed.",
      });
    }
  }

  async function handleSell() {
    if (!selectedCoin) return;
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      setFeedback({
        type: "error",
        message: "Please enter a valid quantity.",
      });
      return;
    }

    try {
      const res = await sellCoin(selectedCoin.id, qty);
      setFeedback({
        type: "success",
        message: res.message || "Sell order executed successfully!",
      });
      setQuantity("");
      await loadSummary();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || err.message || "Sell order failed.",
      });
    }
  }

  return {
    coins,
    loading,
    wallet,
    portfolio,
    selectedCoin,
    setSelectedCoin,
    quantity,
    setQuantity,
    total,
    ownedQuantity,
    feedback,
    handleBuy,
    handleSell,
    refresh: loadSummary,
  };
}