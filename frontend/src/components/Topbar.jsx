import { FaBell } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#050505]/80 border-b border-[#222]">
      <div className="h-20 px-8 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-gray-500">
            {user?.name || "Crypto Trader"}
          </p>
        </div>

        <div className="flex items-center gap-5">

          <button className="w-12 h-12 rounded-2xl bg-[#111] border border-[#222] hover:border-red-500 transition">

            <FaBell className="mx-auto text-gray-400"/>

          </button>

          <div className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-2xl px-5 py-3">

            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">

              <FaBitcoin/>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Account
              </p>

              <h3 className="font-semibold">
                {user?.name}
              </h3>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
}