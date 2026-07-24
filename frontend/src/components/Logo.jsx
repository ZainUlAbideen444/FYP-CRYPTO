export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-xl font-bold">
        ₿
      </div>

      <div>
        <h2 className="text-white font-bold text-xl">
          Crypto Web
        </h2>

        <p className="text-gray-400 text-xs">
          Trading Simulator
        </p>
      </div>
    </div>
  );
}