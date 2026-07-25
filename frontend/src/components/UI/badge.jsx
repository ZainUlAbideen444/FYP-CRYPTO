export default function Badge({
  value,
}) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        value.startsWith("+")
          ? "bg-green-600/20 text-green-400"
          : "bg-red-600/20 text-red-400"
      }`}
    >
      {value}
    </span>
  );
}