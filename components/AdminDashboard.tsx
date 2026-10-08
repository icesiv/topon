"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { subscribeHeroBusinesses } from "@/lib/heroBusinesses";
import { subscribePartners } from "@/lib/partners";
import { subscribeAdminUsers } from "@/lib/adminUsers";

import {
  AdminTab,
  AdminSidebar,
  AdminHeader,
  AdminPanelsEditor,
  AdminPartnersEditor,
  AdminGeneralEditor,
  AdminUsersEditor,
  AdminSystemEditor,
  AdminPasswordModal,
  AdminProfileModal,
} from "./admin-dashboard";

import AdminDivisionSlidersEditor from "./AdminDivisionSlidersEditor";
import AdminCompanyProfilesEditor from "./AdminCompanyProfilesEditor";
import AdminArticlesEditor from "./AdminArticlesEditor";
import AdminGalleryEditor from "./AdminGalleryEditor";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>("panels");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Badge counts for sidebar navigation
  const [counts, setCounts] = useState<{
    panels: number;
    partners: number;
    users: number;
  }>({
    panels: 5,
    partners: 25,
    users: 2,
  });

  const isSuperAdmin = user?.role ? user.role === "Super Admin" : true;

  // Session guard: Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Read URL query parameter for active tab (e.g. returning from article edit)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as AdminTab | null;
      const validTabs: AdminTab[] = [
        "panels",
        "division-sliders",
        "profiles",
        "partners",
        "articles",
        "gallery",
        "general",
        "users",
        "system",
      ];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  // Permission guard: Redirect Editors if on restricted Super Admin tabs
  useEffect(() => {
    if (!isSuperAdmin && (activeTab === "users" || activeTab === "system")) {
      setActiveTab("panels");
    }
  }, [isSuperAdmin, activeTab]);

  // Subscribe to collections to keep sidebar counter badges up to date
  useEffect(() => {
    const unsubPanels = subscribeHeroBusinesses((data) => {
      setCounts((prev) => ({ ...prev, panels: data.length }));
    });
    const unsubPartners = subscribePartners((data) => {
      setCounts((prev) => ({ ...prev, partners: data.length }));
    });
    const unsubUsers = subscribeAdminUsers((data) => {
      setCounts((prev) => ({ ...prev, users: data.length }));
    });

    return () => {
      if (unsubPanels) unsubPanels();
      if (unsubPartners) unsubPartners();
      if (unsubUsers) unsubUsers();
    };
  }, []);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out of the admin panel?")) {
      await logout();
      router.push("/admin/login");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020813] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-3 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-brand-gold tracking-wider">
          Verifying Admin Session...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen max-h-screen bg-[#040C18] text-slate-100 flex flex-col lg:flex-row antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isSuperAdmin={isSuperAdmin}
        counts={counts}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          user={user}
          onOpenProfile={() => setIsEditProfileOpen(true)}
          onLogout={handleLogout}
        />

        {/* Workspace Body - Only this part scrolls */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {activeTab === "panels" && <AdminPanelsEditor />}
          {activeTab === "division-sliders" && <AdminDivisionSlidersEditor />}
          {activeTab === "profiles" && <AdminCompanyProfilesEditor />}
          {activeTab === "partners" && <AdminPartnersEditor />}
          {activeTab === "articles" && <AdminArticlesEditor />}
          {activeTab === "gallery" && <AdminGalleryEditor />}
          {activeTab === "general" && <AdminGeneralEditor />}
          {activeTab === "users" && <AdminUsersEditor isSuperAdmin={isSuperAdmin} />}
          {activeTab === "system" && <AdminSystemEditor isSuperAdmin={isSuperAdmin} />}
        </main>

        {/* Modals */}
        <AdminPasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />

        <AdminProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
        />
      </div>
    </div>
  );
}
