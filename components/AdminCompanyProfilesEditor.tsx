"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CompanyProfile,
  DEFAULT_COMPANY_PROFILES,
  PROFILE_ICON_MAP,
  AVAILABLE_PROFILE_ICONS,
  subscribeCompanyProfiles,
  saveCompanyProfiles,
} from "@/lib/companyProfiles";
import { uploadPdfDocument } from "@/lib/image-optimizer";
import { useAuth } from "@/lib/auth-context";
import {
  FileDown,
  FileText,
  Upload,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Eye,
  Edit3,
  X,
  FileCheck2,
  Sparkles,
  Download,
  Check,
} from "lucide-react";

export default function AdminCompanyProfilesEditor() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<CompanyProfile[]>(DEFAULT_COMPANY_PROFILES);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalFormData, setModalFormData] = useState<CompanyProfile>({
    id: "",
    name: "",
    badge: "",
    pdfUrl: "",
    filename: "",
    iconName: "FileText",
    size: "1.0 MB",
    status: "published",
    order: 0,
  });

  // Upload State
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCompanyProfiles((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProfiles(data);
      }
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Save changes to cloud & local
  const handleSaveChanges = async (updatedList = profiles) => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const res = await saveCompanyProfiles(updatedList, user?.email || "admin");
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "All official profiles updated and synced to the navbar successfully!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save profiles to database.",
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus((prev) => (prev.type === "success" ? { type: null, message: "" } : prev));
      }, 5000);
    }
  };

  // Reordering
  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= profiles.length) return;

    const reordered = [...profiles];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    const reIndexed = reordered.map((item, idx) => ({ ...item, order: idx }));
    setProfiles(reIndexed);
  };

  // Status toggle
  const handleToggleStatus = (index: number) => {
    const updated = [...profiles];
    const current = updated[index];
    updated[index] = {
      ...current,
      status: current.status === "draft" ? "published" : "draft",
    };
    setProfiles(updated);
  };

  // Delete profile
  const handleDelete = (id: string) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    setDeleteConfirmId(null);
  };

  // Open modal for new profile
  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setModalFormData({
      id: `prof_${Date.now()}`,
      name: "",
      badge: "",
      pdfUrl: "",
      filename: "",
      iconName: "FileText",
      size: "",
      status: "published",
      order: profiles.length,
    });
    setUploadFeedback("");
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (index: number) => {
    setEditingIndex(index);
    setModalFormData({ ...profiles[index] });
    setUploadFeedback("");
    setIsModalOpen(true);
  };

  // PDF File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setUploadFeedback("Error: Please select a valid PDF document (.pdf).");
      return;
    }

    setUploadingPdf(true);
    setUploadFeedback("Uploading PDF document...");

    try {
      const res = await uploadPdfDocument(file, "profiles", user?.email || "admin");
      if (res.success && res.downloadUrl) {
        setModalFormData((prev) => ({
          ...prev,
          pdfUrl: res.downloadUrl!,
          filename: res.filename || file.name,
          size: res.sizeFormatted || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }));
        setUploadFeedback(`Uploaded successfully: ${res.filename} (${res.sizeFormatted})`);
      } else {
        setUploadFeedback(`Upload failed: ${res.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setUploadFeedback(`Upload error: ${err?.message || "Could not process file"}`);
    } finally {
      setUploadingPdf(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Save Modal Form
  const handleSaveModalForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name.trim()) {
      alert("Please enter a profile name.");
      return;
    }
    if (!modalFormData.pdfUrl.trim()) {
      alert("Please upload a PDF or enter a valid PDF URL.");
      return;
    }

    let updatedList: CompanyProfile[];
    if (editingIndex !== null) {
      updatedList = [...profiles];
      updatedList[editingIndex] = { ...modalFormData };
    } else {
      updatedList = [...profiles, { ...modalFormData, order: profiles.length }];
    }

    setProfiles(updatedList);
    setIsModalOpen(false);
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    if (confirm("Reset official profiles back to original 5 group entities? Any unsaved additions will be removed.")) {
      setProfiles(DEFAULT_COMPANY_PROFILES);
      handleSaveChanges(DEFAULT_COMPANY_PROFILES);
    }
  };

  const publishedCount = profiles.filter((p) => p.status !== "draft").length;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">


          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-gold text-brand-navy hover:bg-brand-goldLight transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Profile</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveChanges()}
              disabled={isSaving}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {saveStatus.message && (
          <div
            className={`mt-4 p-3 rounded-xl flex items-center space-x-2.5 text-xs sm:text-sm animate-in fade-in ${saveStatus.type === "success"
                ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-200"
                : "bg-red-950/60 border border-red-500/40 text-red-200"
              }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>{saveStatus.message}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-800 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Total Profiles</span>
            <span className="text-base font-bold text-white mt-0.5 block">{profiles.length}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Published (Live)</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">{publishedCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Drafts</span>
            <span className="text-base font-bold text-amber-400 mt-0.5 block">
              {profiles.length - publishedCount}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Storage Mode</span>
            <span className="text-base font-bold text-blue-400 mt-0.5 block">Cloud + Offline</span>
          </div>
        </div>
      </div>

      {/* Profiles List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Configured Company Profiles</h3>
            <p className="text-xs text-slate-500">
              Profiles are rendered in the navbar dropdown in the sequence displayed below.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            {profiles.length} items
          </span>
        </div>

        {profiles.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-3">
            <FileDown className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No company profiles found.</p>
            <button
              onClick={handleOpenAddModal}
              className="px-3.5 py-1.5 bg-brand-navy text-white text-xs rounded-xl font-semibold hover:bg-slate-800"
            >
              Add First Profile
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {profiles.map((profile, idx) => {
              const IconComp = (profile.iconName && PROFILE_ICON_MAP[profile.iconName]) || FileText;
              const isPublished = profile.status !== "draft";

              return (
                <div
                  key={profile.id || idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition-all ${isPublished
                      ? "bg-slate-50/80 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                      : "bg-amber-50/40 border-amber-200/80 opacity-80"
                    }`}
                >
                  {/* Left: Reorder Controls + Icon + Details */}
                  <div className="flex items-center space-x-3 min-w-0">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 hover:bg-slate-200/60 rounded"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === profiles.length - 1}
                        title="Move Down"
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 hover:bg-slate-200/60 rounded"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Order Pill */}
                    <span className="text-[11px] font-mono font-bold text-slate-400 w-5 text-center">
                      #{idx + 1}
                    </span>

                    {/* Icon */}
                    <div className="p-2.5 rounded-xl bg-brand-navy text-brand-gold flex-shrink-0 shadow-xs">
                      <IconComp className="w-4 h-4" />
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                          {profile.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isPublished
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                            }`}
                        >
                          {isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-medium text-slate-700">{profile.badge}</span>
                        <span>&bull;</span>
                        <span className="font-mono text-slate-600">{profile.filename || "file.pdf"}</span>
                        <span>&bull;</span>
                        <span className="text-slate-500">{profile.size || "PDF"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center space-x-1.5 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 flex-shrink-0 self-end sm:self-center">
                    {/* View / Download PDF Test */}
                    <a
                      href={profile.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open / Download PDF"
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-brand-navy transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-goldDark" />
                      <span>View PDF</span>
                    </a>

                    {/* Status Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(idx)}
                      title={isPublished ? "Set to Draft" : "Publish"}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${isPublished
                          ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }`}
                    >
                      {isPublished ? "Draft" : "Publish"}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(idx)}
                      title="Edit Profile"
                      className="p-1.5 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(profile.id)}
                      title="Delete Profile"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="p-2 bg-red-100 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Delete Profile?</h4>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to remove this profile from the navbar downloads? Click Save afterwards to apply changes to cloud.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-8 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-brand-navy text-brand-gold rounded-xl">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {editingIndex !== null ? "Edit Official Profile" : "Add New Official Profile"}
                  </h3>
                  <p className="text-[11px] text-slate-500">Configure profile title, category badge, and PDF file.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModalForm} className="space-y-4 text-xs">
              {/* Profile Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Company / Entity Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Top Express Limited"
                  value={modalFormData.name}
                  onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-slate-900"
                />
              </div>

              {/* Badge / Category Subtitle */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subtitle Badge / Specialization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Customs C&F or Freight Forwarding"
                  value={modalFormData.badge}
                  onChange={(e) => setModalFormData({ ...modalFormData, badge: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold text-slate-900"
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Display Icon
                </label>
                <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  {AVAILABLE_PROFILE_ICONS.map((iconKey) => {
                    const IconBtn = PROFILE_ICON_MAP[iconKey];
                    const isSelected = modalFormData.iconName === iconKey;
                    return (
                      <button
                        key={iconKey}
                        type="button"
                        onClick={() => setModalFormData({ ...modalFormData, iconName: iconKey })}
                        title={iconKey}
                        className={`p-2 rounded-lg flex items-center justify-center transition-all ${isSelected
                            ? "bg-brand-navy text-brand-gold ring-2 ring-brand-gold shadow-xs"
                            : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                          }`}
                      >
                        <IconBtn className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PDF File Upload Zone */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">
                  PDF Document File <span className="text-red-500">*</span>
                </label>

                {/* Upload Button & Area */}
                <div className="p-3.5 border-2 border-dashed border-slate-300 hover:border-brand-gold rounded-xl bg-slate-50/60 hover:bg-brand-gold/5 transition-colors text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="profile-pdf-upload"
                  />
                  <label
                    htmlFor="profile-pdf-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
                  >
                    <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-200 text-brand-navy">
                      <Upload className="w-5 h-5 text-brand-goldDark" />
                    </div>
                    <div>
                      <span className="font-semibold text-brand-navy hover:underline">
                        Click here to upload new PDF
                      </span>
                      <span className="text-slate-500 block text-[11px] mt-0.5">
                        Accepts official PDF brochure (.pdf)
                      </span>
                    </div>
                  </label>

                  {uploadingPdf && (
                    <div className="mt-2 text-xs font-semibold text-brand-navy flex items-center justify-center space-x-1.5">
                      <div className="w-3.5 h-3.5 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin" />
                      <span>Uploading document...</span>
                    </div>
                  )}

                  {uploadFeedback && !uploadingPdf && (
                    <p
                      className={`mt-2 text-[11px] font-medium ${uploadFeedback.startsWith("Error") || uploadFeedback.startsWith("Upload failed")
                          ? "text-red-600"
                          : "text-emerald-700"
                        }`}
                    >
                      {uploadFeedback}
                    </p>
                  )}
                </div>

                {/* PDF URL input (auto populated or custom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">PDF Path / URL</label>
                    <input
                      type="text"
                      required
                      placeholder="/profiles/custom.pdf or https://..."
                      value={modalFormData.pdfUrl}
                      onChange={(e) => setModalFormData({ ...modalFormData, pdfUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">Download Filename</label>
                    <input
                      type="text"
                      placeholder="TEL-profile.pdf"
                      value={modalFormData.filename}
                      onChange={(e) => setModalFormData({ ...modalFormData, filename: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">Display File Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 4.9 MB or 933 KB"
                      value={modalFormData.size}
                      onChange={(e) => setModalFormData({ ...modalFormData, size: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">Status</label>
                    <select
                      value={modalFormData.status || "published"}
                      onChange={(e) =>
                        setModalFormData({
                          ...modalFormData,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                    >
                      <option value="published">Published (Visible in Navbar)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Navbar Preview Card */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                  Live Navbar Dropdown Preview
                </label>
                <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                  <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-between shadow-xs">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-brand-navy text-brand-gold flex-shrink-0">
                        {(() => {
                          const PreviewIcon =
                            (modalFormData.iconName && PROFILE_ICON_MAP[modalFormData.iconName]) || FileText;
                          return <PreviewIcon className="w-3.5 h-3.5" />;
                        })()}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-slate-900 truncate text-xs">
                          {modalFormData.name || "Company Name"}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {modalFormData.badge || "Category"} &bull; {modalFormData.size || "1.0 MB"}
                        </span>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg text-slate-400 bg-slate-50 ml-2">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-800 font-semibold shadow-xs"
                >
                  {editingIndex !== null ? "Update Profile" : "Add Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
