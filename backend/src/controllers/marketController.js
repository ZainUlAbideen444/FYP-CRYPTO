import * as market from "../services/marketService.js";
import { httpError } from "../utils/httpError.js";
export async function top(_req, res) { const coins = await market.getTopCoins(); res.json({ success: true, coins, gainers: [...coins].sort((a,b) => b.change24h - a.change24h).slice(0, 5), losers: [...coins].sort((a,b) => a.change24h - b.change24h).slice(0, 5) }); }
export async function search(req, res) { if (!req.params.query?.trim()) throw httpError(400, "A search query is required."); res.json({ success: true, coins: await market.searchCoins(req.params.query) }); }
export async function coin(req, res) { res.json({ success: true, coin: await market.getCoin(req.params.id) }); }
export async function chart(req, res) { const days = Math.min(Math.max(Number(req.query.days) || 1, 1), 365); res.json({ success: true, prices: await market.getChart(req.params.id, days) }); }
export async function live(req, res) { const coins = await market.getTopCoins(); const coin = coins.find((item) => item.symbol === req.params.symbol.toUpperCase()); if (!coin) throw httpError(404, "Unsupported coin symbol."); res.json({ success: true, coin }); }
