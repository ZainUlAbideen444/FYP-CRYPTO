import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function AssetAllocationChart({
  portfolio,
  coins,
}) {
  if (!portfolio.length) {
    return (
      <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Asset Allocation
        </h2>

        <p className="text-gray-500">
          Buy some crypto to view your allocation.
        </p>
      </div>
    );
  }

  const labels = [];
  const values = [];

  portfolio.forEach((asset) => {
    const coin = coins.find(
      (c) => c.symbol === asset.symbol
    );

    const price = coin ? coin.price : asset.price;

    labels.push(asset.symbol);

    values.push(price * asset.quantity);
  });

  const data = {
    labels,

    datasets: [
      {
        data: values,

        backgroundColor: [
          "#ef4444",
          "#3b82f6",
          "#22c55e",
          "#facc15",
          "#8b5cf6",
          "#14b8a6",
          "#f97316",
        ],

        borderColor: "#111111",

        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#ffffff",

          padding: 20,

          font: {
            size: 13,
          },
        },
      },

      tooltip: {
        backgroundColor: "#111111",
      },
    },
  };

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Asset Allocation
        </h2>

        <p className="text-gray-500">
          Distribution of your investments
        </p>
      </div>

      <div className="h-80">
        <Pie
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}