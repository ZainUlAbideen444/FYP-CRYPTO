export default function PortfolioOverview({
  portfolio,
  coins,
}) {
  if (!portfolio.length) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8 h-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          Portfolio Overview
        </h2>

        <div className="flex items-center justify-center h-72">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              No Assets Yet
            </h3>

            <p className="text-gray-500">
              Buy your first cryptocurrency to see your portfolio overview.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const assets = portfolio.map((asset) => {
    const liveCoin = coins.find(
      (coin) => coin.symbol === asset.symbol
    );

const currentPrice =
    asset.currentPrice ??
    liveCoin?.price ??
    asset.averageBuyPrice;

   const value = asset.currentValue ?? currentPrice * asset.quantity;

const profit = asset.profitLoss;

    return {
      ...asset,
      currentPrice,
      value,
      profit,
    };
  });

  const totalValue = assets.reduce(
    (sum, coin) => sum + coin.value,
    0
  );

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Portfolio Overview
          </h2>

          <p className="text-gray-500">
            Live value of your crypto assets
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500 text-sm">
            Total Value
          </p>

          <h2 className="text-3xl font-black text-white">
            $
            {totalValue.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {assets.map((coin) => {
          const percent =
            totalValue > 0
              ? (coin.value / totalValue) * 100
              : 0;

          return (
            <div
              key={coin.symbol}
              className="border border-[#1f1f1f] rounded-2xl p-5 hover:border-red-500/30 transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                    {coin.symbol[0]}
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      {coin.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-white font-bold">
                    $
                    {coin.value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </h3>

                  <span
                    className={`text-sm font-semibold ${
                      coin.profit >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.profit >= 0 ? "+" : ""}
                    {coin.profit.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="w-full h-3 bg-[#1d1d1d] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">
                    Quantity
                  </p>

                  <p className="text-white">
                    {coin.quantity.toFixed(4)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Invested
                  </p>

                  <p className="text-white">
                    $
                    {coin.investedAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Current Price
                  </p>

                  <p className="text-white">
                    $
                    {coin.currentPrice.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}