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
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      <Navbar />

      <main className="pt-24">

        <MarketTicker />

        <section className="max-w-7xl mx-auto px-6">
          <Hero />
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <Stats />
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <Features />
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <HowItWorks />
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <WhyChoose />
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <CTA />
        </section>

      </main>

      <Footer />

    </div>
  );
}