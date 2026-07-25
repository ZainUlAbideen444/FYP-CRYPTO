import { FaBars, FaBell } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useTradeContext } from "../context/TradeContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const { wallet } = useTradeContext();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "T";

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#222] bg-[#111111] px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-xl border border-white/10 p-3 text-gray-300 lg:hidden" aria-label="Open navigation"><FaBars /></button>
        <div>
        <p className="text-gray-500 text-sm">Wallet Balance</p>
        <p className="text-white font-bold text-lg">{formatCurrency(wallet)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="hidden h-12 w-12 rounded-xl bg-[#1b1b1b] text-white sm:block" aria-label="Notifications" title="Notifications">
          <FaBell className="mx-auto" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
            {initial}
          </div>

          <div className="hidden sm:block">
            <h4 className="text-white font-semibold">{user?.name || "Trader"}</h4>
            <p className="text-gray-500 text-sm">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
