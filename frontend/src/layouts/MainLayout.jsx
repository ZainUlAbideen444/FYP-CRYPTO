import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();

  // Hide footer ONLY on authentication pages
  const hideFooterRoutes = ["/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* Renders single footer everywhere EXCEPT /login and /register */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}