// Validates and prepares a BUY order. Pure function — no side effects.
export function buyCoin({ wallet, total, quantity }) {
  if (!quantity || Number(quantity) <= 0) {
    return { success: false, message: "Enter a valid quantity." };
  }

  if (wallet < total) {
    return { success: false, message: "Insufficient balance to complete this purchase." };
  }

  return { success: true };
}

// Validates a SELL order against the user's current holding.
export function sellCoin({ holding, quantity }) {
  if (!quantity || Number(quantity) <= 0) {
    return { success: false, message: "Enter a valid quantity." };
  }

  if (!holding || holding.quantity < Number(quantity)) {
    return { success: false, message: "You don't own enough of this coin to sell that amount." };
  }

  return { success: true };
}
