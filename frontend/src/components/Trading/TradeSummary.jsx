import Card from "../UI/Card";
import Badge from "../UI/badge";
import { formatCurrency, formatPercent } from "../../utils/formatCurrency";
import { calculatePortfolioProfit } from "../../utils/calculateProfit";
import PriceChart from "../PriceChart";

export default function TradeSummary({ trade }) {
  const { coins, wallet, portfolio, selectedCoin } = trade;

  const { invested, currentValue, profit } = calculatePortfolioProfit(portfolio, coins);
  const profitPercent = invested === 0 ? 0 : (profit / invested) * 100;

  return (
    <div className="space-y-8">
      <Card title="Account Summary">
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-gray-400">Wallet Balance</span>
            <span className="text-white font-bold">{formatCurrency(wallet)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Portfolio Value</span>
            <span className="text-white font-bold">{formatCurrency(currentValue)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Unrealized P/L</span>
            <Badge value={formatPercent(profitPercent)} />
          </div>

          <div className="h-px bg-[#232323]" />

          <div className="flex justify-between">
            <span className="text-gray-400">Total Equity</span>
            <span className="text-white text-xl font-black">
              {formatCurrency(wallet + currentValue)}
            </span>
          </div>
        </div>
      </Card>

      <Card title={`${selectedCoin.name} Snapshot`}>
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-bold">{formatCurrency(selectedCoin.price)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">24h Change</span>
            <Badge value={formatPercent(selectedCoin.change)} />
          </div>
        </div>
      </Card>
      <PriceChart coinId={selectedCoin.id} title={`${selectedCoin.symbol} chart`} />
    </div>
  );
}
