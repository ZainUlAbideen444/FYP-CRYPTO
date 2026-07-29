import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBitcoin,
  FaUserCircle,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Expanded Public Links for better desktop balance
  const publicLinks = [
    { title: "Home", to: "/" },
    { title: "Markets", to: "/market" },
    { title: "Features", to: "/#features" },
    { title: "How It Works", to: "/#how-it-works" },
  ];

  // Comprehensive Authenticated App Links
  const privateLinks = [
    { title: "Dashboard", to: "/dashboard" },
    { title: "Markets", to: "/market" },
    { title: "Trade", to: "/trading" },
    { title: "Portfolio", to: "/portfolio" },
    { title: "Analytics", to: "/performance" },
    { title: "History", to: "/history" },
  ];

  const links = isAuthenticated ? privateLinks : publicLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-[#0B0E14]/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto h-16 md:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <FaBitcoin className="text-slate-950 text-xl" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
              Crypto<span className="text-emerald-400">Web</span>
            </h2>
            <p className="text-slate-400 text-[10px] sm:text-xs font-medium tracking-wide">
              Paper Trading Simulator
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-19 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/50"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Buttons / User Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* User Chip */}
              <Link
                to="/settings"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <FaUserCircle className="text-emerald-400 text-lg" />
                <span className="text-slate-200 font-medium text-sm">
                  {user?.name || "Trader"}
                </span>
              </Link>

              {/* Logout CTA */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 border border-slate-800 hover:border-rose-900/50 text-sm font-semibold transition-all"
                title="Logout"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                Log In
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/10 transition-all hover:shadow-emerald-500/20 active:scale-95"
              >
                <span>Get Started</span>
                <FaChevronRight className="text-xs" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0D1117] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-800 text-emerald-400 border border-slate-700/50"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-4 py-2 text-slate-400 text-sm">
                  <FaUserCircle className="text-emerald-400" />
                  <span>Signed in as <strong className="text-white">{user?.name}</strong></span>
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-950/30 text-rose-400 border border-rose-900/40 text-sm font-semibold"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-sm font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}