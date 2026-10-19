"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowUpRight } from "lucide-react";

function ZyroFloatingButtonInner() {
  const pathname = usePathname();

  // Hide the floating button when already on the full Zyro page
  if (pathname === "/zyro") {
    return null;
  }

  return (
    <aside
      aria-label="Zyro AI Startup Advisor"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Desktop Quick Greeting Tooltip */}
      <Link
        href="/zyro"
        className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121216]/90 hover:bg-[#181820] border border-orange-500/30 hover:border-orange-500/60 text-white shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-200 group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-sans text-zinc-300 group-hover:text-white">
          Startup questions? <strong className="text-orange-400 font-semibold">Ask Zyro</strong>
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>

      {/* Main Floating Trigger Button */}
      <Link
        href="/zyro"
        aria-label="Open Zyro AI Startup Advisor"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_10px_45px_rgba(249,115,22,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0c0c0e]" />
        </div>
        
        <div className="flex flex-col text-left leading-none">
          <span className="font-heading font-black text-xs tracking-tight text-white uppercase group-hover:tracking-wider transition-all">
            Zyro AI
          </span>
          <span className="text-[9px] font-mono text-orange-100 font-medium">
            Advisor
          </span>
        </div>
      </Link>
    </aside>
  );
}

export function ZyroFloatingWidget() {
  return (
    <Suspense fallback={null}>
      <ZyroFloatingButtonInner />
    </Suspense>
  );
}
