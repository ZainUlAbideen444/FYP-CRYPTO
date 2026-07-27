import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

export default function TransactionFilter({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
}) {
  return (
    <div className="bg-[#111111] border border-[#242424] rounded-3xl p-6">
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Search */}

        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Search by coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-red-500 transition"
          />
        </div>

        {/* Filter */}

        <div className="relative">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-[#181818] border border-[#2b2b2b] rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-red-500 transition"
          >
            <option value="ALL">All Transactions</option>
            <option value="BUY">Buy Orders</option>
            <option value="SELL">Sell Orders</option>
          </select>
        </div>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl py-3 px-4 text-white outline-none focus:border-red-500 transition"
        >
          <option value="NEWEST">Newest First</option>
          <option value="OLDEST">Oldest First</option>
          <option value="HIGH">Highest Amount</option>
          <option value="LOW">Lowest Amount</option>
        </select>

      </div>
    </div>
  );
}