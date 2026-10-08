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
    setEmail("mamun@toponbd.com");
    setPassword("admin123456");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-brand-gold selection:text-brand-navy">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-brand-gold/15 via-amber-100/30 to-blue-50/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-10 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0B2240 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-goldDark text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Top On Group</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-brand-navy tracking-tight">
            Admin <span className="text-gold-gradient">Control Panel</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in with authorized corporate credentials
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-7 sm:p-8 rounded-3xl shadow-2xl shadow-slate-900/10 relative space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
              <h2 className="text-base font-bold text-brand-navy">Administrator Access</h2>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-goldDark border border-brand-gold/30 font-bold">
              v2.4 Live Sync
            </span>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5 animate-in fade-in zoom-in-95 duration-150">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block text-xs">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your User ID / e-mail"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:bg-white focus:outline-none transition-all font-mono text-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700 block text-xs">Password</label>
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
                  placeholder="Your Password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:bg-white focus:outline-none transition-all font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
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
                  className="rounded border-slate-300 bg-slate-50 text-brand-navy focus:ring-brand-gold"
                />
                <span className="text-xs text-slate-600">Remember session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-navy/25 hover:shadow-brand-gold/30 border border-brand-gold/40 hover:border-brand-gold transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-brand-navy transition-colors inline-flex items-center space-x-1 font-medium"
          >
            <span>← Return to Top On Group Homepage</span>
          </Link>
        </div>
      </div>

      {/* Bottom Right Very Big Logo Overlay */}
      <div className="fixed bottom-0 right-0 sm:bottom-2 sm:right-2 md:bottom-4 md:right-6 lg:bottom-6 lg:right-8 z-0 pointer-events-none select-none">
        <Link
          href="/"
          className="pointer-events-auto block transition-transform duration-500 hover:scale-105"
          title="Return to Top On Group Homepage"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] xl:w-[480px] xl:h-[480px] opacity-60 hover:opacity-90 transition-opacity duration-300 drop-shadow-md">
            <Image
              src="/images/logo/topon-group.png"
              alt="Top On Group Logo"
              fill
              quality={100}
              priority
              className="object-contain object-bottom-right"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
