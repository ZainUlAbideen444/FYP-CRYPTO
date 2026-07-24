export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-[#161616]
        border
        border-gray-800
        rounded-2xl
        p-6
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}