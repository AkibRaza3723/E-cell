import React from "react";
import { Header } from "@/components/header";
import { ZyroChat } from "@/components/zyro-chat";

export const metadata = {
  title: "Zyro — AI Entrepreneurship & Startup Guide | E-CELL JMI",
  description:
    "Explore entrepreneurship, learn core startup concepts, and discuss innovation with Zyro, powered by Amazon Bedrock at Jamia Millia Islamia.",
};

export default function ZyroPage() {
  return (
    <div className="relative h-[100dvh] max-h-[100dvh] flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden bg-[#09090b]">
      
      {/* Precision Dark AI Studio Atmosphere */}
      
      {/* 1. Subtle Deep Top Amber Aura */}
      <div className="pointer-events-none fixed -top-[160px] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1200px] h-[550px] rounded-full bg-gradient-to-b from-orange-500/12 via-amber-500/4 to-transparent blur-[140px] z-0" />

      {/* 2. Precision Radial Studio Dot Grid */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.22] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,#000_25%,transparent_90%)]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)"
        }}
      />

      {/* 3. Concentric Focal Horizon Arc */}
      <div className="pointer-events-none fixed top-[12%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full border border-white/[0.04] shadow-[0_0_80px_rgba(255,120,30,0.03)] z-0" />
      <div className="pointer-events-none fixed top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full border border-orange-500/[0.06] z-0" />

      {/* 4. Sub-Header Subtle Light Horizon Beam */}
      <div className="pointer-events-none fixed top-16 sm:top-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent z-10" />

      {/* Site Header */}
      <Header />

      {/* Main Expansive AI Workspace */}
      <main className="relative z-10 flex-1 flex flex-col min-h-0 pt-16 sm:pt-20">
        <ZyroChat />
      </main>
    </div>
  );
}
