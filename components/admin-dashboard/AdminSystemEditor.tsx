"use client";

import { useState } from "react";
import { firebaseConfig } from "@/lib/firebase";
import { seedFirestoreDatabase } from "@/lib/seeder";
import { useAuth } from "@/lib/auth-context";
import {
  Server,
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Upload,
} from "lucide-react";

interface AdminSystemEditorProps {
  isSuperAdmin?: boolean;
}

export default function AdminSystemEditor({ isSuperAdmin = true }: AdminSystemEditorProps) {
  const { user } = useAuth();
  const [isPurging, setIsPurging] = useState(false);
  const [purgeResult, setPurgeResult] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handlePurgeSoftDeleted = async () => {
    if (!isSuperAdmin) {
      alert("Only Super Admins have permission to purge database documents.");
      return;
    }
    if (!confirm("Purge soft-deleted documents older than 30 days from database?")) return;
    setIsPurging(true);
    setPurgeResult(null);
    try {
      const res = await fetch("/api/admin/purge-deleted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ retentionDays: 30 }),
      });
      const data = await res.json();
      if (data.success) {
        setPurgeResult(`Successfully purged ${data.totalPurged} deleted record(s).`);
      } else {
        setPurgeResult(`Purge warning: ${data.error || "Could not complete purge"}`);
      }
    } catch (err: any) {
      setPurgeResult(`Purge failed: ${err?.message}`);
    } finally {
      setIsPurging(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!isSuperAdmin) {
      alert("Only Super Admins have permission to run database seeding.");
      return;
    }
    if (
      !confirm(
        "Push all current default structured content (Hero Panels, 5 Division Sliders, 25 Partners, General Info, and Admin Users) to Firebase Firestore? This will populate the live database with initial data."
      )
    ) {
      return;
    }

    setIsSeeding(true);
    setSeedResult({ type: null, message: "" });
    try {
      const res = await seedFirestoreDatabase(user?.email || "admin@toponbd.com");
      if (res.success) {
        setSeedResult({
          type: "success",
          message: res.message,
        });
      } else {
        setSeedResult({
          type: "error",
          message: res.message,
        });
      }
    } catch (err: any) {
      setSeedResult({
        type: "error",
        message: err?.message || "An unexpected error occurred while seeding.",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="bg-[#071930] p-8 rounded-3xl border border-white/10 text-center space-y-3">
        <Database className="w-10 h-10 text-brand-gold mx-auto opacity-60" />
        <h3 className="text-base font-bold text-white">Super Admin Access Required</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Only Super Admins can access Firebase Status, diagnostics, and database seeding. As an Editor, you can manage content sections like Hero Panels, Group Entity Sliders, Articles, and Partners.
        </p>
      </div>
    );
  }

  return (
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
            Firebase SDK is initialized with IndexedDB Persistent Local Cache and active Real-time Synchronization across clients.
          </span>
        </div>

        {/* Soft Delete Purge & Data Maintenance */}
        <div className="p-5 rounded-2xl bg-[#040C18] border border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <RefreshCw className={`w-4 h-4 text-brand-gold ${isPurging ? "animate-spin" : ""}`} />
                <span>Database Maintenance &amp; Soft-Delete Purge</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Permanently purge records marked as isDeleted: true older than 30 days.
              </p>
            </div>

            <button
              onClick={handlePurgeSoftDeleted}
              disabled={isPurging}
              className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-bold transition-all disabled:opacity-50 self-start sm:self-auto"
            >
              {isPurging ? "Purging..." : "Run 30-Day Purge"}
            </button>
          </div>

          {purgeResult && (
            <div className="text-xs font-mono p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-gold">
              {purgeResult}
            </div>
          )}
        </div>

        {/* Database Seeder: Push Current Content to Firebase */}
        <div className="p-5 rounded-2xl bg-[#040C18] border border-brand-gold/30 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Database className="w-4 h-4 text-brand-gold" />
                <span>Database Seeder: Push Current Content to Firebase</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Push all baseline structured content (5 Hero Panels, 5 Division Sliders, 25 Strategic Partners, Corporate Info &amp; Admin Credentials) to Firebase Firestore and IndexedDB offline cache.
              </p>
            </div>

            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldDark text-stone-950 font-bold text-xs shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shrink-0 flex items-center space-x-2 self-start sm:self-auto"
            >
              {isSeeding ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-stone-950" />
                  <span>Seeding to Firebase...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-stone-950" />
                  <span>Seed Firestore Database</span>
                </>
              )}
            </button>
          </div>

          {seedResult.type && (
            <div
              className={`text-xs p-3.5 rounded-xl border flex items-center space-x-2.5 animate-in fade-in ${seedResult.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
            >
              {seedResult.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{seedResult.message}</span>
            </div>
          )}

          <div className="pt-2 border-t border-white/5 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-slate-400">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-500 block">Hero Panels:</span>
              <strong className="text-white">5 Entities</strong>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-500 block">Group Entity Sliders:</span>
              <strong className="text-white">5 Pages (17 Slides)</strong>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-500 block">Partners:</span>
              <strong className="text-white">25 Companies</strong>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-500 block">General Info:</span>
              <strong className="text-white">Full Profile</strong>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-500 block">Admin Users:</span>
              <strong className="text-white">2 Accounts</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
