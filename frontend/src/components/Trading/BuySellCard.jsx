import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa6";

export default function BuySellCard({ type, trade }) {
  const isBuy = type === "Buy";

  const submitTrade = () => {
    if (isBuy) {
      trade.handleBuy();
    } else {
      trade.handleSell();
    }
  };

  return (
    <div className="bg-[#101010] border border-[#242424] rounded-3xl p-7 shadow-xl">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isBuy ? "bg-green-600/20" : "bg-red-600/20"
          }`}
        >
          {isBuy ? (
            <FaArrowUp className="text-green-500 text-xl" />
          ) : (
            <FaArrowDown className="text-red-500 text-xl" />
          )}
        </div>

        <div>
          <h2 className="text-white text-2xl font-bold">
            {type} Crypto
          </h2>

          <p className="text-gray-400 text-sm">
            Virtual Trading
          </p>
        </div>

      </div>

      {/* Coin */}

      <div className="mb-6">

        <label className="text-gray-400 block mb-2">
          Cryptocurrency
        </label>

        <select
         value={trade.selectedCoin?.id || ""}
          onChange={(e) => {
            const coin = trade.coins.find(
              (c) => c.id === Number(e.target.value)
            );
            trade.setSelectedCoin(coin);
          }}
          className="w-full bg-[#181818] border border-[#333] rounded-xl p-4 text-white outline-none"
        >
          {trade.coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>

      </div>

      {/* Price */}

      <div className="bg-[#181818] rounded-2xl p-5 mb-6">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FaBitcoin className="text-yellow-500 text-xl" />

            <span className="text-gray-400">
              Live Price
            </span>

          </div>

          <span className="text-white font-bold text-xl">
            $
            {trade.selectedCoin.price.toLocaleString()}
          </span>

        </div>

      </div>

      {/* Quantity */}

      <div className="mb-6">

        <label className="text-gray-400 block mb-2">
          Quantity
        </label>

        <input
          type="number"
          value={trade.quantity}
          onChange={(e) =>
            trade.setQuantity(e.target.value)
          }
          placeholder="0.00"
          className="w-full bg-[#181818] border border-[#333] rounded-xl p-4 text-white outline-none"
        />

      </div>

      {/* Total */}

      <div className="space-y-4 mb-8">

        <div className="flex justify-between">

          <span className="text-gray-400">
            Total Cost
          </span>

          <span className="text-white font-bold">
            $
            {trade.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>

        </div>

        {!isBuy && (

          <div className="flex justify-between">

            <span className="text-gray-400">
              Owned
            </span>

            <span className="text-white font-bold">
              {trade.ownedQuantity}
            </span>

          </div>

        )}

      </div>

      {/* Button */}

      <button
        onClick={submitTrade}
        className={`w-full py-4 rounded-2xl font-bold text-lg duration-300 ${
          isBuy
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isBuy ? "Buy Now" : "Sell Now"}
      </button>

    </div>
  );
}