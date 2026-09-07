"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Building2,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLogin() {
  const router = useRouter();
  const { user, login, isAuthenticated, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect straight to /admin
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/admin");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setErrorMessage(res.error || "Authentication failed. Please check your credentials.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@toponbd.com");
    setPassword("admin123456");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#020813] text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-brand-gold selection:text-brand-navy">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-gold/10 via-brand-navyLight/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-gold via-brand-goldLight to-brand-goldDark p-0.5 shadow-gold">
              <div className="w-full h-full bg-[#040C18] rounded-[14px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="text-left">
              <span className="block font-serif text-xl font-bold tracking-tight text-white">
                TOP ON GROUP
              </span>
              <span className="block text-[10px] tracking-widest text-brand-gold uppercase font-bold">
                Admin Secure Portal
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400">
            Sign in to manage company divisions, strategic partners, and global settings.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#071930]/90 backdrop-blur-xl border border-white/10 p-7 sm:p-8 rounded-3xl shadow-2xl shadow-black/80 relative space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
              <h2 className="text-base font-bold text-white">Administrator Access</h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-bold">
              v2.4 Live Sync
            </span>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2.5 animate-in fade-in zoom-in-95 duration-150">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block text-xs">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@toponbd.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#040C18] border border-white/15 text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none transition-all font-mono text-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300 block text-xs">Password</label>
                <span className="text-[11px] text-brand-gold/80 hover:text-brand-gold cursor-pointer" onClick={fillDemoCredentials}>
                  Use Demo Login
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#040C18] border border-white/15 text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none transition-all font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-[#040C18] text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-xs text-slate-400">Remember session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-navy font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-gold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Pill */}
          <div className="pt-2 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-brand-gold" />
              <span>Fill Default Admin Credentials</span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-brand-gold transition-colors inline-flex items-center space-x-1"
          >
            <span>← Return to Top On Group Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
