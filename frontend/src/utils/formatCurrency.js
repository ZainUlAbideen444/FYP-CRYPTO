export function formatCurrency(value, options = {}) {
  const number = Number(value) || 0;
  const { decimals = 2, compact = false } = options;

  if (compact) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

export function formatNumber(value, decimals = 4) {
  const number = Number(value) || 0;
  return number.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value, decimals = 2) {
  const number = Number(value) || 0;
  const sign = number > 0 ? "+" : "";
  return `${sign}${number.toFixed(decimals)}%`;
}
