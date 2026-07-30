export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  id,
  className = "",
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className={`
        w-full
        bg-[#131a2b]
        border
        border-slate-800
        rounded-xl
        px-4
        py-3
        text-slate-100
        text-sm
        font-mono
        outline-none
        transition-all
        duration-300
        hover:border-slate-700
        focus:border-amber-400
        focus:shadow-[0_0_15px_rgba(251,191,36,0.25)]
        ${className}
      `}
    />
  );
}