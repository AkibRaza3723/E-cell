"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight, ExternalLink, Rocket, User, Tag, Globe, Sparkles } from "lucide-react";

export interface DbStartup {
  id: string;
  name: string;
  slug: string;
  description: string;
  website?: string | null;
  logo?: string | null;
  founder?: string | null;
  category?: string | null;
  published: boolean;
  createdAt: Date;
}

const ACCENT_COLORS = ["#ff6a00", "#f59e0b", "#f97316", "#e11d48", "#10b981", "#3b82f6"];

export function StartupShowcase({ initialStartups = [] }: { initialStartups?: DbStartup[] }) {
  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const startups = initialStartups;
  const currentStartup = startups[active] || null;
  const accent = currentStartup ? ACCENT_COLORS[active % ACCENT_COLORS.length] : "#ff6a00";

  const animateIndicator = useCallback(
    (idx: number) => {
      if (!indicatorRef.current || startups.length === 0) return;
      gsap.to(indicatorRef.current, {
        left: `${(idx / startups.length) * 100}%`,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [startups.length]
  );

  useEffect(() => {
    if (!contentRef.current || !currentStartup) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, [active, currentStartup]);

  const select = (idx: number) => {
    if (idx === active) return;
    setActive(idx);
    animateIndicator(idx);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="text-center max-w-4xl mx-auto mb-14 sm:mb-18 select-none">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-3">
          NEXT GEN ENTREPRENEURSHIP &bull; STARTUPS
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.94] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          OUR STARTUPS
        </h1>
        <p className="text-lg sm:text-2xl font-extrabold uppercase text-amber-200 tracking-tight leading-tight font-heading drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] mt-3">
          INNOVATION BRED ON CAMPUS, SCALED GLOBALLY
        </p>
        <p className="text-sm sm:text-base text-white/85 font-sans max-w-2xl mx-auto mt-4 leading-relaxed">
          Student-built ventures incubated and accelerated through the Entrepreneurship Cell at Jamia Millia Islamia.
        </p>
      </header>

      {/* When no startups exist in DB */}
      {startups.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-20 px-6 sm:px-12 rounded-[2rem] bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-amber-300 mx-auto mb-6 shadow-inner">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight mb-3">
            No Ventures Listed Yet
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-md mx-auto mb-8 font-sans">
            Startups incubated and supported by E-Cell JMI will be featured here once added through the Admin Portal.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Incubation Pipeline Active &bull; Jamia Millia Islamia</span>
          </div>
        </div>
      ) : (
        <>
          {/* Multi-Panel Selector */}
          <div className="relative mb-10">
            <div className="relative h-px bg-white/15 mb-4">
              <div
                ref={indicatorRef}
                className="absolute top-[-1px] h-[2px] rounded-full"
                style={{
                  width: `${100 / startups.length}%`,
                  background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                  boxShadow: `0 0 14px ${accent}`,
                  left: 0,
                }}
              />
            </div>

            <div
              className={`grid gap-4 ${
                startups.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : startups.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {startups.map((st, idx) => {
                const isActive = idx === active;
                const itemAccent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                return (
                  <button
                    key={st.id}
                    onClick={() => select(idx)}
                    className={`relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden group backdrop-blur-2xl ${
                      isActive
                        ? "border-orange-500/50 bg-black/85 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)] ring-1 ring-orange-500/30"
                        : "border-white/15 bg-black/70 hover:border-white/30 hover:bg-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    }`}
                  >
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                          style={
                            isActive
                              ? {
                                  background: `${itemAccent}22`,
                                  color: itemAccent,
                                  border: `1px solid ${itemAccent}44`,
                                }
                              : {
                                  background: "#ffffff0d",
                                  color: "#d4d4d8",
                                  border: "1px solid #ffffff15",
                                }
                          }
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        {isActive && (
                          <span
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ background: itemAccent, boxShadow: `0 0 8px ${itemAccent}` }}
                          />
                        )}
                      </div>

                      <div>
                        <h3
                          className={`font-heading font-black text-xl sm:text-2xl tracking-tight uppercase ${
                            isActive ? "text-white" : "text-zinc-200 group-hover:text-white"
                          } transition-colors`}
                        >
                          {st.name}
                        </h3>
                        {st.category && (
                          <p className="mt-1 text-[11px] font-mono uppercase tracking-wider text-amber-200/80">
                            {st.category}
                          </p>
                        )}
                      </div>

                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isActive ? "text-zinc-200" : "text-white/70"
                        }`}
                      >
                        {st.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono">
                        <span className="text-white/50">{st.founder ? `By ${st.founder}` : "E-Cell Incubated"}</span>
                        <span
                          className="font-bold uppercase tracking-wider"
                          style={{ color: isActive ? itemAccent : "#d4d4d8" }}
                        >
                          {isActive ? "↓ Active" : "View →"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Startup Detailed Spotlight */}
          {currentStartup && (
            <div ref={contentRef} key={currentStartup.id} className="space-y-6">
              <div className="relative rounded-[2rem] overflow-hidden border border-white/15 bg-black/75 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]">
                {/* Top Glowing Edge */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}66, transparent)` }}
                />

                <div className="relative z-10 p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-full border"
                        style={{ color: accent, borderColor: `${accent}44`, background: `${accent}0d` }}
                      >
                        {currentStartup.category || "Incubated Venture"}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Inducted &bull; Jamia Millia Islamia
                      </span>
                    </div>

                    <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none">
                      {currentStartup.name}
                    </h2>

                    <p className="text-zinc-200 text-sm sm:text-base max-w-3xl leading-relaxed font-sans">
                      {currentStartup.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      {currentStartup.founder && (
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-white/90">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span>Founder: {currentStartup.founder}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active Venture</span>
                      </div>
                    </div>
                  </div>

                  {currentStartup.logo && (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-black/60 border border-white/15 p-3 flex items-center justify-center shrink-0 shadow-lg">
                      <img
                        src={currentStartup.logo}
                        alt={currentStartup.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Action Strip */}
                <div className="relative z-10 border-t border-white/10 px-7 sm:px-10 py-4 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-zinc-400 font-mono">
                    Official Venture ID &bull; {currentStartup.slug}
                  </p>
                  <div className="flex items-center gap-3">
                    {currentStartup.website && (
                      <a
                        href={
                          currentStartup.website.startsWith("http")
                            ? currentStartup.website
                            : `https://${currentStartup.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white border border-white/15 hover:border-white/30 px-5 py-2.5 rounded-full transition-colors bg-white/[0.04]"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-5 py-2.5 rounded-full glow-orange-button hover:scale-[1.03] transition-transform uppercase tracking-wider"
                    >
                      <span>Connect Venture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
