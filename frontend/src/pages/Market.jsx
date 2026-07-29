import { FaSearch, FaSyncAlt } from "react-icons/fa";
import MarketCard from "../components/MarketCard";
import CoinTable from "../components/CoinTable";
import useMarket from "../hooks/useMarket";

export default function Market() {
  const { filteredCoins, search, setSearch } = useMarket();

  function handleRefresh() {
    setSearch("");
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Crypto Market
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time cryptocurrency valuation, 24h metrics, and direct trade routing.
          </p>
        </div>

        {/* Search & Actions Header Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coin or symbol..."
              className="bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 w-64 sm:w-72 transition-all font-mono"
            />
          </div>

          <button
            onClick={handleRefresh}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-900/80 text-slate-200 hover:border-emerald-500/40 hover:text-emerald-400 flex items-center gap-2 transition-all duration-200"
          >
            <FaSyncAlt className="text-[10px]" />
            Reset
          </button>
        </div>
      </div>

      {/* Hero Quick Watch Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {filteredCoins.map((coin) => (
          <MarketCard
            key={coin.id}
            coin={coin}
          />
        ))}
      </div>

      {/* Main Coin Data Table */}
      <CoinTable coins={filteredCoins} />
    </div>
  );
}