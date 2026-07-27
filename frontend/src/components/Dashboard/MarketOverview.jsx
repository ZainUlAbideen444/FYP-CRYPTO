import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function MarketOverview({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Market Overview
        </h2>

        <p className="text-gray-500">
          No market data available.
        </p>
      </div>
    );
  }

  const sortedCoins = [...coins].sort(
    (a, b) => b.change - a.change
  );

  const topGainers = sortedCoins
    .filter((coin) => coin.change >= 0)
    .slice(0, 3);

  const topLosers = [...sortedCoins]
    .reverse()
    .filter((coin) => coin.change < 0)
    .slice(0, 3);

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-6 space-y-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Market Overview
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Top market movers
        </p>
      </div>

      {/* Top Gainers */}

      <div>
        <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
          <FaArrowTrendUp />
          Top Gainers
        </h3>

        <div className="space-y-4">
          {topGainers.map((coin) => (
            <div
              key={coin.symbol}
              className="flex justify-between items-center p-4 rounded-2xl bg-[#181818] border border-[#242424] hover:border-green-500/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center font-bold text-white">
                  {coin.symbol[0]}
                </div>

                <div>
                  <h4 className="text-white font-semibold">
                    {coin.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {coin.symbol}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h4 className="text-white font-semibold">
                  $
                  {coin.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </h4>

                <span className="text-green-400 font-bold">
                  +{coin.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers */}

      <div>
        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
          <FaArrowTrendDown />
          Top Losers
        </h3>

        <div className="space-y-4">
          {topLosers.length === 0 ? (
            <div className="text-gray-500 text-sm">
              No losing assets right now.
            </div>
          ) : (
            topLosers.map((coin) => (
              <div
                key={coin.symbol}
                className="flex justify-between items-center p-4 rounded-2xl bg-[#181818] border border-[#242424] hover:border-red-500/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
                    {coin.symbol[0]}
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">
                      {coin.name}
                    </h4>

                    <p className="text-gray-500 text-sm">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h4 className="text-white font-semibold">
                    $
                    {coin.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </h4>

                  <span className="text-red-400 font-bold">
                    {coin.change}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}