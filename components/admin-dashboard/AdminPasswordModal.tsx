"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Key, X, CheckCircle2, AlertTriangle } from "lucide-react";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPasswordModal({ isOpen, onClose }: AdminPasswordModalProps) {
  const { changePassword } = useAuth();
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  if (!isOpen) return null;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.length < 6) {
      setPasswordStatus({
        type: "error",
        message: "New password must be at least 6 characters long.",
      });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordStatus({
        type: "error",
        message: "New passwords do not match. Please re-type carefully.",
      });
      return;
    }

    setIsChangingPassword(true);
    setPasswordStatus({ type: null, message: "" });

    try {
      const res = await changePassword(currentPasswordInput, newPasswordInput);
      if (res.success) {
        setPasswordStatus({
          type: "success",
          message: "Password updated successfully!",
        });
        setCurrentPasswordInput("");
        setNewPasswordInput("");
        setConfirmPasswordInput("");
        setTimeout(() => {
          onClose();
          setPasswordStatus({ type: null, message: "" });
        }, 1500);
      } else {
        setPasswordStatus({
          type: "error",
          message: res.error || "Failed to change password.",
        });
      }
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        message: err?.message || "An error occurred while updating password.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#071930] border border-brand-gold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-base font-bold text-white flex items-center space-x-2">
            <Key className="w-5 h-5 text-brand-gold" />
            <span>Change Password</span>
          </h4>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {passwordStatus.message && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${passwordStatus.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-200"
              : "bg-red-500/15 border border-red-500/30 text-red-200"
              }`}
          >
            {passwordStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">Current Password</label>
            <input
              type="password"
              required
              value={currentPasswordInput}
              onChange={(e) => setCurrentPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">New Password</label>
            <input
              type="password"
              required
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all disabled:opacity-50"
            >
              {isChangingPassword ? "Updating..." : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
