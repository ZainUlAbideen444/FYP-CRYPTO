import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function HoldingsTable({ portfolio = [] }) {
  if (!portfolio.length) {
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
        const currentPrice = Number(item.currentPrice || 0);

        const avgBuy = Number(item.averageBuyPrice || 0);

        const invested = Number(item.investedAmount || 0);

        const quantity = Number(item.quantity || 0);

        const currentValue =
          item.currentValue ??
          currentPrice * quantity;

        const profit =
          item.profitLoss ??
          currentValue - invested;

        const profitPercent =
          item.profitLossPercent ??
          (invested > 0
            ? (profit / invested) * 100
            : 0);

        return (
          <div
            key={item._id || item.symbol}
            className="grid grid-cols-7 gap-4 items-center px-8 py-6 border-b border-[#1d1d1d] hover:bg-[#161616] transition"
          >

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                {item.symbol?.[0]}
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

            <div className="text-center text-white">
              {quantity.toFixed(4)}
            </div>

            <div className="text-center text-gray-300">
              $
              {avgBuy.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            <div className="text-center text-white">
              $
              {currentPrice.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            <div className="text-center text-gray-300">
              $
              {invested.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

            <div className="text-center text-white font-semibold">
              $
              {currentValue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>

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