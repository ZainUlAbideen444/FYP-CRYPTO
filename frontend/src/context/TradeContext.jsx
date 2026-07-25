/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const TradeContext = createContext();
export function TradeProvider({ children }) {
  const { user, loading: authLoading } = useAuthContext();
  const [coins, setCoins] = useState([]); const [wallet, setWallet] = useState(0); const [portfolio, setPortfolio] = useState([]); const [transactions, setTransactions] = useState([]); const [realizedProfit, setRealizedProfit] = useState(0); const [loading, setLoading] = useState(true);
  const hydrate = useCallback(async () => { try { const [market, summary] = await Promise.all([api.get("/market/top"), api.get("/trades/summary")]); const data = summary.data.summary; setCoins(market.data.coins.map((coin) => ({ ...coin, change: coin.change24h }))); setWallet(data.walletBalance); setPortfolio(data.holdings.map((item) => ({ ...item, id: item._id, avgBuyPrice: item.averageBuyPrice }))); setTransactions(data.recentTrades.map((item) => ({ ...item, id: item._id, date: item.createdAt, coin: item.name, total: item.totalValue, profit: item.realizedProfit, type: item.type.toUpperCase() }))); setRealizedProfit(data.realizedProfit); } finally { setLoading(false); } }, []);
  useEffect(() => { if (!user) { setCoins([]); setWallet(0); setPortfolio([]); setTransactions([]); setLoading(false); return; } hydrate().catch(() => setLoading(false)); const interval = setInterval(() => hydrate().catch(() => {}), 30_000); return () => clearInterval(interval); }, [hydrate, user]);
  useEffect(() => { if (!user) return; const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", { withCredentials: true }); socket.on("market:prices", (nextCoins) => setCoins(nextCoins.map((coin) => ({ ...coin, change: coin.change24h })))); return () => socket.close(); }, [user]);
  async function execute(type, coinId, quantity) { try { const { data } = await api.post(`/trades/${type}`, { coinId, quantity }); await hydrate(); return { success: true, message: data.message }; } catch (error) { return { success: false, message: error.message || "Trade could not be completed." }; } }
  const buy = (coinId, quantity) => execute("buy", coinId, quantity); const sell = (coinId, quantity) => execute("sell", coinId, quantity);
  async function resetAccount() { try { const { data } = await api.post("/portfolio/reset"); await hydrate(); return { success: true, message: data.message }; } catch (error) { return { success: false, message: error.message }; } }
  return <TradeContext.Provider value={{ coins, wallet, portfolio, transactions, realizedProfit, loading: loading || authLoading, getCoin: (id) => coins.find((coin) => coin.id === id || coin.symbol === id), buy, sell, resetAccount, refresh: hydrate }}>{children}</TradeContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTradeContext() { return useContext(TradeContext); }
