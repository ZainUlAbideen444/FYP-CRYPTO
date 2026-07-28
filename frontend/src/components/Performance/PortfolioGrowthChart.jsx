import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function PortfolioGrowthChart({
  portfolioValue,
}) {
  const labels = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Today",
  ];

  const currentValue = Number(portfolioValue) || 0;

  // Temporary simulated history
  const values = currentValue
    ? [
        currentValue * 0.72,
        currentValue * 0.78,
        currentValue * 0.75,
        currentValue * 0.83,
        currentValue * 0.88,
        currentValue * 0.94,
        currentValue,
      ]
    : [0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio Value",
        data: values,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#ef4444",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111111",
        callbacks: {
          label: (context) =>
            `$${context.parsed.y.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "#222222",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          callback: (value) =>
            `$${Number(value).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`,
        },
        grid: {
          color: "#222222",
        },
      },
    },
  };

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Portfolio Growth
        </h2>

        <p className="text-gray-500">
          Performance during the last 7 days
        </p>
      </div>

      <div className="h-96">
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}