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
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    if (pathname === "/admin") {
      return <div className="h-screen max-h-screen overflow-hidden bg-[#040C18] text-slate-100">{children}</div>;
    }
    return <div className="min-h-screen bg-[#040C18] text-slate-100 overflow-y-auto">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-[64px] lg:pt-[104px]">{children}</main>
      <Footer />
    </>
  );
}
