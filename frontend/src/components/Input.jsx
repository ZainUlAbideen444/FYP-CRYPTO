export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="
      w-full
      bg-[#111]
      border
      border-gray-700
      rounded-xl
      px-4
      py-3
      text-white
      focus:border-red-500
      focus:ring-1
      focus:ring-red-500
      transition
      "
    />
  );
}