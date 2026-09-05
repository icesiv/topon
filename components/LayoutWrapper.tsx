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
    return <div className="min-h-screen bg-[#040C18] text-slate-100">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </>
  );
}
