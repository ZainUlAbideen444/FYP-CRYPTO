export default function PrimaryButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}