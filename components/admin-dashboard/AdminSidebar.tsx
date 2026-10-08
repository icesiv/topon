"use client";

import { AdminTab } from "./types";
import {
  LayoutDashboard,
  Layers,
  FileDown,
  Handshake,
  FileText,
  Camera,
  Building2,
  Users,
  Database,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isSuperAdmin: boolean;
  counts?: {
    panels?: number;
    partners?: number;
    users?: number;
  };
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  isSuperAdmin,
  counts,
}: AdminSidebarProps) {
  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navbar with Hamburger */}
      <div className="lg:hidden bg-[#071930] border-b border-brand-gold/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-white tracking-wide">
            Top On <span className="text-brand-gold font-sans text-xs">ADMIN</span>
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/5 text-slate-200 hover:text-white"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-35 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#071930] border-r border-brand-gold/20 flex flex-col h-screen max-h-screen flex-shrink-0 overflow-hidden transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-goldDark p-0.5 shadow-gold">
                <div className="w-full h-full bg-[#071930] rounded-[10px] flex items-center justify-center text-brand-gold font-bold">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="font-serif font-bold text-white text-base leading-none">
                  TOP ON GROUP
                </div>
                <div className="text-[10px] font-mono text-brand-gold uppercase tracking-widest mt-1">
                  Control Center
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-2">
              Content &amp; Site Management
            </div>

            {/* Tab: Business Panels */}
            <button
              onClick={() => handleSelectTab("panels")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "panels"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Hero Panels</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "panels" ? "bg-black/20 text-brand-navy" : "bg-white/10 text-slate-300"
                  }`}
              >
                {counts?.panels ?? 5}
              </span>
            </button>

            {/* Tab: Division Hero Sliders */}
            <button
              onClick={() => handleSelectTab("division-sliders")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "division-sliders"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <Layers className="w-4 h-4" />
                <span>Entity Sliders</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "division-sliders"
                  ? "bg-black/20 text-brand-navy"
                  : "bg-white/10 text-slate-300"
                  }`}
              >
                5
              </span>
            </button>

            {/* Tab: Official Profiles */}
            <button
              onClick={() => handleSelectTab("profiles")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "profiles"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <FileDown className="w-4 h-4" />
                <span>PDF Profiles</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "profiles"
                  ? "bg-black/20 text-brand-navy"
                  : "bg-white/10 text-slate-300"
                  }`}
              >
                5
              </span>
            </button>

            {/* Tab: Partners */}
            <button
              onClick={() => handleSelectTab("partners")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "partners"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <Handshake className="w-4 h-4" />
                <span>Partners</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "partners"
                  ? "bg-black/20 text-brand-navy"
                  : "bg-white/10 text-slate-300"
                  }`}
              >
                {counts?.partners ?? 25}
              </span>
            </button>

            {/* Tab: Articles */}
            <button
              onClick={() => handleSelectTab("articles")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "articles"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4" />
                <span>Articles</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "articles"
                  ? "bg-black/20 text-brand-navy"
                  : "bg-white/10 text-slate-300"
                  }`}
              >
                Blog
              </span>
            </button>

            {/* Tab: Photo Gallery */}
            <button
              onClick={() => handleSelectTab("gallery")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "gallery"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center space-x-2.5">
                <Camera className="w-4 h-4" />
                <span>Photo Gallery</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "gallery"
                  ? "bg-black/20 text-brand-navy"
                  : "bg-white/10 text-slate-300"
                  }`}
              >
                Photos
              </span>
            </button>

            {/* Tab: General Info */}
            <button
              onClick={() => handleSelectTab("general")}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "general"
                ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Building2 className="w-4 h-4" />
              <span>General Info</span>
            </button>

            {/* System / Admin Controls (Super Admin Only) */}
            {isSuperAdmin && (
              <>
                <div className="pt-4 text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-2">
                  Administration
                </div>

                {/* Tab: Admin Users */}
                <button
                  onClick={() => handleSelectTab("users")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "users"
                    ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Users className="w-4 h-4" />
                    <span>Admin Users</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "users" ? "bg-black/20 text-brand-navy" : "bg-white/10 text-slate-300"
                      }`}
                  >
                    {counts?.users ?? 2}
                  </span>
                </button>

                {/* Tab: System & Firebase */}
                <button
                  onClick={() => handleSelectTab("system")}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === "system"
                    ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Firebase Status</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
