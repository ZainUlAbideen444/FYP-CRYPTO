import api from "./api";

// Dashboard Summary
export const getPortfolioSummary = async () => {
  const { data } = await api.get("/portfolio");
  return data.summary;
};

// Holdings
export const getHoldings = async () => {
  const { data } = await api.get("/portfolio/holdings");
  return data.holdings;
};

// Performance
export const getPerformance = async () => {
  const { data } = await api.get("/portfolio/performance");
  return data.performance;
};

// Reset Portfolio
export const resetPortfolio = async () => {
  const { data } = await api.post("/portfolio/reset");
  return data;
};