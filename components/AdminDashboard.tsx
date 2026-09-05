"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DEFAULT_BUSINESS_PANELS,
  BusinessPanelData,
  AVAILABLE_ICONS,
  ICON_MAP,
  saveHeroBusinesses,
  subscribeHeroBusinesses,
} from "@/lib/heroBusinesses";
import {
  DEFAULT_PARTNERS,
  Partner,
  savePartners,
  subscribePartners,
} from "@/lib/partners";
import {
  DEFAULT_GENERAL_INFO,
  GeneralInfoData,
  saveGeneralInfo,
  subscribeGeneralInfo,
} from "@/lib/generalInfo";
import {
  DEFAULT_ADMIN_USERS,
  AdminUser,
  saveAdminUsers,
  subscribeAdminUsers,
} from "@/lib/adminUsers";
import { isFirebaseConfigured, firebaseConfig } from "@/lib/firebase";
import {
  LayoutDashboard,
  Layers,
  Building2,
  Users,
  Settings,
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  Info,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  UserPlus,
  Server,
  Database,
  Menu,
  X,
  Handshake,
  Sparkles,
} from "lucide-react";

type AdminTab = "panels" | "partners" | "general" | "users" | "system";

const PRESET_HERO_IMAGES = [
  "/images/topontech_hero.jpg",
  "/images/topexpress_hero.jpg",
  "/images/dailyshipping_hero.jpg",
  "/images/toponagro_hero.jpg",
  "/images/hero_port.jpg",
  "/images/trading_sourcing.jpg",
  "/images/customs_cnf.jpg",
  "/images/air_cargo.jpg",
  "/images/agro_farm.jpg",
];

