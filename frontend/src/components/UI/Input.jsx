export default function Input({ label, icon, className = "", ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-gray-400 text-sm">{label}</label>}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-4 py-3 ${
            icon ? "pl-11" : ""
          } text-white outline-none focus:border-red-500 disabled:opacity-60 ${className}`}
        />
      </div>
    </div>
  );
}
