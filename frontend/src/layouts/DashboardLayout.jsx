import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">

      {/* Fixed Navbar (e.g., height ~ 80px / h-20) */}
      <Navbar />

      {/* Ambient Lighting */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[180px]" />
        <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-teal-500/5 blur-[160px]" />
      </div>

      {/* 
        FIX HERE: Increase 'pt-28' or 'pt-32' (7rem to 8rem / 112px to 128px)
        This guarantees top content on EVERY page sits safely under the navbar!
      */}
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}