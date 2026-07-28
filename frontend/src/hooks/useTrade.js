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

      setWallet(data.summary.walletBalance || 0);
      setPortfolio(data.summary.holdings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    if (!selectedCoin && coins.length > 0) {
      setSelectedCoin(coins[0]);
    }
  }, [coins, selectedCoin]);

  const total = useMemo(() => {
    if (!selectedCoin) return 0;

    return (Number(quantity) || 0) * selectedCoin.price;
  }, [quantity, selectedCoin]);

  const ownedQuantity = useMemo(() => {
    const holding = portfolio.find(
      (item) => item.symbol === selectedCoin?.symbol
    );

    return holding?.quantity || 0;
  }, [portfolio, selectedCoin]);

async function handleBuy() {
  if (!selectedCoin)
    return;

  const qty = Number(quantity);

  if (!qty || qty <= 0) {
    setFeedback({
      type: "error",
      message: "Enter a valid quantity.",
    });
    return;
  }

  try {
    const res = await buyCoin(selectedCoin.id, qty);

    setFeedback({
      type: "success",
      message: res.message,
    });

    setQuantity("");

    await loadSummary();
  } catch (err) {
    setFeedback({
      type: "error",
      message:
        err.response?.data?.message ||
        err.message,
    });
  }
}

  async function handleSell() {
    if (!selectedCoin) return;

    try {
      const res = await sellCoin(selectedCoin.id, quantity);

      setFeedback({
        type: "success",
        message: res.message,
      });

      setQuantity("");

      await loadSummary();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message || "Unable to sell coin.",
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