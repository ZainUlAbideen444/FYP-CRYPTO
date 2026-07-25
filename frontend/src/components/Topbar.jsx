import { FaBell } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useTradeContext } from "../context/TradeContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function Topbar() {
  const { user } = useAuth();
  const { wallet } = useTradeContext();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "T";

  return (
    <header className="bg-[#111111] border-b border-[#222] h-20 px-8 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Wallet Balance</p>
        <p className="text-white font-bold text-lg">{formatCurrency(wallet)}</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="w-12 h-12 rounded-xl bg-[#1b1b1b] text-white">
          <FaBell className="mx-auto" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
            {initial}
          </div>

          <div>
            <h4 className="text-white font-semibold">{user?.name || "Trader"}</h4>
            <p className="text-gray-500 text-sm">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
