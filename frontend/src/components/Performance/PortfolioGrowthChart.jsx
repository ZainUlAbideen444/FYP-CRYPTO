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

  // Simulated history based on current value
  const values = [
    portfolioValue * 0.72,
    portfolioValue * 0.78,
    portfolioValue * 0.75,
    portfolioValue * 0.83,
    portfolioValue * 0.88,
    portfolioValue * 0.94,
    portfolioValue,
  ];

  const data = {
    labels,

    datasets: [
      {
        label: "Portfolio Value",

        data: values,

        borderColor: "#ef4444",

        backgroundColor: "rgba(239,68,68,.15)",

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
        backgroundColor: "#111",
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },

        grid: {
          color: "#222",
        },
      },

      y: {
        ticks: {
          color: "#9ca3af",
        },

        grid: {
          color: "#222",
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