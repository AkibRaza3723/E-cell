"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Shield, Rocket } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden nexora-bg-gradient pt-24 sm:pt-28 pb-4 sm:pb-6 flex flex-col justify-between">

      {/* Outer Enormous Glowing Orbital Ring Arc */}
      <div className="pointer-events-none absolute -top-[280px] -left-[200px] sm:-left-[350px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-75" />

      {/* Inner Thin Glowing Orbital Curve */}
      <div className="pointer-events-none absolute -top-[120px] left-[5%] sm:left-[12%] w-[700px] h-[700px] sm:w-[1020px] sm:h-[1020px] rounded-full orbital-ring-inner opacity-60" />

      {/* Radiant Sun/Planetary Horizon Halo behind Person Head */}
      <div className="pointer-events-none absolute top-[30%] left-1/2 -translate-x-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-40 blur-[100px]" />

      {/* Secondary Top Warm Ambient Highlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-72 bg-gradient-to-b from-amber-400/20 via-orange-500/10 to-transparent blur-3xl" />

      {/* Mountain Ridge & Dunes Silhouette (matching the crater horizon in reference) */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-44 sm:h-56 z-0 opacity-85">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Back distant mountain layer */}
          <path
            fill="#541200"
            opacity="0.65"
            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,186.7C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          {/* Front crater ridge layer */}
          <path
            fill="#2c0700"
            d="M0,224L60,218.7C120,213,240,203,360,213.3C480,224,600,256,720,250.7C840,245,960,203,1080,197.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Deep Ground Ambient Fade to integrate with footer/rest of page */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#070606] via-[#070606]/70 to-transparent z-20" />
      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        <div className="relative pt-2 text-center select-none">
          {/* Tracked Eyebrow Tag */}
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-2 sm:mb-3">
            NEXT GEN ENTREPRENEURSHIP &bull; VENTURE CELL
          </p>

          {/* Central Massive Headline (Matching Reference "VIRTUAL REALITY BEYOND LIMITS") */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black uppercase text-white tracking-tight leading-[0.92] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            VENTURE REALITY
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black uppercase text-white tracking-tight leading-[0.92] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] mt-1 sm:mt-2">
            BEYOND LIMITS
          </h2>
        </div>


        <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] flex items-center justify-center my-2 sm:my-3">

          {/* FLOATING 3D E-CELL EMBLEM WITH SYNCHRONIZED SHADOW & ANIMATION */}
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[520px] mx-auto flex flex-col items-center justify-center">
            {/* Ambient Dual-Tone Backlight Glow (Cyan Left / Orange Right) */}
            <div className="pointer-events-none absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-cyan-500/20 via-orange-500/30 to-amber-500/25 rounded-full blur-3xl opacity-60 animate-aura-pulse" />

            {/* Levitating Logo Image */}
            <div className="relative z-10 w-full flex items-center justify-center animate-levitate">
              <Image
                src="/images/ecelllogo.png"
                alt="E-Cell Emblem Logo"
                width={1000}
                height={520}
                priority
                className="w-full h-auto object-contain select-none ecell-logo-shadow transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>

            {/* Synchronized Ground Floating Shadow */}
            <div className="relative w-[75%] sm:w-[68%] h-5 sm:h-8 -mt-2 sm:-mt-4 pointer-events-none flex items-center justify-center">
              {/* Outer soft ambient diffusion shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/40 via-black/80 to-amber-950/50 rounded-[100%] blur-2xl animate-ground-shadow" />
              {/* Core deep contact occlusion shadow */}
              <div className="w-[82%] h-[72%] bg-black/90 rounded-[100%] blur-md animate-ground-shadow" />
            </div>
          </div>
          {/* CALLOUT 1: TOP LEFT (PRE-SEED CAPITAL) */}
          <div className="hidden lg:flex absolute top-12 left-4 xl:left-8 z-30 flex-col items-start max-w-[220px]">
            <div className="flex items-start gap-2.5 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-black/40 border border-orange-400/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading leading-tight">
                  PRE-SEED CAPITAL
                </h4>
                <p className="text-[10px] text-orange-100/90 leading-tight mt-1 font-medium">
                  Up to ₹50L non-dilutive grants to launch Day 0 prototypes.
                </p>
              </div>
            </div>

            {/* Connector Line pointing towards headset */}
            <div className="relative w-40 h-8 ml-5 pointer-events-none">
              <div className="w-full h-[1.5px] bg-gradient-to-r from-white/80 to-amber-200/80" />
              <div className="absolute right-0 top-0 w-[1.5px] h-full bg-amber-200/80" />
              <div className="absolute right-[-3px] bottom-[-3px] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#ffaa00]" />
            </div>
          </div>

          {/* CALLOUT 2: MID LEFT (VENTURE STUDIO) */}
          <div className="hidden lg:flex absolute top-[44%] left-6 xl:left-12 z-30 flex-col items-start max-w-[210px]">
            <div className="flex items-start gap-2.5 mb-1">
              <div className="w-10 h-10 rounded-xl bg-black/40 border border-orange-400/40 backdrop-blur-md flex items-center justify-center text-orange-400 shadow-lg shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading leading-tight">
                  VENTURE STUDIO
                </h4>
                <p className="text-[10px] text-orange-100/90 leading-tight mt-1 font-medium">
                  Full-stack tech stack, patent filing, & 1-on-1 EIR advisory.
                </p>
              </div>
            </div>

            {/* Horizontal Line with glowing node */}
            <div className="relative w-36 h-[1.5px] bg-gradient-to-r from-white/70 via-amber-200/80 to-transparent ml-5 mt-1 pointer-events-none flex items-center justify-end">
              <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#ffaa00]" />
            </div>
          </div>

          {/* CALLOUT 3: MID RIGHT (ANGEL SYNDICATE) */}
          <div className="hidden lg:flex absolute top-[36%] right-8 xl:right-14 z-30 flex-col items-end max-w-[220px] text-right">
            <div className="flex items-start gap-2.5 mb-1 flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-black/40 border border-orange-400/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading leading-tight">
                  ANGEL SYNDICATE
                </h4>
                <p className="text-[10px] text-orange-100/90 leading-tight mt-1 font-medium">
                  Direct pitch access to 40+ active VC funds & alumni angels.
                </p>
              </div>
            </div>

            {/* Horizontal Line with glowing node */}
            <div className="relative w-36 h-[1.5px] bg-gradient-to-l from-white/70 via-amber-200/80 to-transparent mr-5 mt-1 pointer-events-none flex items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#ffaa00]" />
            </div>
          </div>

        </div>
        <div className="relative z-30 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pt-2 pb-3">

          {/* BOTTOM LEFT: EXPLORE COHORTS CARD (Matching "EXPLORE NEW WORLDS" Card in Reference) */}
          <div className="w-full sm:w-auto bg-white/95 text-zinc-950 rounded-2xl p-3 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] backdrop-blur-md flex items-center gap-3.5 max-w-[340px] border border-white/40 transform -translate-y-[90%] md:-translate-x-[-25%] transition-transform duration-300">
            <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-black shrink-0">
              <Image
                src="/images/founder-portrait.jpg"
                alt="Cohort Founder"
                fill
                className="object-cover"
                sizes="80px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-black uppercase tracking-wider font-heading text-zinc-950 leading-tight truncate">
                EXPLORE COHORTS
              </h4>
              <p className="text-[10px] text-zinc-600 mt-0.5 leading-snug line-clamp-2">
                Step into high-growth student ventures with unmatched traction.
              </p>
            </div>
            <Link
              href="/startup"
              className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-950 bg-zinc-50 hover:bg-zinc-950 text-zinc-700 hover:text-white flex items-center justify-center transition-all shrink-0 shadow-sm"
              aria-label="Explore cohorts"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* BOTTOM RIGHT: METRICS PILL CARD (Matching "4K / 120° / <20ms" Card in Reference) */}
          <div className="w-full sm:w-auto bg-white/95 text-zinc-950 rounded-2xl px-5 sm:px-7 py-3 sm:py-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] backdrop-blur-md flex items-center justify-around sm:justify-start gap-4 sm:gap-7 divide-x divide-zinc-200 border border-white/40 transform -translate-y-[110%] md:translate-x-[1%] transition-transform duration-300">
            {/* Stat 1 */}
            <div className="text-left">
              <p className="text-lg sm:text-2xl font-black font-heading tracking-tight leading-none text-zinc-950">
                -
              </p>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase mt-1">
                Capital Raised
              </p>
            </div>

            {/* Stat 2 */}
            <div className="pl-4 sm:pl-7 text-left">
              <p className="text-lg sm:text-2xl font-black font-heading tracking-tight leading-none text-zinc-950">
                -
              </p>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase mt-1">
                Startups Funded
              </p>
            </div>

            {/* Stat 3 */}
            <div className="pl-4 sm:pl-7 text-left">
              <p className="text-lg sm:text-2xl font-black font-heading tracking-tight leading-none text-zinc-950">
                &lt; -
              </p>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase mt-1">
                Startups
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
