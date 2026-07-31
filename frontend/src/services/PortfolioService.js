import api from "./api";

export const getPortfolioSummary = async () => {
  try {
    const response = await api.get("/portfolio");
    // Standardizes backend response variations safely
    return response.data?.summary || response.data || { holdings: [], totalValue: 0, totalProfitLoss: 0 };
  } catch (error) {
    console.error("Error fetching portfolio summary:", error);
    return { holdings: [], totalValue: 0, totalProfitLoss: 0 };
  }
};

export const getPerformanceAnalytics = async () => {
  try {
    const response = await api.get("/performance");
    return response.data?.analytics || response.data || { monthlyPnL: [], assetAllocation: [] };
  } catch (error) {
    console.error("Error fetching performance analytics:", error);
    return { monthlyPnL: [], assetAllocation: [] };
  }
};

// Fixed: Added exported resetPortfolio function requested by TradeContext.jsx
export const resetPortfolio = async () => {
  try {
    const response = await api.post("/portfolio/reset");
    return response.data;
  } catch (error) {
    console.error("Error resetting portfolio:", error);
    return { success: false, message: error.response?.data?.message || "Failed to reset portfolio" };
  }
};