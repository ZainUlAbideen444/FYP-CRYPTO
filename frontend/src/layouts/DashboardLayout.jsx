import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[170px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-red-700/10 blur-[180px]" />

      </div>

      {/* Main Content */}

      <main className="flex-1 pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <Outlet />

        </div>

      </main>

      {/* Footer */}

      <Footer />

    </div>
  );
}