import { Link, useNavigate } from "react-router-dom";
import { FaBitcoin, FaArrowLeft, FaHouse } from "react-icons/fa6";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Crypto Icon Container */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.25)] animate-pulse">
          <FaBitcoin className="text-4xl" />
        </div>
        <span className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 text-[10px] font-mono font-bold text-slate-400 px-2 py-0.5 rounded-md">
          NULL_ADDR
        </span>
      </div>

      {/* Error Messaging */}
      <h1 className="text-white text-7xl font-mono font-black tracking-tighter">
        404
      </h1>

      <div className="mt-2 text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
        Block Not Found
      </div>

      <p className="text-slate-400 mt-4 text-sm max-w-md font-medium leading-relaxed">
        The route you are looking for doesn't exist or has been drifted off-chain.
      </p>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-mono text-xs font-semibold transition-all active:scale-95"
        >
          <FaArrowLeft /> Go Back
        </button>

        <Link
          to="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-sky-500/20 active:scale-95"
        >
          <FaHouse /> Back to Terminal
        </Link>
      </div>
    </div>
  );
}