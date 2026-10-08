"use client";

import Link from "next/link";
import { AdminTab } from "./types";
import { Globe, UserCog, LogOut } from "lucide-react";

interface AdminHeaderProps {
  activeTab: AdminTab;
  user: any;
  onOpenProfile: () => void;
  onLogout: () => void;
  children?: React.ReactNode;
}

const TAB_TITLES: Record<AdminTab, { title: string; description: string }> = {
  panels: {
    title: "Hero Business Panels Manager",
    description: "Configure the vertical expanding cards on the homepage",
  },
  "division-sliders": {
    title: "Group Entity Sliders Manager",
    description: "Edit background images, categories, and headlines for each group entity hero slider",
  },
  profiles: {
    title: "Official Profiles (PDF) Manager",
    description: "Upload, customize, and order downloadable official company PDF profiles in the navbar",
  },
  partners: {
    title: "Business Partners & Client Logos",
    description: "Add, reorder, or edit enterprise client logos and partner names",
  },
  articles: {
    title: "Articles & Industry Insights Manager",
    description: "Publish, edit, add, or delete freight forwarding and trade articles",
  },
  gallery: {
    title: "Corporate Photo Gallery & Media Manager",
    description: "Add, edit, reorder, or publish corporate photos and popup lightbox captions",
  },
  general: {
    title: "General Company & Contact Information",
    description: "Manage phone numbers, emails, addresses and social links",
  },
  users: {
    title: "Admin Team & Role Management",
    description: "Manage authorized admin users and permissions",
  },
  system: {
    title: "Firebase Configuration & Status",
    description: "Verify Firestore project connections and sync health",
  },
  security: {
    title: "Admin Account & Security Settings",
    description: "Manage administrative password and secure credentials",
  },
};

export default function AdminHeader({
  activeTab,
  user,
  onOpenProfile,
  onLogout,
  children,
}: AdminHeaderProps) {
  const currentTabInfo = TAB_TITLES[activeTab] || TAB_TITLES.panels;

  return (
    <header className="bg-[#071930]/95 backdrop-blur-md border-b border-brand-gold/15 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between flex-shrink-0">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-white capitalize font-serif flex items-center space-x-2">
          <span>{currentTabInfo.title}</span>
        </h2>
        <p className="text-xs text-slate-400">
          {currentTabInfo.description}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        {children}

        {/* Top Navbar Actions: Visit Live Site, Edit Profile, Logout */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 pl-2 sm:pl-3 border-l border-white/10">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-semibold shadow-xs"
            title="Visit Live Site"
          >
            <Globe className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
          </Link>

          <button
            onClick={onOpenProfile}
            className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#040C18] hover:bg-white/5 border border-brand-gold/30 hover:border-brand-gold text-white text-xs font-semibold transition-all group shadow-xs"
            title="Edit Profile"
          >
            <div className="text-left hidden lg:block leading-tight">
              <div className="font-semibold text-white text-xs truncate max-w-[120px]">
                {user?.displayName || "Admin User"}
              </div>
              <div className="text-[10px] text-brand-gold font-mono">
                {user?.role || "Super Admin"}
              </div>
            </div>
            <span className="hidden sm:inline lg:hidden">Profile</span>
            <UserCog className="w-3.5 h-3.5 text-brand-gold group-hover:scale-110 transition-transform ml-0.5" />
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
            title="Log Out of Admin Panel"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
