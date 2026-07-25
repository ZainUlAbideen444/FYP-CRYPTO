export default function Select({
  label,
  children,
  ...props
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="text-gray-400 text-sm">
          {label}
        </label>
      )}

      <select
        {...props}
        className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-4 py-3 text-white outline-none focus:border-red-500"
      >
        {children}
      </select>

    </div>
  );
}