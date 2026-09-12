import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DivisionTabs from "@/components/DivisionTabs";
import LeadershipSpotlight from "@/components/LeadershipSpotlight";
import SustainabilitySection from "@/components/SustainabilitySection";
import BusinessPartnersSection from "@/components/BusinessPartnersSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export const metadata: Metadata = {
  title: "Top On Group | International Trading & Freight Forwarding Logistics",
  description:
    "Top On Group is a premier conglomerate in Bangladesh, specializing in general trading, ocean and air freight forwarding, customs clearance, and supply chain logistics.",
};

export default function HomePage() {
  return (
    <div className=" bg-slate-50 text-slate-900">
      {/* 1. HERO SEGMENT */}
      <HeroSection />

      {/* 2. ABOUT SECTION */}
      <AboutSection />

      {/* 4. BUSINESS DIVISIONS (Top On-Tech, Top Express, Daily Shipping, Top On-Agro) */}
      <DivisionTabs />

      {/* 5. LEADERSHIP SPOTLIGHT */}
      <LeadershipSpotlight />

      {/* 3. BUSINESS PARTNERS & STRATEGIC CLIENTS */}
      <BusinessPartnersSection />

      {/* 6. SUSTAINABILITY & ESG COMMITMENT */}
      <SustainabilitySection />

      {/* 7. WHY CHOOSE US SECTION */}
      <WhyChooseUsSection />
    </div>
  );
}
