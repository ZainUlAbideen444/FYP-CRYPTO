import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="bg-[#111111] border-b border-[#222] h-20 px-8 flex justify-between items-center">

      <div className="relative">

        <FaSearch className="absolute left-4 top-4 text-gray-500" />

        <input
          type="text"
          placeholder="Search Coin..."
          className="bg-[#1c1c1c] w-80 rounded-xl pl-12 pr-4 py-3 text-white outline-none border border-[#2b2b2b] focus:border-red-500"
        />

      </div>

      <div className="flex items-center gap-5">

        <button className="w-12 h-12 rounded-xl bg-[#1b1b1b] text-white">

          <FaBell className="mx-auto"/>

        </button>

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">

            Z

          </div>

          <div>

            <h4 className="text-white font-semibold">

              Demo User

            </h4>

            <p className="text-gray-500 text-sm">

              demo@crypto.com

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}