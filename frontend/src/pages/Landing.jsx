import MarketTicker from "../components/MarketTicker";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WhyChoose from "../components/WhyChoose";
import CTA from "../components/CTA";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden relative font-sans antialiased">
      
      {/* Structural Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Market Ticker Bar */}
      <div>
        <MarketTicker />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <Hero />
      </section>

      <main className="relative pt-3 flex flex-col gap-y-12 lg:gap-y-16">
        {/* Platform Statistics */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <Stats />
        </section>

        {/* Features Section */}
        <section id="features" className="relative px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <Features />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <HowItWorks />
        </section>

        {/* Why Choose Us */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <WhyChoose />
        </section>

        {/* CTA Banner */}
        <section className="relative px-4 sm:px-6 lg:px-8 mb-12">
          <CTA />
        </section>
      </main>
    </div>
  );
}