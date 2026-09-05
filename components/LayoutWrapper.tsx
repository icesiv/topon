"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </>
  );
}
