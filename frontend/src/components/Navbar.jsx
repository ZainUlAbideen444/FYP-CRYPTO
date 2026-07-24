import { Link, NavLink } from "react-router-dom";
import {
  FaBitcoin,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-red-600/20">
      <div className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,.45)]">

            <FaBitcoin className="text-white text-2xl" />

          </div>

          <div>

            <h1 className="text-white text-3xl font-black leading-none">
              Crypto Web
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Real-Time Trading Simulator
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10">

          <NavItem title="Home" to="/" />

          <NavItem title="Market" to="/market" />

          <NavItem title="Trading" to="/trading" />

          <NavItem title="Portfolio" to="/portfolio" />

          <NavItem title="Performance" to="/performance" />

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="text-gray-300 hover:text-white duration-300 font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-[0_10px_35px_rgba(239,68,68,.35)]"
          >
            Register
          </Link>

          <button className="hidden lg:flex w-11 h-11 rounded-full bg-[#171717] border border-[#2d2d2d] items-center justify-center hover:border-red-500 duration-300">

            <FaUserCircle className="text-white text-xl" />

          </button>

        </div>

      </div>
    </header>
  );
}

function NavItem({ title, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative font-medium transition duration-300 ${
          isActive
            ? "text-red-500"
            : "text-gray-300 hover:text-white"
        }`
      }
    >
      {title}
    </NavLink>
  );
}