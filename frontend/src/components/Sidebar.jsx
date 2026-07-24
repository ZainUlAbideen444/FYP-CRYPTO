import { NavLink } from "react-router-dom";
import {
  FaBitcoin,
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaChartPie,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

const menus = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    title: "Market",
    icon: <FaBitcoin />,
    path: "/market",
  },
  {
    title: "Trading",
    icon: <FaExchangeAlt />,
    path: "/trading",
  },
  {
    title: "Portfolio",
    icon: <FaWallet />,
    path: "/portfolio",
  },
  {
    title: "Performance",
    icon: <FaChartPie />,
    path: "/performance",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#111111] border-r border-[#222] flex flex-col">

      <div className="h-24 flex items-center justify-center border-b border-[#222]">

        <h2 className="text-white text-3xl font-black">

          Crypto Web

        </h2>

      </div>

      <nav className="flex-1 p-6">

        {menus.map((menu) => (

          <NavLink
            key={menu.title}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition
               ${
                 isActive
                   ? "bg-red-600 text-white"
                   : "text-gray-400 hover:bg-[#1b1b1b] hover:text-white"
               }`
            }
          >

            <span className="text-xl">

              {menu.icon}

            </span>

            <span className="font-medium">

              {menu.title}

            </span>

          </NavLink>

        ))}

      </nav>

      <div className="p-6 border-t border-[#222]">

        <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white flex items-center justify-center gap-3">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}