import Navbar from "../components/Navbar";
import MarketTicker from "../components/MarketTicker";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WhyChoose from "../components/WhyChoose";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden relative font-sans antialiased">
      
      {/* Structural Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Fixed/Sticky Top Navbar */}
      <Navbar />

        {/* Market Ticker Bar (Tight to Top) */}
        <div>
          <MarketTicker />
        </div>

        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <Hero />
        </section>

      {/* 
        FIX 1: Reduced top padding from `pt-20` to `pt-16` to pull Hero up closer to Navbar.
        FIX 2: Removed `pb-32` and set standard section gaps so there is NO extra void above the Footer.
      */}
      <main className="relative pt-3 flex flex-col gap-y-15 lg:gap-y-20">
      

        {/* Platform Statistics */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <Stats />
        </section>

        {/* Features */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <Features />
        </section>

        {/* How It Works */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </section>

        {/* Why Choose Us */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <WhyChoose />
        </section>

        {/* CTA Banner (Bottom section right before Footer) */}
        <section className="relative px-4 sm:px-6 lg:px-8 mb-6">
          <CTA />
        </section>


      {/* Global Application Footer */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-6">
  <Footer />
      </section>
   
    </main>

    </div>
  );
}