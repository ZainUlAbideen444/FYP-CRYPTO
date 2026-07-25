import { FaWallet } from "react-icons/fa";
import {
  FaBitcoin,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

export default function TradeSummary({ trade }) {
  const portfolioValue = trade.portfolio.reduce(
    (total, coin) => total + coin.quantity * coin.price,
    0
  );

  const investedValue = trade.portfolio.reduce(
    (total, coin) => total + coin.invested,
    0
  );

  const profitLoss = portfolioValue - investedValue;

  return (
    <div className="space-y-6">

      {/* Wallet */}

      <div className="bg-[#101010] border border-[#232323] rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FaWallet className="text-red-500 text-2xl" />

          <h2 className="text-xl text-white font-bold">
            Wallet
          </h2>

        </div>

        <h1 className="text-4xl font-bold text-white">

          $
          {trade.wallet.toLocaleString()}

        </h1>

        <p className="text-gray-400 mt-2">

          Virtual Balance

        </p>

      </div>

      {/* Portfolio */}

      <div className="bg-[#101010] border border-[#232323] rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <FaBitcoin className="text-yellow-500 text-xl" />

          <h2 className="text-white text-xl font-bold">

            Portfolio

          </h2>

        </div>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span className="text-gray-400">

              Holdings

            </span>

            <span className="text-white font-semibold">

              {trade.portfolio.length}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">

              Portfolio Value

            </span>

            <span className="text-white font-semibold">

              $

              {portfolioValue.toLocaleString()}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">

              Invested

            </span>

            <span className="text-white font-semibold">

              $

              {investedValue.toLocaleString()}

            </span>

          </div>

        </div>

      </div>

      {/* Profit */}

      <div
        className={`rounded-3xl p-6 border ${
          profitLoss >= 0
            ? "bg-green-900/20 border-green-700"
            : "bg-red-900/20 border-red-700"
        }`}
      >

        <div className="flex items-center gap-3 mb-3">

          {profitLoss >= 0 ? (
            <FaArrowTrendUp className="text-green-500 text-2xl" />
          ) : (
            <FaArrowTrendDown className="text-red-500 text-2xl" />
          )}

          <h2 className="text-white text-xl font-bold">

            Profit / Loss

          </h2>

        </div>

        <h1
          className={`text-3xl font-bold ${
            profitLoss >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >

          {profitLoss >= 0 ? "+" : "-"}

          $

          {Math.abs(profitLoss).toLocaleString()}

        </h1>

      </div>

      {/* Feedback */}

      {trade.feedback && (

        <div
          className={`rounded-2xl p-4 text-center font-semibold ${
            trade.feedback.type === "success"
              ? "bg-green-600/20 text-green-400 border border-green-700"
              : "bg-red-600/20 text-red-400 border border-red-700"
          }`}
        >

          {trade.feedback.message}

        </div>

      )}

    </div>
  );
}