import type { Metadata } from "next";
import AdminLogin from "@/components/AdminLogin";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Admin Login | Top On Group",
  description: "Secure login portal for Top On Group platform administration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <AuthProvider>
      <AdminLogin />
    </AuthProvider>
  );
}
