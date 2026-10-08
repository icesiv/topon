"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { subscribeAdminUsers, saveAdminUsers } from "@/lib/adminUsers";
import { UserCog, Key, X, CheckCircle2, AlertTriangle } from "lucide-react";

interface AdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPasswordModal: () => void;
}

export default function AdminProfileModal({
  isOpen,
  onClose,
  onOpenPasswordModal,
}: AdminProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [profileNameInput, setProfileNameInput] = useState(user?.displayName || "");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileStatus, setProfileStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (user?.displayName) {
      setProfileNameInput(user.displayName);
    }
  }, [user?.displayName]);

  if (!isOpen) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileNameInput.trim()) {
      setProfileStatus({
        type: "error",
        message: "Display name cannot be empty.",
      });
      return;
    }

    setIsUpdatingProfile(true);
    setProfileStatus({ type: null, message: "" });

    try {
      const res = await updateProfile(profileNameInput.trim());
      if (res.success) {
        // Also update name in adminUsers table if applicable
        if (user?.email) {
          const unsub = subscribeAdminUsers(async (users) => {
            if (unsub) unsub();
            const updatedUsers = users.map((u) =>
              u.email.toLowerCase() === user.email?.toLowerCase()
                ? { ...u, name: profileNameInput.trim() }
                : u
            );
            await saveAdminUsers(updatedUsers, user.email || undefined);
          });
        }

        setProfileStatus({
          type: "success",
          message: "Profile updated successfully!",
        });
        setTimeout(() => {
          onClose();
          setProfileStatus({ type: null, message: "" });
        }, 1200);
      } else {
        setProfileStatus({
          type: "error",
          message: res.error || "Failed to update profile.",
        });
      }
    } catch (err: any) {
      setProfileStatus({
        type: "error",
        message: err?.message || "An error occurred while updating profile.",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#071930] border border-brand-gold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-base font-bold text-white flex items-center space-x-2">
            <UserCog className="w-5 h-5 text-brand-gold" />
            <span>Edit Admin Profile</span>
          </h4>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {profileStatus.message && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${profileStatus.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-200"
              : "bg-red-500/15 border border-red-500/30 text-red-200"
              }`}
          >
            {profileStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>{profileStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#040C18] border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-lg flex-shrink-0">
              {user?.email ? user.email.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-sm truncate">
                {user?.displayName || "Admin User"}
              </div>
              <div className="text-xs font-mono text-brand-gold truncate">
                {user?.email || "admin@toponbd.com"}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                Role: <span className="text-slate-200 font-semibold">{user?.role || "Super Admin"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">Display Name</label>
            <input
              type="text"
              required
              value={profileNameInput}
              onChange={(e) => setProfileNameInput(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">Account Email</label>
            <input
              type="email"
              disabled
              value={user?.email || "admin@toponbd.com"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed font-mono"
            />
            <span className="text-[10px] text-slate-500">Email is associated with your authenticated credentials.</span>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPasswordModal();
              }}
              className="inline-flex items-center space-x-1.5 text-xs text-brand-gold hover:text-brand-goldLight underline"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Change Password instead?</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all disabled:opacity-50"
              >
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
