// backend/src/services/marketService.js

// In-memory price cache to avoid hitting CoinGecko rate limits (429)
let marketCache = {
  data: [
    { id: "bitcoin", symbol: "btc", name: "Bitcoin", price: 65000, current_price: 65000 },
    { id: "ethereum", symbol: "eth", name: "Ethereum", price: 3400, current_price: 3400 },
    { id: "binancecoin", symbol: "bnb", name: "BNB", price: 580, current_price: 580 },
    { id: "solana", symbol: "sol", name: "Solana", price: 145, current_price: 145 },
    { id: "ripple", symbol: "xrp", name: "XRP", price: 0.55, current_price: 0.55 },
    { id: "cardano", symbol: "ada", name: "Cardano", price: 0.45, current_price: 0.45 },
  ],
  lastFetched: 0,
};

// 1. Fetch Top Coins List
export async function getTopCoins() {
  const NOW = Date.now();
  // Return cached data if fetched less than 30 seconds ago
  if (NOW - marketCache.lastFetched < 30000 && marketCache.data.length > 0) {
    return marketCache.data;
  }

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false",
      { signal: AbortSignal.timeout(5000) }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((c) => ({
          id: c.id,
          symbol: c.symbol.toLowerCase(),
          name: c.name,
          price: c.current_price,
          current_price: c.current_price,
          image: c.image,
          price_change_percentage_24h: c.price_change_percentage_24h || 0,
        }));

        marketCache.data = formatted;
        marketCache.lastFetched = NOW;
        return formatted;
      }
    }
  } catch (error) {
    console.warn("[Market Service] CoinGecko top coins fetch failed. Using fallback cache.");
  }

  return marketCache.data;
}

// 2. Fetch Single Coin Quote
export async function getQuote(coinId) {
  const normalizedId = (coinId || "bitcoin").toLowerCase();

  const aliasMap = {
    btc: "bitcoin",
    eth: "ethereum",
    bnb: "binancecoin",
    sol: "solana",
    xrp: "ripple",
    ada: "cardano",
  };

  const targetId = aliasMap[normalizedId] || normalizedId;

  const cachedCoin = marketCache.data.find(
    (c) => c.id === targetId || c.symbol === normalizedId
  );

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${targetId}&vs_currencies=usd`,
      { signal: AbortSignal.timeout(4000) }
    );

    if (res.ok) {
      const data = await res.json();
      if (data && data[targetId]) {
        const livePrice = data[targetId].usd;
        return {
          id: targetId,
          symbol: normalizedId.toUpperCase(),
          name: targetId.toUpperCase(),
          price: livePrice,
          current_price: livePrice,
        };
      }
    }
  } catch (error) {
    console.warn(`[Market Service] Live quote failed for ${targetId}. Using cached/fallback quote.`);
  }

  if (cachedCoin) {
    return {
      id: cachedCoin.id,
      symbol: cachedCoin.symbol.toUpperCase(),
      name: cachedCoin.name,
      price: cachedCoin.price || cachedCoin.current_price,
      current_price: cachedCoin.price || cachedCoin.current_price,
    };
  }

  return {
    id: targetId,
    symbol: normalizedId.toUpperCase(),
    name: targetId.toUpperCase(),
    price: 100,
    current_price: 100,
  };
}

// 3. Market Stream Initializer (Required by server.js)
export function startMarketStream(io) {
  console.log("[Market Stream] Market background updater initialized.");
  
  const interval = setInterval(async () => {
    try {
      const updatedData = await getTopCoins();
      if (io && updatedData) {
        io.emit("marketUpdate", updatedData);
      }
    } catch (err) {
      console.warn("[Market Stream] Polling warning:", err.message);
    }
  }, 30000);

  return interval;
}