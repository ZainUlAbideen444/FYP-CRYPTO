// Wallet state now lives inside TradeContext (single source of truth for
// wallet, portfolio, and transactions) to avoid state getting out of sync
// across contexts. This file re-exports the same hook so any future code
// that imports from WalletContext still works.
export { useTradeContext as useWalletContext } from "./TradeContext";
