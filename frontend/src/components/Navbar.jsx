import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaBitcoin, FaTimes, FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const navigation = [
  { title: "Home", to: "/" },
  { title: "Market", to: "/market" },
  { title: "Trading", to: "/trading" },
  { title: "Portfolio", to: "/portfolio" },
  { title: "Performance", to: "/performance" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-red-500/15 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 sm:gap-4" aria-label="Crypto Web home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 shadow-[0_0_35px_rgba(239,68,68,.45)] sm:h-12 sm:w-12">
            <FaBitcoin className="text-xl text-white sm:text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-black leading-none text-white sm:text-2xl">Crypto Web</h1>
            <p className="mt-1 hidden text-xs text-gray-400 sm:block">Virtual trading simulator</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => <NavItem key={item.to} {...item} />)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/5 hover:text-white">
                <FaUserCircle className="text-lg text-red-400" />
                {user?.name || "Account"}
              </Link>
              <button onClick={logout} className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-red-500 hover:text-white">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white">Log in</Link>
              <Link to="/register" className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(239,68,68,.28)] transition hover:bg-red-700">Create account</Link>
            </>
          )}
        </div>

        <button onClick={() => setIsOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden" aria-label="Toggle navigation" aria-expanded={isOpen}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#0b0b0d] px-5 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {navigation.map((item) => <NavItem key={item.to} {...item} onClick={closeMenu} mobile />)}
            <div className="mt-3 flex gap-3 border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <>
                  <Link onClick={closeMenu} to="/dashboard" className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white">Dashboard</Link>
                  <button onClick={() => { logout(); closeMenu(); }} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-gray-200">Log out</button>
                </>
              ) : (
                <>
                  <Link onClick={closeMenu} to="/login" className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-gray-200">Log in</Link>
                  <Link onClick={closeMenu} to="/register" className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white">Register</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ title, to, onClick, mobile = false }) {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? "bg-red-500/10 text-red-400" : "text-gray-300 hover:bg-white/5 hover:text-white"} ${mobile ? "block px-4 py-3" : ""}`}>
      {title}
    </NavLink>
  );
}
