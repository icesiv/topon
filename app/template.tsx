"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="relative w-full">
      {/* Route Transition Top Indicator Line */}
      <div
        key={`progress-${pathname}`}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold z-[9999] pointer-events-none animate-page-progress"
      />

      {/* Page Content with Smooth Fade and Slide Transition */}
      <div
        key={`page-${pathname}`}
        className="animate-page-enter will-change-[opacity,transform]"
      >
        {children}
      </div>
    </div>
  );
}
