"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  DEFAULT_PARTNERS,
  Partner,
  savePartners,
  subscribePartners,
} from "@/lib/partners";
import { uploadOptimizedMedia } from "@/lib/image-optimizer";
import {
  Handshake,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Upload,
  X,
} from "lucide-react";

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

export default function AdminPartnersEditor() {
  const [partners, setPartners] = useState<Partner[]>(DEFAULT_PARTNERS);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [newPartner, setNewPartner] = useState<Partner>({
    name: "",
    image: "/images/partners/walton.png",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [compressionFeedback, setCompressionFeedback] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribePartners((data) => setPartners(data));
    return () => {
      if (unsub) unsub();
    };
  }, []);

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

  const handleUploadPartnerLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setCompressionFeedback("Optimizing logo...");
    try {
      const uploadRes = await uploadOptimizedMedia(file, "partners", {
        maxWidth: 600,
        maxHeight: 300,
        quality: 0.85,
        format: "image/webp",
      });

      if (uploadRes.success && uploadRes.result) {
        setNewPartner((prev) => ({ ...prev, image: uploadRes.result!.downloadUrl }));
        const originalKB = (file.size / 1024).toFixed(0);
        const compressedKB = (uploadRes.result.sizeBytes / 1024).toFixed(0);
        setCompressionFeedback(`Logo WebP: ${originalKB}KB → ${compressedKB}KB`);
      } else {
        setCompressionFeedback(`Upload failed: ${uploadRes.error}`);
      }
    } catch (err: any) {
      setCompressionFeedback(`Error: ${err?.message || "Upload error"}`);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {saveStatus.type && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-xl animate-in fade-in duration-200 ${saveStatus.type === "success"
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
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center space-x-1.5 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddPartnerOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold font-bold text-xs flex items-center space-x-1.5 border border-brand-gold/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Partner</span>
            </button>

            <button
              type="button"
              onClick={handleSavePartners}
              disabled={isSaving}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Partners"}</span>
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
                  quality={100}
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
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300 block">Logo Image Path or URL</label>
                  <label className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold text-[10px] font-bold cursor-pointer transition-colors border border-brand-gold/30">
                    <Upload className="w-2.5 h-2.5" />
                    <span>{uploadingImage ? "Optimizing..." : "Upload Logo (WebP)"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadPartnerLogo}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  value={newPartner.image}
                  onChange={(e) => setNewPartner({ ...newPartner, image: e.target.value })}
                  placeholder="/images/partners/walton.png or https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono text-xs"
                />
              </div>

              {compressionFeedback && (
                <div className="text-[11px] font-mono p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  {compressionFeedback}
                </div>
              )}

              {/* Quick Presets Picker */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400">Choose from downloaded logos:</span>
                <div className="max-h-32 overflow-y-auto grid grid-cols-3 gap-1.5 p-1 bg-[#040C18] rounded-xl border border-white/10">
                  {PRESET_PARTNER_LOGOS.map((logo) => (
                    <button
                      key={logo}
                      type="button"
                      onClick={() => setNewPartner({ ...newPartner, image: logo })}
                      className={`p-1.5 rounded-lg border text-left truncate text-[10px] ${newPartner.image === logo
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
  );
}
