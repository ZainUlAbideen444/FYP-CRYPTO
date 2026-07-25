export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-[#111111] border border-[#222] rounded-3xl p-6 shadow-lg ${className}`}
    >
      {title && (
        <h2 className="text-white text-xl font-bold mb-6">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}