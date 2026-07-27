import api from "./api";

export async function buyCoin(coinId, quantity) {
  const { data } = await api.post("/trades/buy", {
    coinId,
    quantity: Number(quantity),
  });

  return data;
}

export async function sellCoin(coinId, quantity) {
  const { data } = await api.post("/trades/sell", {
    coinId,
    quantity: Number(quantity),
  });

  return data;
}

export async function getTradeSummary() {
  const { data } = await api.get("/trades/summary");
  return data;
}

export async function getTradeHistory(page = 1) {
  const { data } = await api.get(`/trades/history?page=${page}`);

  return data;
}