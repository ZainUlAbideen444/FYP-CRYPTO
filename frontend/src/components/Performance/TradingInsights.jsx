import {
  FaLightbulb,
  FaBitcoin,
  FaChartPie,
  FaArrowTrendUp,
} from "react-icons/fa6";

export default function TradingInsights({
  portfolio,
  coins,
  wallet,
}) {
  if (!portfolio.length) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaLightbulb className="text-yellow-400 text-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Trading Insights
          </h2>
        </div>

        <p className="text-gray-400">
          Buy some cryptocurrencies to generate portfolio insights.
        </p>
      </div>
    );
  }

  const assets = portfolio.map((asset) => {
    const liveCoin =
      coins.find((c) => c.symbol === asset.symbol) || asset;

    return {
      ...asset,
      value: liveCoin.price * asset.quantity,
    };
  });

  const portfolioValue = assets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  const largestHolding = assets.reduce((a, b) =>
    a.value > b.value ? a : b
  );

  const allocation = (
    (largestHolding.value / portfolioValue) *
    100
  ).toFixed(1);

  const diversified = assets.length >= 4;

  const totalInvested = assets.reduce(
    (sum, asset) => sum + asset.invested,
    0
  );

  const profit = portfolioValue - totalInvested;

  const roi =
    totalInvested > 0
      ? ((profit / totalInvested) * 100).toFixed(2)
      : "0.00";

  const insights = [
    {
      icon: <FaBitcoin />,
      title: "Largest Holding",
      value: `${largestHolding.name} (${allocation}%)`,
      color: "text-yellow-400",
    },
    {
      icon: <FaChartPie />,
      title: "Diversification",
      value: diversified
        ? "Well Diversified"
        : "Consider Adding More Assets",
      color: diversified
        ? "text-green-400"
        : "text-orange-400",
    },
    {
      icon: <FaArrowTrendUp />,
      title: "Portfolio ROI",
      value: `${roi}%`,
      color:
        Number(roi) >= 0
          ? "text-green-400"
          : "text-red-400",
    },
    {
      icon: <FaLightbulb />,
      title: "Wallet Balance",
      value: `$${wallet.toLocaleString()}`,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <FaLightbulb className="text-yellow-400 text-2xl" />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Trading Insights
          </h2>

          <p className="text-gray-500">
            Automatic portfolio analysis
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((item) => (
          <div
            key={item.title}
            className="bg-[#181818] border border-[#242424] rounded-2xl p-5 hover:border-red-500/30 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`text-2xl ${item.color}`}>
                {item.icon}
              </div>

              <h3 className="text-white font-semibold">
                {item.title}
              </h3>
            </div>

            <p className={`font-bold text-lg ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}