import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import MetricCounter from "@/components/MetricCounter";
import CorporateStrategy from "@/components/CorporateStrategy";
import DivisionTabs from "@/components/DivisionTabs";
import AirCargoSection from "@/components/AirCargoSection";
import CoreValues from "@/components/CoreValues";
import LeadershipSpotlight from "@/components/LeadershipSpotlight";
import HomeQuoteSection from "@/components/HomeQuoteSection";

export const metadata: Metadata = {
  title: "Home | International Trading & Freight Forwarding Logistics",
  description:
    "Top On Group is a premier conglomerate in Bangladesh, specializing in general trading, ocean and air freight forwarding, customs clearance, and supply chain logistics.",
};

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 bg-slate-50 text-slate-900">
      {/* 1. HERO SEGMENT */}
      <HeroSection />

      {/* 2. METRIC COUNTER BAR */}
      <MetricCounter />

      {/* 3. BUSINESS DIVISIONS (Top On-Tech vs Daily Shipping) */}
      <DivisionTabs />

      {/* 4. LEADERSHIP SPOTLIGHT */}
      <LeadershipSpotlight />

      {/* 5. CONVERSION & QUOTE INQUIRY */}
      <HomeQuoteSection />
    </div>
  );
}