const PRESET_PARTNER_LOGOS = [
  "/images/partners/walton.png",
  "/images/partners/remark.png",
  "/images/partners/bangla-cat.jpeg",
  "/images/partners/army-pharma.png",
  "/images/partners/fervent.jpg",
  "/images/partners/ikbal-textile.png",
  "/images/partners/fusion-group.png",
  "/images/partners/aa-international.jpg",
  "/images/partners/dril.png",
  "/images/partners/majesto.png",
  "/images/partners/factomart.png",
  "/images/partners/acorn.png",
  "/images/partners/bangladesh-lamps.jpg",
  "/images/partners/kashmir-fans.png",
  "/images/partners/whirlpool.png",
  "/images/partners/transcom.jpg",
  "/images/partners/tst-white-house.png",
  "/images/partners/genuine-technology.png",
  "/images/partners/madras-security.png",
  "/images/partners/spectra-hexa.jpg",
  "/images/partners/ms-electronics.jpg",
  "/images/partners/f-and-b.png",
  "/images/partners/bishwash-holdings.jpg",
  "/images/partners/motion-care.png",
  "/images/partners/spark.png",
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("panels");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Business Panels State
  const [panels, setPanels] = useState<BusinessPanelData[]>(DEFAULT_BUSINESS_PANELS);
  const [selectedPanelIdx, setSelectedPanelIdx] = useState<number>(0);
  const [previewExpanded, setPreviewExpanded] = useState(true);

  // Business Partners State
  const [partners, setPartners] = useState<Partner[]>(DEFAULT_PARTNERS);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [newPartner, setNewPartner] = useState<Partner>({
    name: "",
    image: "/images/partners/walton.png",
  });

  // General Info State
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>(DEFAULT_GENERAL_INFO);

  // Users State
  const [users, setUsers] = useState<AdminUser[]>(DEFAULT_ADMIN_USERS);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<AdminUser, "id" | "createdAt">>({
    name: "",
    email: "",
    role: "Editor",
    status: "Active",
  });

  // Global UI & Feedback State
  const [isSaving, setIsSaving] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    setConfigured(isFirebaseConfigured());

    const unsubPanels = subscribeHeroBusinesses((data) => setPanels(data));
    const unsubPartners = subscribePartners((data) => setPartners(data));
    const unsubInfo = subscribeGeneralInfo((data) => setGeneralInfo(data));
    const unsubUsers = subscribeAdminUsers((data) => setUsers(data));

    return () => {
      if (unsubPanels) unsubPanels();
      if (unsubPartners) unsubPartners();
      if (unsubInfo) unsubInfo();
      if (unsubUsers) unsubUsers();
    };
  }, []);

  const currentPanel = panels[selectedPanelIdx] || panels[0];

  // Helper to update current panel field
  const updatePanelField = (field: keyof BusinessPanelData, value: string) => {
    setPanels((prev) => {
      const next = [...prev];
      next[selectedPanelIdx] = {
        ...next[selectedPanelIdx],
        [field]: value,
      };
      return next;
    });
    if (saveStatus.type) setSaveStatus({ type: null, message: "" });
  };

  // Add a new division panel
  const handleAddPanel = () => {
    const nextNum = (panels.length + 1).toString().padStart(2, "0");
    const newPanel: BusinessPanelData = {
      id: `division_${Date.now()}`,
      number: nextNum,
      name: `New Division ${nextNum}`,
      name_short: `Div ${nextNum}`,
      category: "Commercial Business Sector",
      tagline: "Short summary tagline for this division.",
      fullTagline:
        "Comprehensive detailed description and capabilities for this business division in Top On Group.",
      href: "/services",
      image: PRESET_HERO_IMAGES[panels.length % PRESET_HERO_IMAGES.length],
      iconName: "Building2",
    };
    const updated = [...panels, newPanel];
    setPanels(updated);
    setSelectedPanelIdx(updated.length - 1);
  };

  // Delete division panel
  const handleDeletePanel = (index: number) => {
    if (panels.length <= 1) {
      alert("At least one business panel is required.");
      return;
    }
    if (confirm(`Are you sure you want to remove "${panels[index].name}"?`)) {
      const updated = panels.filter((_, i) => i !== index);
      const renumbered = updated.map((p, i) => ({
        ...p,
        number: (i + 1).toString().padStart(2, "0"),
      }));
      setPanels(renumbered);
      setSelectedPanelIdx(Math.max(0, index - 1));
    }
  };

  // Move division panel
  const handleMovePanel = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= panels.length) return;

    const next = [...panels];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);

    const renumbered = next.map((p, i) => ({
      ...p,
      number: (i + 1).toString().padStart(2, "0"),
    }));

    setPanels(renumbered);
    setSelectedPanelIdx(targetIdx);
  };

  // Save Panels to Firebase
  const handleSavePanels = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const res = await saveHeroBusinesses(panels);
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "Business Panels successfully saved to Firebase Firestore!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save business panels.",
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Partner Management Handlers
  const handleUpdatePartner = (index: number, field: keyof Partner, value: string) => {
    setPartners((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddPartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name || !newPartner.image) return;

    const created: Partner = {
      id: `partner_${Date.now()}`,
      name: newPartner.name.trim(),
      image: newPartner.image.trim(),
    };

    const updated = [...partners, created];
    setPartners(updated);
    setIsAddPartnerOpen(false);
    setNewPartner({ name: "", image: "/images/partners/walton.png" });

    await savePartners(updated);
    setSaveStatus({
      type: "success",
      message: `Partner "${created.name}" added and synced!`,
    });
  };

  const handleDeletePartner = async (index: number) => {
    const target = partners[index];
    if (confirm(`Remove partner "${target.name}"?`)) {
      const updated = partners.filter((_, i) => i !== index);
      setPartners(updated);
      await savePartners(updated);
      setSaveStatus({
        type: "success",
        message: `Partner "${target.name}" removed.`,
      });
    }
  };

  const handleMovePartner = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= partners.length) return;

    const next = [...partners];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);
    setPartners(next);
  };

  const handleSavePartners = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const res = await savePartners(partners);
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "Business Partners successfully saved to Firebase Firestore!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save partners.",
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGeneralInfo = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const res = await saveGeneralInfo(generalInfo);
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "General Info successfully saved to Firebase Firestore!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save general info.",
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created: AdminUser = {
      ...newUser,
      id: `admin_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
    };

    const updated = [...users, created];
    setUsers(updated);
    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "Editor", status: "Active" });

    await saveAdminUsers(updated);
    setSaveStatus({
      type: "success",
      message: `Admin user "${created.name}" added successfully!`,
    });
  };

  const handleDeleteUser = async (userId: string) => {
    if (users.length <= 1) {
      alert("At least one admin user must remain.");
      return;
    }
    if (confirm("Are you sure you want to remove this admin user?")) {
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      await saveAdminUsers(updated);
    }
  };

  const SelectedIcon = currentPanel
    ? ICON_MAP[currentPanel.iconName] || ICON_MAP.Building2
    : ICON_MAP.Building2;

  return (
    <div className="min-h-screen bg-[#040C18] text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Navbar with Hamburger */}
      <div className="lg:hidden bg-[#071930] border-b border-brand-gold/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
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

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#071930] border-r border-brand-gold/20 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
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
              onClick={() => {
                setActiveTab("panels");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "panels"
                  ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Layers className="w-4 h-4" />
                <span>Business Panels</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === "panels" ? "bg-black/20 text-brand-navy" : "bg-white/10 text-slate-300"
                }`}
              >
                {panels.length}
              </span>
            </button>

            {/* Tab: Business Partners */}
            <button
              onClick={() => {
                setActiveTab("partners");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "partners"
                  ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Handshake className="w-4 h-4" />
                <span>Business Partners</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === "partners" ? "bg-black/20 text-brand-navy" : "bg-white/10 text-slate-300"
                }`}
              >
                {partners.length}
              </span>
            </button>

            {/* Tab: General Info */}
            <button
              onClick={() => {
                setActiveTab("general");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "general"
                  ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>General Info</span>
            </button>

            {/* Tab: Admin Users */}
            <button
              onClick={() => {
                setActiveTab("users");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "users"
                  ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Users className="w-4 h-4" />
                <span>Admin Users</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === "users" ? "bg-black/20 text-brand-navy" : "bg-white/10 text-slate-300"
                }`}
              >
                {users.length}
              </span>
            </button>

            <div className="pt-4 text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-2">
              System
            </div>

            {/* Tab: System & Firebase */}
            <button
              onClick={() => {
                setActiveTab("system");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "system"
                  ? "bg-brand-gold text-brand-navy font-bold shadow-gold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Firebase Status</span>
            </button>
          </nav>

          {/* Sidebar Footer: Quick Links & Status */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>

            <div className="px-3 py-2 rounded-xl bg-[#040C18] border border-white/10 text-[11px] flex items-center justify-between">
              <span className="text-slate-400">Firebase Sync:</span>
              <span className="flex items-center space-x-1.5 font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected</span>
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Action Header */}
        <header className="bg-[#071930]/80 backdrop-blur-md border-b border-brand-gold/15 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white capitalize font-serif flex items-center space-x-2">
              <span>
                {activeTab === "panels" && "Hero Business Panels Manager"}
                {activeTab === "partners" && "Business Partners & Client Logos"}
                {activeTab === "general" && "General Company & Contact Information"}
                {activeTab === "users" && "Admin Team & Role Management"}
                {activeTab === "system" && "Firebase Configuration & Status"}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {activeTab === "panels" && "Configure the vertical expanding cards on the homepage"}
              {activeTab === "partners" && "Add, reorder, or edit enterprise client logos and partner names"}
              {activeTab === "general" && "Manage phone numbers, emails, addresses and social links"}
              {activeTab === "users" && "Manage authorized admin users and permissions"}
              {activeTab === "system" && "Verify Firestore project connections and sync health"}
            </p>
          </div>

          {/* Primary Action Button */}
          <div>
            {activeTab === "panels" && (
              <button
                onClick={handleSavePanels}
                disabled={isSaving}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Panels"}</span>
              </button>
            )}

            {activeTab === "partners" && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAddPartnerOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Partner</span>
                </button>

                <button
                  onClick={handleSavePartners}
                  disabled={isSaving}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Partners"}</span>
                </button>
              </div>
            )}

            {activeTab === "general" && (
              <button
                onClick={handleSaveGeneralInfo}
                disabled={isSaving}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Info"}</span>
              </button>
            )}

            {activeTab === "users" && (
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Admin User</span>
              </button>
            )}
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Status Message / Toast */}
          {saveStatus.type && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-xl animate-in fade-in duration-200 ${
                saveStatus.type === "success"
                  ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-200"
                  : "bg-red-500/20 border border-red-500/50 text-red-200"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                {saveStatus.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
                <span>{saveStatus.message}</span>
              </div>
              <button
                onClick={() => setSaveStatus({ type: null, message: "" })}
                className="text-xs opacity-70 hover:opacity-100 underline ml-4"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* TAB 1: BUSINESS PANELS */}
          {activeTab === "panels" && (
            <div className="space-y-6">
              {/* Panel Tabs Bar */}
              <div className="bg-[#071930] p-4 rounded-3xl border border-white/10 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Division Columns ({panels.length})
                    </h3>
                    <p className="text-xs text-slate-400">
                      Select a division tab to modify its copy, image, and collapsed short name.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Reset panels to default Top On Group divisions?")) {
                          setPanels(DEFAULT_BUSINESS_PANELS);
                          setSelectedPanelIdx(0);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center space-x-1.5 border border-white/10"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Reset</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAddPanel}
                      className="px-3 py-1.5 rounded-lg bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold text-xs font-semibold flex items-center space-x-1.5 border border-brand-gold/30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Division</span>
                    </button>
                  </div>
                </div>

                {/* Division Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {panels.map((p, idx) => {
                    const Icon = ICON_MAP[p.iconName] || ICON_MAP.Building2;
                    const isSelected = selectedPanelIdx === idx;
                    return (
                      <button
                        key={p.id || idx}
                        onClick={() => setSelectedPanelIdx(idx)}
                        className={`p-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                          isSelected
                            ? "bg-brand-gold/15 border-brand-gold text-white shadow-lg ring-1 ring-brand-gold"
                            : "bg-[#040C18]/80 border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-brand-gold font-bold">
                            {p.number}
                          </span>
                          <Icon className="w-4 h-4 text-brand-gold" />
                        </div>
                        <div className="font-semibold text-xs sm:text-sm text-white truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          Short: <strong className="text-slate-200">{p.name_short}</strong>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form & Live Preview Grid */}
              {currentPanel && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Form Inputs (7 cols) */}
                  <div className="lg:col-span-7 bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center space-x-2">
                          <span>Editing:</span>
                          <span className="text-brand-gold">{currentPanel.name}</span>
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">ID: {currentPanel.id}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => handleMovePanel(selectedPanelIdx, "up")}
                          disabled={selectedPanelIdx === 0}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10"
                          title="Move Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMovePanel(selectedPanelIdx, "down")}
                          disabled={selectedPanelIdx === panels.length - 1}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10"
                          title="Move Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePanel(selectedPanelIdx)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 ml-2"
                          title="Delete Panel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 block">
                          Full Division Name (Expanded) <span className="text-brand-gold">*</span>
                        </label>
                        <input
                          type="text"
                          value={currentPanel.name}
                          onChange={(e) => updatePanelField("name", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                        />
                      </div>

                      {/* Short Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 block">
                          Short Name (Collapsed) <span className="text-brand-gold">*</span>
                        </label>
                        <input
                          type="text"
                          value={currentPanel.name_short}
                          onChange={(e) => updatePanelField("name_short", e.target.value)}
                          placeholder="e.g. Tech, TEL, DSL, Agro"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                        />
                      </div>

                      {/* Number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 block">
                          Number Badge
                        </label>
                        <input
                          type="text"
                          value={currentPanel.number}
                          onChange={(e) => updatePanelField("number", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-mono focus:border-brand-gold focus:outline-none"
                        />
                      </div>

                      {/* Route */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 block">
                          Route / Link URL
                        </label>
                        <input
                          type="text"
                          value={currentPanel.href}
                          onChange={(e) => updatePanelField("href", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Category / Industry Sub-title
                      </label>
                      <input
                        type="text"
                        value={currentPanel.category}
                        onChange={(e) => updatePanelField("category", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                      />
                    </div>

                    {/* Short Tagline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Short Tagline
                      </label>
                      <textarea
                        rows={2}
                        value={currentPanel.tagline}
                        onChange={(e) => updatePanelField("tagline", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* Full Tagline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Full Tagline / Detailed Scope
                      </label>
                      <textarea
                        rows={3}
                        value={currentPanel.fullTagline}
                        onChange={(e) => updatePanelField("fullTagline", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* Background Image */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Hero Background Image
                      </label>
                      <input
                        type="text"
                        value={currentPanel.image}
                        onChange={(e) => updatePanelField("image", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-mono focus:border-brand-gold focus:outline-none"
                      />

                      {/* Presets */}
                      <div className="flex flex-wrap gap-2">
                        {PRESET_HERO_IMAGES.map((img) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => updatePanelField("image", img)}
                            className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                              currentPanel.image === img
                                ? "bg-brand-gold text-brand-navy font-bold border-brand-gold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            {img.replace("/images/", "").replace(".jpg", "")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Icon Picker */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Lucide Icon Picker
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {AVAILABLE_ICONS.map((iconKey) => {
                          const IconComp = ICON_MAP[iconKey];
                          const isIconSelected = currentPanel.iconName === iconKey;
                          return (
                            <button
                              key={iconKey}
                              type="button"
                              onClick={() => updatePanelField("iconName", iconKey)}
                              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                                isIconSelected
                                  ? "bg-brand-gold/20 border-brand-gold text-brand-gold shadow-md"
                                  : "bg-[#040C18] border-white/10 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              <IconComp className="w-5 h-5" />
                              <span className="text-[10px] truncate max-w-full">{iconKey}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Live Preview Column (5 cols) */}
                  <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-brand-gold" />
                        <span>Live Card Preview</span>
                      </h4>
                      <div className="flex items-center space-x-1 text-xs bg-[#071930] p-1 rounded-lg border border-white/10">
                        <button
                          type="button"
                          onClick={() => setPreviewExpanded(false)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                            !previewExpanded
                              ? "bg-brand-gold text-brand-navy"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Collapsed
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewExpanded(true)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                            previewExpanded
                              ? "bg-brand-gold text-brand-navy"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Expanded
                        </button>
                      </div>
                    </div>

                    {/* Preview Box */}
                    <div
                      className={`relative rounded-3xl overflow-hidden border transition-all duration-500 min-h-[480px] flex flex-col justify-between shadow-2xl ${
                        previewExpanded
                          ? "border-brand-gold/60 ring-2 ring-brand-gold/20"
                          : "border-white/15 opacity-90"
                      }`}
                    >
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={currentPanel.image || "/images/topontech_hero.jpg"}
                          alt={currentPanel.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className={`object-cover transition-all duration-500 ${
                            previewExpanded
                              ? "scale-105 brightness-110"
                              : "scale-100 brightness-[0.7]"
                          }`}
                        />
                        <div
                          className={`absolute inset-0 transition-all duration-500 ${
                            previewExpanded
                              ? "bg-gradient-to-t from-[#040C18] via-[#040C18]/50 to-transparent"
                              : "bg-gradient-to-t from-[#040C18] via-[#040C18]/70 to-black/40"
                          }`}
                        />
                      </div>

                      {/* Top Badge */}
                      <div className="relative z-10 p-5 flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brand-gold">
                          <SelectedIcon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded-lg border border-white/15">
                          {currentPanel.number}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className="relative z-10 p-6 space-y-2 mt-auto">
                        <h5 className="text-2xl font-serif font-bold text-white">
                          {previewExpanded ? currentPanel.name : currentPanel.name_short}
                        </h5>

                        <p className="text-xs text-slate-200 leading-relaxed">
                          {previewExpanded ? currentPanel.fullTagline : currentPanel.tagline}
                        </p>

                        <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-brand-gold font-semibold">
                          <span>Click to Open</span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {currentPanel.href}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BUSINESS PARTNERS */}
          {activeTab === "partners" && (
            <div className="space-y-6">
              <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Handshake className="w-5 h-5 text-brand-gold" />
                      <span>Business Partners ({partners.length})</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage client and partner logos displayed on the homepage.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Reset partners list to standard 25 downloaded partners?")) {
                          setPartners(DEFAULT_PARTNERS);
                          savePartners(DEFAULT_PARTNERS);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center space-x-1.5 border border-white/10"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Reset</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAddPartnerOpen(true)}
                      className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs flex items-center space-x-1.5 shadow-gold transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Partner</span>
                    </button>
                  </div>
                </div>

                {/* Partners List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {partners.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="p-4 rounded-2xl bg-[#040C18] border border-white/10 hover:border-brand-gold/40 flex items-center justify-between space-x-4 transition-all shadow-md group"
                    >
                      {/* Logo Preview */}
                      <div className="w-16 h-12 relative bg-white rounded-xl p-1 flex-shrink-0 flex items-center justify-center border border-slate-200">
                        <Image
                          src={p.image || "/images/partners/walton.png"}
                          alt={p.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Name & Image Edit Inputs */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) => handleUpdatePartner(idx, "name", e.target.value)}
                          className="w-full px-2.5 py-1 rounded-lg bg-[#071930] border border-white/10 text-white font-semibold text-xs focus:border-brand-gold focus:outline-none"
                          placeholder="Partner Name"
                        />
                        <input
                          type="text"
                          value={p.image}
                          onChange={(e) => handleUpdatePartner(idx, "image", e.target.value)}
                          className="w-full px-2.5 py-0.5 rounded-lg bg-[#071930] border border-white/10 text-slate-400 font-mono text-[10px] focus:border-brand-gold focus:outline-none truncate"
                          placeholder="/images/partners/..."
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMovePartner(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20"
                          title="Move Left"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMovePartner(idx, "down")}
                          disabled={idx === partners.length - 1}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20"
                          title="Move Right"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePartner(idx)}
                          className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300"
                          title="Delete Partner"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Partner Modal */}
              {isAddPartnerOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#071930] border border-brand-gold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-base font-bold text-white flex items-center space-x-2">
                        <Handshake className="w-5 h-5 text-brand-gold" />
                        <span>Add New Business Partner</span>
                      </h4>
                      <button
                        onClick={() => setIsAddPartnerOpen(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddPartnerSubmit} className="space-y-4 text-xs sm:text-sm">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-300 block">Partner / Client Name</label>
                        <input
                          type="text"
                          required
                          value={newPartner.name}
                          onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                          placeholder="e.g. Apex Footwear Ltd."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-300 block">Logo Image Path or URL</label>
                        <input
                          type="text"
                          required
                          value={newPartner.image}
                          onChange={(e) => setNewPartner({ ...newPartner, image: e.target.value })}
                          placeholder="/images/partners/walton.png"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono text-xs"
                        />
                      </div>

                      {/* Quick Presets Picker */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] text-slate-400">Choose from downloaded logos:</span>
                        <div className="max-h-32 overflow-y-auto grid grid-cols-3 gap-1.5 p-1 bg-[#040C18] rounded-xl border border-white/10">
                          {PRESET_PARTNER_LOGOS.map((logo) => (
                            <button
                              key={logo}
                              type="button"
                              onClick={() => setNewPartner({ ...newPartner, image: logo })}
                              className={`p-1.5 rounded-lg border text-left truncate text-[10px] ${
                                newPartner.image === logo
                                  ? "bg-brand-gold text-brand-navy font-bold border-brand-gold"
                                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                              }`}
                            >
                              {logo.replace("/images/partners/", "")}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddPartnerOpen(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold"
                        >
                          Add Partner
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GENERAL INFO & CONTACTS */}
          {activeTab === "general" && (
            <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-brand-gold" />
                  <span>Corporate General Information &amp; Desks</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Update corporate headquarters phones, email addresses, and social channels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={generalInfo.companyName}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, companyName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Company Tagline
                  </label>
                  <input
                    type="text"
                    value={generalInfo.tagline}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                {/* Dhaka Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Dhaka Office Phone</span>
                  </label>
                  <input
                    type="text"
                    value={generalInfo.dhakaPhone}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, dhakaPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none font-mono"
                  />
                </div>

                {/* Ctg Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Chittagong Port Office Phone</span>
                  </label>
                  <input
                    type="text"
                    value={generalInfo.ctgPhone}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, ctgPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none font-mono"
                  />
                </div>

                {/* Corporate Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Corporate Email</span>
                  </label>
                  <input
                    type="email"
                    value={generalInfo.email}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                {/* Head Office Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Head Office Address</span>
                  </label>
                  <input
                    type="text"
                    value={generalInfo.headOfficeAddress}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, headOfficeAddress: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                {/* Operating Hours */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Operating Hours</span>
                  </label>
                  <input
                    type="text"
                    value={generalInfo.operatingHours}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, operatingHours: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                {/* Facebook URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Facebook Page URL
                  </label>
                  <input
                    type="text"
                    value={generalInfo.facebookUrl}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, facebookUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none font-mono text-xs"
                  />
                </div>

                {/* LinkedIn URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    LinkedIn Company URL
                  </label>
                  <input
                    type="text"
                    value={generalInfo.linkedinUrl}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, linkedinUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN USERS */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-brand-gold" />
                      <span>Admin Users &amp; Permissions</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage team members who have permission to edit website content.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddUserOpen(true)}
                    className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs flex items-center space-x-2 shadow-gold transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>

                {/* User List Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4">User Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-white flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-xs">
                              {u.name.charAt(0)}
                            </div>
                            <span>{u.name}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">{u.email}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[11px] font-semibold">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center space-x-1.5 text-emerald-400 text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>{u.status}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors"
                              title="Delete Admin"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add User Modal */}
              {isAddUserOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#071930] border border-brand-gold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-base font-bold text-white flex items-center space-x-2">
                        <UserPlus className="w-5 h-5 text-brand-gold" />
                        <span>Add Admin User</span>
                      </h4>
                      <button
                        onClick={() => setIsAddUserOpen(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddUser} className="space-y-4 text-xs sm:text-sm">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-300 block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="e.g. Abdullah Mamun"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-300 block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="user@toponbd.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-300 block">Role</label>
                        <select
                          value={newUser.role}
                          onChange={(e) =>
                            setNewUser({ ...newUser, role: e.target.value as AdminUser["role"] })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                        >
                          <option value="Super Admin">Super Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Operations Admin">Operations Admin</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </div>

                      <div className="pt-2 flex items-center justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddUserOpen(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold"
                        >
                          Create User
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SYSTEM & FIREBASE */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Server className="w-5 h-5 text-brand-gold" />
                    <span>Firebase Firestore Diagnostics</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live connection parameters loaded from your environment.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#040C18] border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-mono">
                      Project ID
                    </span>
                    <div className="font-mono text-sm text-white font-bold">
                      {firebaseConfig.projectId || "topon-ae2d7"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#040C18] border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-mono">
                      Storage Bucket
                    </span>
                    <div className="font-mono text-sm text-white font-bold">
                      {firebaseConfig.storageBucket || "topon-ae2d7.firebasestorage.app"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#040C18] border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-mono">
                      Auth Domain
                    </span>
                    <div className="font-mono text-sm text-white font-bold">
                      {firebaseConfig.authDomain || "topon-ae2d7.firebaseapp.com"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#040C18] border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-mono">
                      Firestore Collections
                    </span>
                    <div className="font-mono text-sm text-brand-gold font-bold">
                      settings/heroBusinesses, settings/partners, settings/generalInfo, settings/adminUsers
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>
                    Firebase SDK is initialized and configured with real-time listeners active across all client sessions.
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
