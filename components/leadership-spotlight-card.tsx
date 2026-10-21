"use client";

import React, { useRef, useState } from "react";
import { Mail } from "lucide-react";
import { LinkedInIcon, TwitterXIcon } from "@/components/icons";
import { normalizeGoogleDriveUrl } from "@/lib/utils";

export interface LeaderData {
  id: string;
  index: string;
  slug: string;
  role: string;
  roleCategory: string;
  name: string;
  batch: string;
  faculty: string;
  quote: string;
  focusAreas: string[];
  initials: string;
  avatar?: string;
  Avatar?: string;
  image?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export function LeadershipSpotlightCard({ leader }: { leader: LeaderData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const avatarUrl = normalizeGoogleDriveUrl((leader.avatar || leader.Avatar || leader.image)?.trim());

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-[2rem] p-6 sm:p-8 lg:p-10 bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(255,120,30,0.15)] transition-all duration-500 overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 130, 20, 0.18), transparent 50%)`
            : "none",
        }}
      />

      {/* Subtle Specular Top Rim */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Main Content Layout: Details LEFT, Image Placeholder RIGHT */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-stretch gap-8 lg:gap-12">
        
        {/* =========================================================
            LEFT COLUMN: Refined Editorial Details
            ========================================================= */}
        <div className="w-full lg:w-3/5 flex flex-col justify-between">
          <div>
            {/* Meta Header Tag Row */}
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-white/50 mb-3 select-none">
              <span className="text-amber-400 font-bold">{leader.index}</span>
              <span className="text-white/20">/</span>
              <span className="text-orange-200/90 font-semibold">{leader.roleCategory}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified
              </span>
            </div>

            {/* Leader Name */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white tracking-tight leading-tight group-hover:text-amber-100 transition-colors">
              {leader.name}
            </h2>

            {/* Official Designation */}
            <p className="text-sm sm:text-base font-semibold text-amber-300 font-mono tracking-wide mt-1 mb-2">
              {leader.role}
            </p>

            {/* Academic Department & Tenure */}
            <p className="text-xs sm:text-sm text-white/60 font-mono mb-6">
              {leader.faculty} &bull; {leader.batch}
            </p>

            {/* Vision Quote / Philosophy */}
            <div className="relative pl-4 border-l border-amber-400/60 my-6 py-1">
              <p className="text-sm sm:text-base text-zinc-200 font-serif italic leading-relaxed">
                &ldquo;{leader.quote}&rdquo;
              </p>
            </div>

            {/* Core Domain Pills */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {leader.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80 text-xs font-mono tracking-wide backdrop-blur-sm group-hover:border-white/20 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Interactive Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Social Channels */}
            <div className="flex items-center gap-2">
              {leader.socials.linkedin && (
                <a
                  href={leader.socials.linkedin.startsWith("http") ? leader.socials.linkedin : `https://${leader.socials.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${leader.name} LinkedIn`}
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all duration-200 active:scale-95"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {leader.socials.twitter && (
                <a
                  href={leader.socials.twitter.startsWith("http") ? leader.socials.twitter : `https://${leader.socials.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${leader.name} Twitter/X`}
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all duration-200 active:scale-95"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              )}
              {leader.socials.email && (
                <a
                  href={leader.socials.email.startsWith("mailto:") ? leader.socials.email : `mailto:${leader.socials.email}`}
                  aria-label={`Email ${leader.name}`}
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all duration-200 active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-[1.75rem] bg-gradient-to-b from-white/[0.08] via-black/40 to-black/80 border border-white/15 p-4 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-amber-400/40 transition-all duration-500">
            {avatarUrl && !imageError ? (
              <>
                {/* Full portrait image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={avatarUrl}
                    alt={leader.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 brightness-110 contrast-100"
                  />
                  {/* Subtle bottom scrim only for coordinate legibility, keeping the portrait bright */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  {/* Subtle sunset glow ambient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
                </div>

                {/* Top Corner Accents */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                    [ {leader.index} ]
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-amber-300 font-semibold">
                    {leader.roleCategory}
                  </span>
                </div>

                {/* Lower Badge */}
                <div className="relative z-10 mt-auto mb-2 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white/90 flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Executive Pass</span>
                  </div>
                </div>

                {/* Architectural Bottom Coordinates */}
                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-white/70 tracking-widest uppercase pt-2 border-t border-white/15 backdrop-blur-sm">
                  <span>E-CELL &bull; JMI</span>
                  <span>28.5616&deg; N, 77.2802&deg; E</span>
                </div>
              </>
            ) : (
              <>
                {/* Background Ambient Radial Glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_var(--tw-gradient-stops))] from-amber-500/15 via-orange-600/5 to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Architectural Grid Corner Accents */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  <span>[ {leader.index} ]</span>
                  <span className="text-amber-400/60 font-semibold">{leader.roleCategory}</span>
                </div>

                {/* Center Monogram Insignia */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center">
                    
                    {/* Thin Orbital Rings */}
                    <div className="absolute inset-0 rounded-full border border-white/15 group-hover:border-amber-400/40 transition-colors duration-500" />
                    <div className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:border-amber-400/20 animate-spin-slow transition-colors" />
                    
                    {/* Core Monogram */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-white/[0.08] to-black/60 border border-white/20 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-500">
                      <span className="text-3xl sm:text-4xl font-heading font-black tracking-widest text-white drop-shadow-md">
                        {leader.initials}
                      </span>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="mt-4 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white/60">
                    Official Portrait Placeholder
                  </div>
                </div>

                {/* Architectural Bottom Coordinates */}
                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-white/30 tracking-widest uppercase pt-2 border-t border-white/5">
                  <span>E-CELL &bull; JMI</span>
                  <span>28.5616&deg; N, 77.2802&deg; E</span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </article>
  );
}
