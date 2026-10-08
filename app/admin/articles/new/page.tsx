import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import AdminArticleFormPage from "@/components/admin-dashboard/AdminArticleFormPage";

export const metadata: Metadata = {
  title: "Create Article | Admin Dashboard | Top On Group",
  robots: { index: false, follow: false },
};

export default function NewArticleAdminPage() {
  return (
    <AuthProvider>
      <AdminArticleFormPage />
    </AuthProvider>
  );
}
