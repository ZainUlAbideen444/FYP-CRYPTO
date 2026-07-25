export default function Badge({
  value,
}) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        String(value).startsWith("+")
          ? "bg-green-600/20 text-green-400"
          : String(value).startsWith("-")
            ? "bg-red-600/20 text-red-400"
            : "bg-gray-600/20 text-gray-300"
      }`}
    >
      {value}
    </span>
  );
}
