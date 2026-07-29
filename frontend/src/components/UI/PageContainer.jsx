export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-[#070707]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </div>
    </div>
  );
}