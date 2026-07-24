export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-red-600
        hover:bg-red-700
        transition-all
        duration-300
        rounded-xl
        px-6
        py-3
        font-semibold
        text-white
        shadow-lg
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}