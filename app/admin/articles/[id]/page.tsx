import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import AdminArticleFormPage from "@/components/admin-dashboard/AdminArticleFormPage";

export const metadata: Metadata = {
  title: "Edit Article | Admin Dashboard | Top On Group",
  robots: { index: false, follow: false },
};

export default async function EditArticleAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AuthProvider>
      <AdminArticleFormPage articleId={id} />
    </AuthProvider>
  );
}
