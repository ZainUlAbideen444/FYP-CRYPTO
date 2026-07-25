import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBitcoin,
  FaTimes,
  FaWallet,
  FaExchangeAlt,
  FaChartPie,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const menus = [
  { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { title: "Market", icon: <FaBitcoin />, path: "/market" },
  { title: "Trading", icon: <FaExchangeAlt />, path: "/trading" },
  { title: "Portfolio", icon: <FaWallet />, path: "/portfolio" },
  { title: "Performance", icon: <FaChartPie />, path: "/performance" },
  { title: "Trade History", icon: <FaHistory />, path: "/history" },
  { title: "Settings", icon: <FaCog />, path: "/settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-[#222] bg-[#111111] transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : ""}`}>
      <div className="h-24 flex items-center justify-center border-b border-[#222]">
        <h2 className="text-white text-3xl font-black">Crypto Web</h2>
        <button onClick={onClose} className="absolute right-5 rounded-lg p-2 text-gray-400 hover:text-white lg:hidden" aria-label="Close navigation"><FaTimes /></button>
      </div>

      <nav className="flex-1 p-6">
        {menus.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition
               ${isActive ? "bg-red-600 text-white" : "text-gray-400 hover:bg-[#1b1b1b] hover:text-white"}`
            }
          >
            <span className="text-xl">{menu.icon}</span>
            <span className="font-medium">{menu.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-[#222]">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white flex items-center justify-center gap-3"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
