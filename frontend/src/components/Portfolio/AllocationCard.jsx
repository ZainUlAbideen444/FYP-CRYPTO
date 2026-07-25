export default function AllocationCard({ portfolio, coins }) {
  if (portfolio.length === 0) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Portfolio Allocation
        </h2>

        <p className="text-gray-500">
          Your allocation will appear after buying some crypto.
        </p>
      </div>
    );
  }

  const allocation = portfolio.map((asset) => {
    const marketCoin = coins.find(
      (coin) => coin.symbol === asset.symbol
    );

    const currentPrice = marketCoin
      ? marketCoin.price
      : asset.price;

    const value = currentPrice * asset.quantity;

    return {
      ...asset,
      value,
    };
  });

  const totalValue = allocation.reduce(
    (sum, coin) => sum + coin.value,
    0
  );

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-cyan-500",
  ];

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Portfolio Allocation
        </h2>

        <span className="text-sm text-gray-500">
          {portfolio.length} Assets
        </span>
      </div>

      <div className="space-y-6">
        {allocation.map((coin, index) => {
          const percent =
            (coin.value / totalValue) * 100;

          return (
            <div key={coin.symbol}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-white font-semibold">
                    {coin.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {coin.symbol}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-white font-semibold">
                    $
                    {coin.value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <span className="text-red-400 font-bold">
                    {percent.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="w-full h-3 rounded-full bg-[#1d1d1d] overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    colors[index % colors.length]
                  }`}
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-[#242424]">
        <div className="flex justify-between text-lg">
          <span className="text-gray-400">
            Total Portfolio Value
          </span>

          <span className="text-white font-bold">
            $
            {totalValue.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}