import api from "./api";

export async function getTopCoins() {
  const { data } = await api.get("/market/top");
  return data;
}

export async function getMarketCoins() {
  const { data } = await api.get("/market/top");
  return data.coins;
}

export async function getCoin(id) {
  const { data } = await api.get(`/market/coin/${id}`);
  return data.coin;
}

export async function searchCoins(query) {
  const { data } = await api.get(`/market/search/${query}`);
  return data.coins;
}

export async function getChart(id, days = 7) {
  const { data } = await api.get(`/market/chart/${id}?days=${days}`);
  return data.prices;
}