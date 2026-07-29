import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col font-sans antialiased">
      
      <Navbar />

      {/* FIX HERE: Added pt-28 so landing/public content doesn't get overlapped */}
      <main className="flex-1 pt-28">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
}