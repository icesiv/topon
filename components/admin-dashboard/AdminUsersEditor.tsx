"use client";

import { useState, useEffect } from "react";
import {
  AdminUser,
  fetchAdminUsers,
  saveAdminUsers,
  subscribeAdminUsers,
} from "@/lib/adminUsers";
import { useAuth } from "@/lib/auth-context";
import {
  Shield,
  UserPlus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock,
  Lock,
  Radio,
} from "lucide-react";

interface AdminUsersEditorProps {
  isSuperAdmin?: boolean;
}

export default function AdminUsersEditor({ isSuperAdmin = true }: AdminUsersEditorProps) {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [newUser, setNewUser] = useState<Omit<AdminUser, "id" | "createdAt">>({
    name: "",
    email: "",
    role: "Editor",
    status: "Active",
    password: "",
  });
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Subscribe to live Firestore changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const unsub = subscribeAdminUsers((data) => {
      if (isMounted) {
        setUsers(data);
        setIsLoading(false);
      }
    });

    // Also trigger immediate fresh fetch to avoid any stale cache
    fetchAdminUsers(false)
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setUsers(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
      if (unsub) unsub();
    };
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const liveData = await fetchAdminUsers(false);
      setUsers(liveData);
      setSaveStatus({
        type: "success",
        message: `Successfully synchronized ${liveData.length} administrator records from Firebase.`,
      });
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "Failed to sync with Firebase.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert("Only Super Admins have permission to add new users.");
      return;
    }
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    const normalizedEmail = newUser.email.trim().toLowerCase();

    // Check for duplicate email
    if (users.some((u) => u.email.trim().toLowerCase() === normalizedEmail && !u.isDeleted)) {
      setSaveStatus({
        type: "error",
        message: `An administrator with email "${newUser.email.trim()}" already exists.`,
      });
      return;
    }

    setIsSaving(true);

    const created: AdminUser = {
      ...newUser,
      name: newUser.name.trim(),
      email: normalizedEmail,
      id: `admin_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      password: newUser.password?.trim() || undefined,
    };

    const updated = [...users, created];

    const res = await saveAdminUsers(updated, user?.email || undefined);

    if (res.success) {
      setUsers(updated);
      setIsAddUserOpen(false);
      setNewUser({ name: "", email: "", role: "Editor", status: "Active", password: "" });
      setSaveStatus({
        type: "success",
        message: `Admin user "${created.name}" created and synced to Firebase! This user can now log in.`,
      });
    } else {
      setSaveStatus({
        type: "error",
        message: res.error || "Failed to save user to Firebase Firestore.",
      });
      // Refresh from live DB to revert
      const refreshed = await fetchAdminUsers(false);
      setUsers(refreshed);
    }

    setIsSaving(false);
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert("Only Super Admins have permission to edit users.");
      return;
    }
    if (!editingUser) return;
    if (!editingUser.name.trim() || !editingUser.email.trim()) return;

    const normalizedEmail = editingUser.email.trim().toLowerCase();

    // Check duplicate email against other users
    const duplicate = users.find(
      (u) =>
        u.id !== editingUser.id &&
        u.email.trim().toLowerCase() === normalizedEmail &&
        !u.isDeleted
    );
    if (duplicate) {
      setSaveStatus({
        type: "error",
        message: `Another administrator already uses email "${editingUser.email}".`,
      });
      return;
    }

    setIsSaving(true);

    const existing = users.find((u) => u.id === editingUser.id);
    const newPassword = editingUser.password?.trim();
    const cleanedUser: AdminUser = {
      ...editingUser,
      name: editingUser.name.trim(),
      email: normalizedEmail,
      password: newPassword ? newPassword : (existing?.password || undefined),
      updatedAt: new Date().toISOString(),
    };

    const updated = users.map((u) => (u.id === cleanedUser.id ? cleanedUser : u));

    const res = await saveAdminUsers(updated, user?.email || undefined);

    if (res.success) {
      setUsers(updated);
      setEditingUser(null);
      setSaveStatus({
        type: "success",
        message: `Admin user "${cleanedUser.name}" updated successfully in Firebase!`,
      });
    } else {
      setSaveStatus({
        type: "error",
        message: res.error || "Failed to update user in Firebase.",
      });
      const refreshed = await fetchAdminUsers(false);
      setUsers(refreshed);
    }

    setIsSaving(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!isSuperAdmin) {
      alert("Only Super Admins have permission to delete users.");
      return;
    }

    const activeAdmins = users.filter((u) => !u.isDeleted);
    if (activeAdmins.length <= 1) {
      alert("Cannot delete user: At least one active Super Admin must remain in the system.");
      return;
    }

    const targetUser = users.find((u) => u.id === userId);

    if (
      user?.email &&
      targetUser?.email.toLowerCase() === user.email.toLowerCase()
    ) {
      if (!confirm("Warning: You are deleting your own admin account. You will lose access to the system. Continue?")) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to remove administrator "${targetUser?.name || "this user"}"? They will no longer be able to log in.`)) {
        return;
      }
    }

    setIsSaving(true);
    const updated = users.filter((u) => u.id !== userId);

    const res = await saveAdminUsers(updated, user?.email || undefined);

    if (res.success) {
      setUsers(updated);
      setSaveStatus({
        type: "success",
        message: `Admin user "${targetUser?.name || "Member"}" removed from Firebase. Access has been revoked.`,
      });
    } else {
      setSaveStatus({
        type: "error",
        message: res.error || "Failed to delete user from Firebase.",
      });
      const refreshed = await fetchAdminUsers(false);
      setUsers(refreshed);
    }

    setIsSaving(false);
  };

  if (!isSuperAdmin) {
    return (
      <div className="bg-[#071930] p-8 rounded-3xl border border-white/10 text-center space-y-3">
        <Shield className="w-10 h-10 text-brand-gold mx-auto opacity-60" />
        <h3 className="text-base font-bold text-white">Super Admin Access Required</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Only Super Admins can add, edit, or delete administrative users. As an Editor, you can manage content sections like Hero Panels, Group Entity Sliders, Articles, and Partners.
        </p>
      </div>
    );
  }

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
            className="text-xs opacity-70 hover:opacity-100 underline ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleManualSync}
              disabled={isSyncing || isLoading}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              title="Force re-sync directly from live Firebase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-brand-gold" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync with Firebase"}</span>
            </button>

            <button
              onClick={() => setIsAddUserOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs flex items-center space-x-2 shadow-gold transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* User List Table */}
        {isLoading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading authorized administrators from Firebase...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-[#040C18] rounded-2xl border border-white/5">
            <Shield className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-white">No Administrator Accounts Found</p>
            <p className="text-xs text-slate-400">
              Click &quot;Sync with Firebase&quot; or &quot;Add Member&quot; to initialize admin accounts.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-xs flex-shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate">{u.name}</div>
                        {u.email.toLowerCase() === user?.email?.toLowerCase() && (
                          <span className="text-[10px] text-brand-gold font-mono">(You)</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${u.role === "Super Admin"
                          ? "bg-brand-gold/15 border-brand-gold/30 text-brand-gold"
                          : "bg-sky-500/15 border-sky-500/30 text-sky-400"
                          }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center space-x-1.5 text-xs font-medium ${u.status === "Active"
                          ? "text-emerald-400"
                          : u.status === "Pending"
                            ? "text-amber-400"
                            : "text-rose-400"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${u.status === "Active"
                            ? "bg-emerald-400"
                            : u.status === "Pending"
                              ? "bg-amber-400"
                              : "bg-rose-400"
                            }`}
                        />
                        <span>{u.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">
                      <span className="inline-flex items-center space-x-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{u.lastLogin || "Never"}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setEditingUser({ ...u, password: "" })}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Edit Admin"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={isSaving}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors disabled:opacity-40"
                          title="Delete Admin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071930] border border-brand-gold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-brand-gold" />
                <span>Add Authorized Administrator</span>
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
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Email Address (Login ID)</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="name@toponbd.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  This user will be authorized to log in using this email address.
                </p>
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
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Editor">Editor (Content Management Only)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser({ ...newUser, status: e.target.value as AdminUser["status"] })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                >
                  <option value="Active">Active (Permitted to Log In)</option>
                  <option value="Pending">Pending (Awaiting Approval)</option>
                  <option value="Suspended">Suspended (Login Blocked)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">
                  Custom Password <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="password"
                  value={newUser.password || ""}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Leave blank to use default admin password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono text-xs"
                />
                <p className="text-[10px] text-slate-400">
                  Standard passwords like admin123456 / topon2026 are also accepted.
                </p>
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
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold disabled:opacity-50"
                >
                  {isSaving ? "Saving to Firebase..." : "Create & Authorize User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071930] border border-brand-gold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <Pencil className="w-5 h-5 text-brand-gold" />
                <span>Edit Administrator</span>
              </h4>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Email Address (Login ID)</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="your mail"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value as AdminUser["role"] })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Editor">Editor (Content Management Only)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, status: e.target.value as AdminUser["status"] })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none"
                >
                  <option value="Active">Active (Permitted to Log In)</option>
                  <option value="Pending">Pending (Awaiting Approval)</option>
                  <option value="Suspended">Suspended (Login Blocked)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">
                  Custom Password <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="password"
                  value={editingUser.password || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  placeholder="Leave blank to keep existing password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save & Sync to Firebase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
