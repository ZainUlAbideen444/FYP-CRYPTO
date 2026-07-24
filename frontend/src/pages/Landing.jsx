import Navbar from "../components/Navbar";
import MarketTicker from "../components/MarketTicker";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WhyChoose from "../components/WhyChoose";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import DashboardStatCard from "../components/DashboardStatCard";

export default function Landing() {
  return (
    <div className="bg-[#050505]">

      <Navbar />

      <div className="pt-20">

        <MarketTicker />

        <Hero />

        <Stats />

        <Features />

        <HowItWorks />

        <WhyChoose />

        <CTA />

        <Footer />

      </div>

    </div>
  );
}