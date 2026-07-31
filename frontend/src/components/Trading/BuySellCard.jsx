import { FaArrowUp, FaArrowDown, FaChevronDown } from "react-icons/fa6";
import { CoinIcon } from "../../utils/getCoinIcons";

export default function BuySellCard({ type, trade }) {
  const isBuy = type === "Buy";

  const submitTrade = () => {
    if (isBuy) trade.handleBuy();
    else trade.handleSell();
  };

  const handlePercentClick = (percent) => {
    if (isBuy) {
      if (!trade.selectedCoin?.price) return;
      const maxCoinsToBuy = trade.wallet / trade.selectedCoin.price;
      trade.setQuantity((maxCoinsToBuy * (percent / 100)).toFixed(4));
    } else {
      trade.setQuantity((trade.ownedQuantity * (percent / 100)).toFixed(4));
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#0B0E17]/95 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full min-h-[600px]">
      <div className="space-y-5">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                isBuy
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
              }`}
            >
              {isBuy ? <FaArrowUp /> : <FaArrowDown />}
            </div>
            <div>
              <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                {type} {trade.selectedCoin?.symbol?.toUpperCase() || "Asset"}
              </h2>
              <p className="text-slate-400 text-[11px] font-mono">
                Instant Market Order
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
              isBuy
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            {isBuy ? "SPOT BID" : "SPOT ASK"}
          </span>
        </div>

        {/* Pair Dropdown */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1.5">
            Select Trading Pair
          </label>
          <div className="relative">
            <select
              value={trade.selectedCoin?.id || ""}
              onChange={(e) => {
                const coin = trade.coins.find(
                  (c) => String(c.id) === String(e.target.value)
                );
                if (coin) trade.setSelectedCoin(coin);
              }}
              className="w-full appearance-none bg-[#121827] border border-slate-800 hover:border-slate-700 rounded-xl px-4 py-3 text-white font-semibold text-xs outline-none focus:border-sky-500 transition-colors cursor-pointer pr-10"
            >
              {trade.coins.map((coin) => (
                <option key={coin.id} value={coin.id} className="bg-[#0B0E17]">
                  {coin.name} ({coin.symbol?.toUpperCase() || "CRYPTO"}) / USDT
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
        </div>

        {/* Live Price Box with Letter Badge / Icon */}
        <div className="bg-[#121827] rounded-xl border border-slate-800/80 p-3.5 space-y-1.5">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2 font-semibold">
              <CoinIcon coin={trade.selectedCoin} size="w-5 h-5" textSize="text-[10px]" />
              {trade.selectedCoin?.name || "Asset"}
            </span>
            <span className="text-emerald-400 text-[10px] font-semibold">● Live</span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-100 tracking-tight">
            ${trade.selectedCoin?.price?.toLocaleString() || "0.00"}
          </div>
        </div>

        {/* Quantity Field */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 font-medium mb-1.5 font-mono">
            <span>Order Amount</span>
            <span>
              {isBuy ? (
                <>
                  Avail: <strong className="text-slate-200">${trade.wallet?.toLocaleString()}</strong>
                </>
              ) : (
                <>
                  Owned: <strong className="text-slate-200">{trade.ownedQuantity}</strong>
                </>
              )}
            </span>
          </div>

          <div className="relative flex items-center mb-2">
            <input
              type="number"
              value={trade.quantity}
              onChange={(e) => trade.setQuantity(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#121827] border border-slate-800 focus:border-sky-500 rounded-xl px-4 py-2.5 text-white font-mono font-bold text-sm outline-none transition-colors placeholder:text-slate-600"
            />
            <span className="absolute right-4 text-xs font-mono text-slate-400 font-semibold uppercase">
              {trade.selectedCoin?.symbol || "UNITS"}
            </span>
          </div>

          {/* Quick Percent Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                type="button"
                onClick={() => handlePercentClick(percent)}
                className="py-1 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-[10px] font-mono text-slate-300 font-semibold hover:text-white transition-all"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Order Value Matrix */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800/60 p-3.5 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Total Cost</span>
            <span className="text-slate-100 font-bold text-xs">
              ${(trade.total || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <button
          onClick={submitTrade}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-[0.98] ${
            isBuy
              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10"
              : "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/10"
          }`}
        >
          {isBuy
            ? `BUY ${trade.selectedCoin?.symbol?.toUpperCase() || "CRYPTO"}`
            : `SELL ${trade.selectedCoin?.symbol?.toUpperCase() || "CRYPTO"}`}
        </button>
      </div>
    </div>
  );
}