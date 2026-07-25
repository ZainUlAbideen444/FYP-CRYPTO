import { FaSearch, FaSyncAlt } from "react-icons/fa";
import MarketCard from "../components/MarketCard";
import CoinTable from "../components/CoinTable";
import useMarket from "../hooks/useMarket";

export default function Market() {
  const { filteredCoins, search, setSearch } = useMarket();

  function handleRefresh() {
    // Prices already update live every few seconds from TradeContext's
    // simulated market tick; this gives the user an explicit, satisfying
    // "refresh" action too (re-triggers a render + clears the search).
    setSearch("");
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-white text-4xl font-black">Crypto Market</h1>
        <p className="text-gray-400 mt-2">Live cryptocurrency prices</p>
      </div>

      {/* Search */}
      <div className="flex flex-wrap justify-between gap-5">
        <div className="relative">
          <FaSearch className="absolute left-5 top-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Coin..."
            className="bg-[#111111] border border-[#222] rounded-xl pl-12 pr-5 py-3 text-white outline-none focus:border-red-500 w-80"
          />
        </div>

        <button
          onClick={handleRefresh}
          className="bg-red-600 hover:bg-red-700 px-6 rounded-xl text-white flex items-center gap-3"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {filteredCoins.map((coin) => (
          <MarketCard
            key={coin.symbol}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.price}
            change={coin.change}
          />
        ))}
      </div>

      {/* Table */}
      <CoinTable coins={filteredCoins} />
    </div>
  );
}
