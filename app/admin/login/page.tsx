"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import { verifyAdminEmailStatus } from "@/lib/admin-auth";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  User,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "first_time">("signin");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // 1. Server-side whitelist & existence pre-check
    const status = await verifyAdminEmailStatus(cleanEmail);
    if (!status.allowed) {
      setError(
        status.message ||
          "This email is not authorized for administrator access. Only authorized emails can access the portal."
      );
      setLoading(false);
      return;
    }

    if (status.hasPassword === false) {
      setError(
        "No password has been set yet for this admin account. Please switch to the 'First-Time Setup' tab to create your password."
      );
      setLoading(false);
      return;
    }

    // 2. Perform sign in with Better Auth
    try {
      const res = await signIn.email({
        email: cleanEmail,
        password: password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err?.message || "Failed to sign in. Please verify your credentials.");
      setLoading(false);
    }
  };

  const handleFirstTimeSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      setError("Please enter your name.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // 1. Verify email against ADMIN_EMAILS whitelist and check whether already created
    const status = await verifyAdminEmailStatus(cleanEmail);
    if (!status.allowed) {
      setError(
        status.message ||
          "This email is not authorized for administrator access."
      );
      setLoading(false);
      return;
    }

    if (status.hasPassword) {
      setError(
        "A password has already been established for this administrator account. Please use the 'Sign In' tab."
      );
      setLoading(false);
      return;
    }

    // 2. Create the account and set the password
    try {
      const res = await signUp.email({
        email: cleanEmail,
        password: password,
        name: name.trim(),
      });

      if (res.error) {
        setError(res.error.message || "Failed to create administrator password.");
        setLoading(false);
        return;
      }

      setSuccess("Password set successfully! Logging you in...");
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      console.error("Setup error:", err);
      setError(err?.message || "An unexpected error occurred during password setup.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-3">
            <span className="font-heading font-extrabold tracking-tight text-3xl text-white">
              E-CELL<span className="text-orange-500">.</span>
            </span>
          </Link>

          <div className="flex items-center justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/25 tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> Whitelisted Admin Access
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Society Admin Portal
          </h1>
          <p className="mt-1.5 text-xs text-zinc-400 max-w-sm mx-auto">
            Restricted to pre-authorized administrative emails configured in the environment.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="relative rounded-2xl bg-zinc-950/80 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
          {/* Subtle top amber highlight */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          {/* Tab Switcher */}
          <div className="flex items-center bg-white/[0.03] border border-white/10 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("signin");
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "signin"
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("first_time");
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "first_time"
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              First-Time Setup
            </button>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs leading-relaxed">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Authorized Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ecelljmi.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(234,88,12,0.35)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: FIRST-TIME SETUP */}
          {activeTab === "first_time" && (
            <form onSubmit={handleFirstTimeSetup} className="space-y-4">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 leading-relaxed">
                If your email is in <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">ADMIN_EMAILS</code>, set your password below. You will use this password to sign in thereafter.
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Authorized Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ecelljmi.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lead Administrator"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Choose New Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(234,88,12,0.35)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Set Password & Enter Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
