export default function SecondaryButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 px-6 py-3 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}