const COINGECKO_URL = "https://api.coingecko.com/api/v3";
const DEFAULT_IDS = ["bitcoin", "ethereum", "solana", "binancecoin", "ripple", "cardano"];
let cache = { coins: [], updatedAt: 0 };

async function request(path) {
  const response = await fetch(`${COINGECKO_URL}${path}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("Market data is temporarily unavailable.");
  return response.json();
}
function normalize(coin) { return { id: coin.id, symbol: coin.symbol.toUpperCase(), name: coin.name, image: coin.image, price: coin.current_price ?? coin.usd, change24h: coin.price_change_percentage_24h ?? coin.usd_24h_change ?? 0, marketCap: coin.market_cap, volume: coin.total_volume, updatedAt: Date.now() }; }
export async function getTopCoins() {
  if (cache.coins.length && Date.now() - cache.updatedAt < 30_000) return cache.coins;
  const data = await request("/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h");
  cache = { coins: data.map(normalize), updatedAt: Date.now() };
  return cache.coins;
}
export async function searchCoins(query) { const data = await request(`/search?query=${encodeURIComponent(query)}`); return data.coins.slice(0, 12).map((coin) => ({ id: coin.id, name: coin.name, symbol: coin.symbol.toUpperCase(), image: coin.large || coin.thumb })); }
export async function getCoin(id) { const data = await request(`/coins/${encodeURIComponent(id)}?localization=false&tickers=false&community_data=false&developer_data=false`); return { id: data.id, name: data.name, symbol: data.symbol.toUpperCase(), image: data.image?.large, price: data.market_data.current_price.usd, change24h: data.market_data.price_change_percentage_24h, marketCap: data.market_data.market_cap.usd, volume: data.market_data.total_volume.usd }; }
export async function getChart(id, days = 1) { const data = await request(`/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=${days}`); return data.prices.map(([time, price]) => ({ time, price })); }
export async function getQuote(id) { const coin = (await getTopCoins()).find((item) => item.id === id); return coin || getCoin(id); }
export function startMarketStream(io) { setInterval(async () => { try { io.emit("market:prices", await getTopCoins()); } catch { /* retain last client values during upstream outages */ } }, 20_000); }
