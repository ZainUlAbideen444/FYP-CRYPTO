import React from "react";

export function CoinIcon({ coin, size = "w-6 h-6", textSize = "text-xs" }) {
  const [imgError, setImgError] = React.useState(false);

  const symbol = (coin?.symbol || coin?.coinSymbol || "C").toUpperCase();
  const firstLetter = symbol.charAt(0);
  const imageUrl = coin?.image || coin?.iconUrl || coin?.logo;

  // Specific badge color accents based on crypto ticker symbol
  const getBadgeColors = (sym) => {
    switch (sym) {
      case "BTC":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "ETH":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/40";
      case "USDT":
      case "USDC":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "SOL":
        return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      case "XRP":
        return "bg-sky-500/20 text-sky-400 border-sky-500/40";
      case "BNB":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={symbol}
        className={`${size} rounded-full object-cover shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${size} ${textSize} ${getBadgeColors(
        symbol
      )} rounded-full border font-mono font-bold flex items-center justify-center shrink-0 select-none`}
    >
      {firstLetter}
    </div>
  );
}