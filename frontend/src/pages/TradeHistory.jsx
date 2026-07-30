import { useEffect, useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import { formatCurrency } from "../utils/formatCurrency";
import api from "../services/api";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaMagnifyingGlass,
  FaReceipt,
  FaFilter,
} from "react-icons/fa6";

export default function TradeHistory() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI Filter states
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    api
      .get("/trades/history")
      .then(({ data }) => setTrades(data.trades))
      .catch((err) =>
        setError(err.message || "Could not load trade history.")
      )
      .finally(() => setLoading(false));
  }, []);

  // Client-side visual filtering
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.name?.toLowerCase().includes(search.toLowerCase()) ||
      trade.symbol?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "all" ||
      trade.type?.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });

  const buyCount = trades.filter((t) => t.type?.toLowerCase() === "buy").length;
  const sellCount = trades.filter((t) => t.type?.toLowerCase() === "sell").length;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Trade History"
        subtitle="Review every virtual order, execution price, and realized outcome."
      />

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
              Total Executions
            </p>
            <h3 className="text-2xl font-mono font-extrabold text-white mt-1">
              {trades.length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
            <FaReceipt />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
              Buy Orders
            </p>
            <h3 className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">
              {buyCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FaArrowTrendUp />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
              Sell Orders
            </p>
            <h3 className="text-2xl font-mono font-extrabold text-rose-400 mt-1">
              {sellCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <FaArrowTrendDown />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <section className="rounded-2xl border border-slate-800/80 bg-[#11151F]/90 overflow-hidden backdrop-blur-xl shadow-lg">
        {/* Table Top Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-b border-slate-800/80 bg-slate-900/40">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by asset or symbol..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 font-mono transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            <span className="text-slate-500 text-xs font-mono flex items-center gap-1 mr-2">
              <FaFilter className="text-[10px]" /> Side:
            </span>
            {["all", "buy", "sell"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 ${
                  filterType === type
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* State Indicators */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Fetching trade execution log...
            </span>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-400 font-mono text-xs">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800/80 text-slate-400 font-mono text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4 font-semibold">Asset</th>
                  <th className="text-center px-6 py-4 font-semibold">Side</th>
                  <th className="text-right px-6 py-4 font-semibold">Quantity</th>
                  <th className="text-right px-6 py-4 font-semibold">Price</th>
                  <th className="text-right px-6 py-4 font-semibold">Total</th>
                  <th className="text-right px-6 py-4 font-semibold">Realized P/L</th>
                  <th className="text-right px-6 py-4 font-semibold">Timestamp</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/50">
                {filteredTrades.length ? (
                  filteredTrades.map((trade) => {
                    const isBuy = trade.type?.toLowerCase() === "buy";
                    const hasProfit = (trade.realizedProfit ?? 0) >= 0;

                    return (
                      <tr
                        key={trade._id}
                        className="hover:bg-slate-800/30 transition-colors group"
                      >
                        {/* Asset Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                              {trade.symbol?.[0]}
                            </div>
                            <div>
                              <strong className="text-white font-bold text-sm block leading-none">
                                {trade.name}
                              </strong>
                              <span className="text-xs font-mono text-slate-500 mt-1 block">
                                {trade.symbol}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Order Type Badge */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono font-bold text-xs border ${
                              isBuy
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}
                          >
                            {isBuy ? (
                              <FaArrowTrendUp className="text-[10px]" />
                            ) : (
                              <FaArrowTrendDown className="text-[10px]" />
                            )}
                            {trade.type.toUpperCase()}
                          </span>
                        </td>

                        {/* Quantity */}
                        <td className="px-6 py-4 text-right font-mono text-slate-200 text-sm">
                          {trade.quantity}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 text-right font-mono text-slate-400 text-sm">
                          {formatCurrency(trade.price)}
                        </td>

                        {/* Total Value */}
                        <td className="px-6 py-4 text-right font-mono text-white font-semibold text-sm">
                          {formatCurrency(trade.totalValue)}
                        </td>

                        {/* Realized Profit / Loss */}
                        <td className="px-6 py-4 text-right">
                          {trade.type?.toLowerCase() === "sell" ? (
                            <span
                              className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                                hasProfit
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              }`}
                            >
                              {hasProfit ? "+" : ""}
                              {formatCurrency(trade.realizedProfit)}
                            </span>
                          ) : (
                            <span className="text-slate-600 font-mono text-xs">—</span>
                          )}
                        </td>

                        {/* Date & Time */}
                        <td className="px-6 py-4 text-right font-mono text-xs text-slate-400">
                          <div>
                            {new Date(trade.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(trade.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-12 text-center text-slate-500 font-mono text-xs"
                    >
                      No trades matched your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}