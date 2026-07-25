// Adds a BUY to the portfolio, recalculating the weighted average buy price.
export function addHolding(portfolio, coin, quantity, price) {
  const existing = portfolio.find((item) => item.symbol === coin.symbol);

  if (existing) {
    const totalQuantity = existing.quantity + quantity;
    const totalCost = existing.quantity * existing.avgBuyPrice + quantity * price;
    const avgBuyPrice = totalCost / totalQuantity;

    return portfolio.map((item) =>
      item.symbol === coin.symbol
        ? { ...item, quantity: totalQuantity, avgBuyPrice }
        : item
    );
  }

  return [
    ...portfolio,
    {
      symbol: coin.symbol,
      name: coin.name,
      quantity,
      avgBuyPrice: price,
    },
  ];
}

// Removes a SELL quantity from the portfolio. Drops the holding once it hits 0.
export function removeHolding(portfolio, coin, quantity) {
  return portfolio
    .map((item) =>
      item.symbol === coin.symbol
        ? { ...item, quantity: item.quantity - quantity }
        : item
    )
    .filter((item) => item.quantity > 0.00000001);
}
