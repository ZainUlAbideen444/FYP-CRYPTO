import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function BestWorstAssets({
  portfolio,
  coins,
}) {
  if (!portfolio.length) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Best Performing Asset
          </h2>

          <p className="text-gray-500">
            No portfolio data available.
          </p>
        </div>

        <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Worst Performing Asset
          </h2>

          <p className="text-gray-500">
            No portfolio data available.
          </p>
        </div>
      </div>
    );
  }

  const assets = portfolio.map((asset) => {
    const liveCoin = coins.find(
      (coin) => coin.symbol === asset.symbol
    );

    const currentPrice = liveCoin
      ? liveCoin.price
      : asset.price;

    const currentValue =
      currentPrice * asset.quantity;

    const profit =
      currentValue - asset.invested;

    const roi =
      asset.invested > 0
        ? (profit / asset.invested) * 100
        : 0;

    return {
      ...asset,
      currentPrice,
      currentValue,
      profit,
      roi,
    };
  });

  const sorted = [...assets].sort(
    (a, b) => b.roi - a.roi
  );

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  function AssetCard({
    title,
    asset,
    positive,
  }) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${
              positive
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {positive ? (
              <FaArrowTrendUp />
            ) : (
              <FaArrowTrendDown />
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold">
            {asset.symbol[0]}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              {asset.name}
            </h3>

            <p className="text-gray-500">
              {asset.symbol}
            </p>
          </div>
        </div>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-400">
              Current Value
            </span>

            <span className="text-white font-semibold">
              $
              {asset.currentValue.toLocaleString(undefined,{
                maximumFractionDigits:2
              })}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Profit / Loss
            </span>

            <span
              className={`font-bold ${
                asset.profit >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {asset.profit >= 0 ? "+" : ""}
              $
              {asset.profit.toLocaleString(undefined,{
                maximumFractionDigits:2
              })}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              ROI
            </span>

            <span
              className={`font-bold ${
                asset.roi >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {asset.roi.toFixed(2)}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Quantity
            </span>

            <span className="text-white">
              {asset.quantity.toFixed(4)}
            </span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <AssetCard
        title="Best Performing"
        asset={best}
        positive={true}
      />

      <AssetCard
        title="Worst Performing"
        asset={worst}
        positive={false}
      />
    </div>
  );
}