import {
  FaBitcoin,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/80 bg-[#07090E] overflow-hidden">

      {/* Subtle Bottom Ambient Glow */}
      <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-teal-500/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">

          {/* Logo & Brand Info */}

          <div className="lg:col-span-4">

            <div className="flex items-center gap-3.5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20 text-slate-950">

                <FaBitcoin className="text-2xl" />

              </div>

              <div>

                <h2 className="text-xl font-bold tracking-tight text-white">

                  Crypto Web

                </h2>

                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">

                  Trading Simulator

                </p>

              </div>

            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-sm">

              Learn cryptocurrency trading with live market prices,
              virtual investments, portfolio management and
              performance analytics.

            </p>

          </div>

          {/* Navigation Links */}

          <div className="lg:col-span-2">

            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-300">

              Navigation

            </h3>

            <div className="space-y-3">
              <FooterLink to="/">Home</FooterLink>

              <FooterLink to="/market">Market</FooterLink>

              <FooterLink to="/trading">Trading</FooterLink>

              <FooterLink to="/portfolio">Portfolio</FooterLink>

              <FooterLink to="/performance">Performance</FooterLink>
            </div>

          </div>

          {/* Tech Stack / Technologies */}

          <div className="lg:col-span-3">

            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-300">

              Technologies

            </h3>

            <div className="space-y-3">
              <Item>React.js</Item>

              <Item>Node.js</Item>

              <Item>Express.js</Item>

              <Item>MongoDB Atlas</Item>

              <Item>CoinGecko API</Item>
            </div>

          </div>

          {/* Social Links & Back To Top Button */}

          <div className="lg:col-span-3 flex flex-col justify-between">

            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-300">

                Connect

              </h3>

              <div className="flex gap-3">

                <Social><FaGithub /></Social>

                <Social><FaLinkedin /></Social>

                <Social><FaEnvelope /></Social>

              </div>
            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-[#11151F] px-4 py-3 text-xs font-semibold text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-slate-700 hover:bg-[#161B27] hover:text-white group w-fit"
            >

              <FaArrowUp className="text-emerald-400 transition-transform duration-200 group-hover:-translate-y-0.5" />

              Back To Top

            </button>

          </div>

        </div>

        {/* Footer Sub-Bar */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">

          <p className="font-medium">

            © 2026 Crypto Web — Final Year Project

          </p>

          <p className="font-mono text-slate-500">

            MERN Stack • React • Node • Express • MongoDB

          </p>

        </div>

      </div>

    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-sm text-slate-400 transition-all duration-200 hover:translate-x-1.5 hover:text-emerald-400 font-medium"
    >
      {children}
    </Link>
  );
}

function Item({ children }) {
  return (
    <p className="text-sm text-slate-400 font-medium">
      {children}
    </p>
  );
}

function Social({ children }) {
  return (
    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-[#11151F] text-base text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400">
      {children}
    </div>
  );
}