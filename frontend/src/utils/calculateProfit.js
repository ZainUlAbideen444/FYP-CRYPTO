// Calculates unrealized profit/loss for a single holding
export function calculateHoldingProfit(holding, currentPrice) {
  const invested = holding.quantity * holding.avgBuyPrice;
  const currentValue = holding.quantity * currentPrice;
  const profit = currentValue - invested;
  const profitPercent = invested === 0 ? 0 : (profit / invested) * 100;

  return {
    invested,
    currentValue,
    profit,
    profitPercent,
  };
}

// Aggregates profit/loss across an entire portfolio
export function calculatePortfolioProfit(portfolio, coins) {
  return portfolio.reduce(
    (totals, holding) => {
      const coin = coins.find((c) => c.symbol === holding.symbol);
      const currentPrice = coin ? coin.price : holding.avgBuyPrice;
      const { invested, currentValue, profit } = calculateHoldingProfit(
        holding,
        currentPrice
      );

      return {
        invested: totals.invested + invested,
        currentValue: totals.currentValue + currentValue,
        profit: totals.profit + profit,
      };
    },
    { invested: 0, currentValue: 0, profit: 0 }
  );
}

// Calculates realized profit/loss from a completed SELL transaction
export function calculateRealizedProfit(avgBuyPrice, sellPrice, quantity) {
  return (sellPrice - avgBuyPrice) * quantity;
}
