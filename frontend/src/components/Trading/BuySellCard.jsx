import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Select from "../UI/Select";
import PrimaryButton from "../UI/PrimaryButton";
import { formatCurrency } from "../../utils/formatCurrency";

export default function BuySellCard({ type, trade }) {
  const isBuy = type === "Buy";

  const {
    coins,
    selectedCoin,
    setSelectedCoin,
    quantity,
    setQuantity,
    total,
    wallet,
    ownedQuantity,
    feedback,
  } = trade;

  function handleSubmit(e) {
    e.preventDefault();
    if (isBuy) trade.handleBuy();
    else trade.handleSell();
  }

  return (
    <Card
      title={`${type} Cryptocurrency`}
      subtitle={isBuy ? "Use your virtual balance to buy" : "Sell coins from your portfolio"}
      className={isBuy ? "border-t-4 border-t-green-600" : "border-t-4 border-t-red-600"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="Select Coin"
          value={selectedCoin.symbol}
          onChange={(e) => {
            const coin = coins.find((c) => c.symbol === e.target.value);
            setSelectedCoin(coin);
          }}
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </Select>

        <Input
          label="Quantity"
          type="number"
          min="0"
          step="any"
          placeholder="0.00"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Input
          label="Current Price"
          readOnly
          value={formatCurrency(selectedCoin.price)}
        />

        <Input
          label={isBuy ? "Estimated Cost" : "Estimated Receive"}
          readOnly
          value={formatCurrency(total)}
        />

        <div className="flex justify-between text-sm text-gray-400">
          <span>Available Balance</span>
          <span className="text-white font-semibold">{formatCurrency(wallet)}</span>
        </div>

        {!isBuy && (
          <div className="flex justify-between text-sm text-gray-400">
            <span>You Own</span>
            <span className="text-white font-semibold">
              {ownedQuantity} {selectedCoin.symbol}
            </span>
          </div>
        )}

        {feedback && (
          <div
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
              feedback.type === "success"
                ? "bg-green-600/10 text-green-400 border border-green-600/30"
                : "bg-red-600/10 text-red-400 border border-red-600/30"
            }`}
          >
            {feedback.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            {feedback.message}
          </div>
        )}

        <PrimaryButton
          type="submit"
          className={`w-full ${isBuy ? "" : "bg-red-600 hover:bg-red-700"}`}
        >
          {type} Now
        </PrimaryButton>
      </form>
    </Card>
  );
}
