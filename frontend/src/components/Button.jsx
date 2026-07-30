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
        text-white
        font-mono
        font-bold
        rounded-xl
        shadow-lg
        hover:scale-105
        active:scale-95
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
}