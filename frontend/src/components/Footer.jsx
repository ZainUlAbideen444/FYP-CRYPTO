import {
  FaBitcoin,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">

                <FaBitcoin className="text-white text-2xl"/>

              </div>

              <div>

                <h2 className="text-white text-2xl font-black">
                  Crypto Web
                </h2>

                <p className="text-gray-500">
                  Trading Simulator
                </p>

              </div>

            </div>

            <p className="text-gray-400 mt-8 leading-7">
              Practice cryptocurrency trading using virtual funds and real-time market data in a safe environment.
            </p>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Navigation
            </h3>

            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/market">Market</FooterLink>
            <FooterLink to="/trading">Trading</FooterLink>
            <FooterLink to="/portfolio">Portfolio</FooterLink>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Resources
            </h3>

            <p className="text-gray-400 mb-4">
              CoinGecko API
            </p>

            <p className="text-gray-400 mb-4">
              MERN Stack
            </p>

            <p className="text-gray-400">
              MongoDB Atlas
            </p>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Connect
            </h3>

            <div className="flex gap-5 text-2xl">

              <FaGithub className="text-gray-400 hover:text-red-500 cursor-pointer transition"/>

              <FaLinkedin className="text-gray-400 hover:text-red-500 cursor-pointer transition"/>

              <FaEnvelope className="text-gray-400 hover:text-red-500 cursor-pointer transition"/>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">

          © 2026 Crypto Web — Final Year Project | Developed using MERN Stack

        </div>

      </div>

    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-gray-400 hover:text-red-500 transition mb-4"
    >
      {children}
    </Link>
  );
}