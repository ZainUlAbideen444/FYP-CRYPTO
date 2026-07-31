import { useState } from "react";
import { useMarketContext } from "../context/MarketContext";
import MarketTable from "../components/MarketTable";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Market() {
  const { coins = [], loading, error } = useMarketContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'gainers', 'losers'

  // Filter coins based on search input and filter buttons
  const filteredCoins = coins.filter((coin) => {
    const nameMatch = coin.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const symbolMatch = coin.symbol?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || symbolMatch;

    const change = Number(coin.change || coin.price_change_percentage_24h || 0);

    if (!matchesSearch) return false;
    if (filter === "gainers") return change > 0;
    if (filter === "losers") return change < 0;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
            CRYPTO MARKETS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time market prices, 24h performance, and assets tracking.
          </p>
        </div>

        {/* Search Bar & Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search coin or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0E17] border border-slate-800 focus:border-sky-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white font-mono outline-none transition-colors placeholder:text-slate-600"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex bg-[#0B0E17] border border-slate-800 p-1 rounded-xl text-xs font-mono">
            {["all", "gainers", "losers"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg capitalize font-semibold transition-all ${
                  filter === f
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="p-12 text-center font-mono text-slate-400 bg-[#0B0E17] rounded-xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading crypto markets...
        </div>
      ) : error ? (
        <div className="p-6 text-center text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl font-mono text-xs">
          {error}
        </div>
      ) : (
        <MarketTable coins={filteredCoins} />
      )}
    </div>
  );
}