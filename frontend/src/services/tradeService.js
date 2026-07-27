import api from "./api";

// BUY COIN
export const buyCoin = async (coinId, quantity) => {
  const { data } = await api.post("/trades/buy", {
    coinId,
    quantity,
  });

  return data;
};

// SELL COIN
export const sellCoin = async (coinId, quantity) => {
  const { data } = await api.post("/trades/sell", {
    coinId,
    quantity,
  });

  return data;
};

// HISTORY
export const getTradeHistory = async () => {
  const { data } = await api.get("/trades/history");
  return data;
};

// DASHBOARD SUMMARY
export const getTradeSummary = async () => {
  const { data } = await api.get("/trades/summary");
  return data;
};