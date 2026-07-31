import { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa6";

export default function PreLoader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090E] transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute w-36 h-36 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />

        {/* Animated Bouncing Bitcoin Logo */}
        <div className="relative bg-amber-500/10 border border-amber-500/30 p-6 rounded-full shadow-2xl shadow-amber-500/20 animate-bounce">
          <FaBitcoin className="text-amber-400 text-6xl" />
        </div>

        {/* Branding & Signature */}
        <div className="mt-8 text-center space-y-2">
          <h1 className="text-2xl font-bold font-mono tracking-wider text-white">
            CRYPTO WEB
          </h1>
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full">
            <p className="text-xs font-mono text-emerald-400 font-medium tracking-wide">
              Made by Zain_Ul_Abideen aka Mr Zee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}