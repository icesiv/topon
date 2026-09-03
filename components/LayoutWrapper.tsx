"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isComingSoon = pathname === "/";

  if (isComingSoon) {
    return <main className="min-h-screen w-full overflow-x-hidden">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </>
  );
}
