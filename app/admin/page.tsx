import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Top On Group",
  description:
    "Top On Group Administration Portal - Manage Business Panels, General Info, and Admin Users.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
