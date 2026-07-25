// Placeholder for live market data. Currently the app simulates prices in
// TradeContext. Swap this in once CoinGecko integration (roadmap step 9) is
// wired up on the backend.

export async function fetchLiveCoins() {
  throw new Error("Live market service not yet connected. Using simulated prices.");
}
