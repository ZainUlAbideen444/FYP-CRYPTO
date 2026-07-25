import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function HoldingsTable({ portfolio, coins }) {
  if (portfolio.length === 0) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-12 text-center">
        <h2 className="text-2xl text-white font-bold mb-3">
          No Holdings Yet
        </h2>

        <p className="text-gray-400">
          Buy some cryptocurrency from the Trading page to start building your
          portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl overflow-hidden">
      {/* Header */}

      <div className="grid grid-cols-7 gap-4 px-8 py-5 border-b border-[#242424] text-gray-400 font-semibold text-sm uppercase tracking-wider">
        <div>Coin</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Avg Buy</div>
        <div className="text-center">Current</div>
        <div className="text-center">Invested</div>
        <div className="text-center">Value</div>
        <div className="text-center">P/L</div>
      </div>

      {portfolio.map((item) => {
        const marketCoin = coins.find(
          (coin) => coin.symbol === item.symbol
        );

        const currentPrice = marketCoin
          ? marketCoin.price
          : item.price;

        const avgBuy = item.invested / item.quantity;

        const currentValue = currentPrice * item.quantity;

        const profit = currentValue - item.invested;

        const profitPercent =
          (profit / item.invested) * 100;

        return (
          <div
            key={item.symbol}
            className="grid grid-cols-7 gap-4 items-center px-8 py-6 border-b border-[#1d1d1d] hover:bg-[#161616] duration-300"
          >
            {/* Coin */}

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                {item.symbol[0]}
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.symbol}
                </p>
              </div>
            </div>

            {/* Quantity */}

            <div className="text-center text-white">
              {item.quantity.toFixed(4)}
            </div>

            {/* Avg */}

            <div className="text-center text-gray-300">
              $
              {avgBuy.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Current */}

            <div className="text-center text-white">
              $
              {currentPrice.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Invested */}

            <div className="text-center text-gray-300">
              $
              {item.invested.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Value */}

            <div className="text-center text-white font-semibold">
              $
              {currentValue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Profit */}

            <div
              className={`flex justify-center items-center gap-2 font-bold ${
                profit >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {profit >= 0 ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}

              <div>
                <div>
                  {profit >= 0 ? "+" : ""}
                  {profit.toFixed(2)}
                </div>

                <div className="text-xs">
                  ({profitPercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}