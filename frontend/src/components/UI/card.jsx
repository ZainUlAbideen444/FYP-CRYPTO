export default function Card({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={`bg-[#111111] border border-[#222] rounded-3xl p-6 shadow-lg ${className}`}
    >
      {title && <div className="mb-6"><h2 className="text-white text-xl font-bold">{title}</h2>{subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}</div>}

      {children}
    </div>
  );
}
