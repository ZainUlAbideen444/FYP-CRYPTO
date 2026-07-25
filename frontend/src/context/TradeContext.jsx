import { createContext, useContext, useEffect, useRef, useState } from "react";
import baseCoins from "../data/coins";
import { buyCoin as validateBuy, sellCoin as validateSell } from "../services/tradeService";
import { addHolding, removeHolding } from "../services/PortfolioService";
import { calculateRealizedProfit } from "../utils/calculateProfit";

const TradeContext = createContext();

const STORAGE_KEY = "cryptoweb_trade_state";
const STARTING_WALLET = 10000;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return null;
    return saved;
  } catch {
    return null;
  }
}

export function TradeProvider({ children }) {
  const saved = loadState();

  const [coins, setCoins] = useState(saved?.coins || baseCoins);
  const [wallet, setWallet] = useState(saved?.wallet ?? STARTING_WALLET);
  const [portfolio, setPortfolio] = useState(saved?.portfolio || []);
  const [transactions, setTransactions] = useState(saved?.transactions || []);
  const [realizedProfit, setRealizedProfit] = useState(saved?.realizedProfit || 0);

  // Persist everything whenever it changes.
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ coins, wallet, portfolio, transactions, realizedProfit })
    );
  }, [coins, wallet, portfolio, transactions, realizedProfit]);

  // Simulate a live market: gently randomwalk each coin's price every few seconds.
  const tickRef = useRef();
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setCoins((prev) =>
        prev.map((coin) => {
          const driftPercent = (Math.random() - 0.5) * 0.6; // +/-0.3%
          const newPrice = Math.max(0.01, coin.price * (1 + driftPercent / 100));
          const newChange = coin.change + driftPercent;
          return {
            ...coin,
            price: Number(newPrice.toFixed(newPrice < 10 ? 4 : 2)),
            change: Number(newChange.toFixed(2)),
          };
        })
      );
    }, 4000);

    return () => clearInterval(tickRef.current);
  }, []);

  function getCoin(symbol) {
    return coins.find((c) => c.symbol === symbol);
  }

  function buy(symbol, quantityInput) {
    const coin = getCoin(symbol);
    const quantity = Number(quantityInput);
    const total = coin ? coin.price * quantity : 0;

    const validation = validateBuy({ wallet, total, quantity });
    if (!validation.success) return validation;

    setWallet((w) => Number((w - total).toFixed(2)));
    setPortfolio((p) => addHolding(p, coin, quantity, coin.price));
    setTransactions((t) => [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        coin: coin.name,
        symbol: coin.symbol,
        type: "BUY",
        quantity,
        price: coin.price,
        total,
      },
      ...t,
    ]);

    return { success: true, message: `Bought ${quantity} ${coin.symbol}` };
  }

  function sell(symbol, quantityInput) {
    const coin = getCoin(symbol);
    const quantity = Number(quantityInput);
    const holding = portfolio.find((p) => p.symbol === symbol);

    const validation = validateSell({ holding, quantity });
    if (!validation.success) return validation;

    const total = coin.price * quantity;
    const profit = calculateRealizedProfit(holding.avgBuyPrice, coin.price, quantity);

    setWallet((w) => Number((w + total).toFixed(2)));
    setPortfolio((p) => removeHolding(p, coin, quantity));
    setRealizedProfit((r) => Number((r + profit).toFixed(2)));
    setTransactions((t) => [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        coin: coin.name,
        symbol: coin.symbol,
        type: "SELL",
        quantity,
        price: coin.price,
        total,
        profit,
      },
      ...t,
    ]);

    return { success: true, message: `Sold ${quantity} ${coin.symbol}` };
  }

  function resetAccount() {
    setWallet(STARTING_WALLET);
    setPortfolio([]);
    setTransactions([]);
    setRealizedProfit(0);
    setCoins(baseCoins);
  }

  return (
    <TradeContext.Provider
      value={{
        coins,
        wallet,
        portfolio,
        transactions,
        realizedProfit,
        getCoin,
        buy,
        sell,
        resetAccount,
        // legacy setters kept for backward compatibility with older components
        setWallet,
        setPortfolio,
        setTransactions,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTradeContext() {
  return useContext(TradeContext);
}
