"use client";

import React, { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { normalizeGoogleDriveUrl } from "@/lib/utils";

interface HangingIdCardProps {
  member: {
    id: string;
    slug: string;
    name: string;
    role: string;
    team: string;
    faculty: string;
    batch: string;
    Avatar?: string;
    avatar?: string;
    image?: string;
  };
}

export function HangingIdCard({ member }: HangingIdCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [crossOriginMode, setCrossOriginMode] = useState<"anonymous" | undefined>("anonymous");
  const [imageError, setImageError] = useState(false);

  const rawAvatar = member.Avatar || member.avatar || member.image;
  const avatarUrl = normalizeGoogleDriveUrl(rawAvatar);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isDownloading) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      // Brief pause to allow tilt/hover styling to normalize before capturing snapshot
      await new Promise((resolve) => setTimeout(resolve, 80));
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "transparent",
        cacheBust: crossOriginMode === "anonymous",
      });

      const link = document.createElement("a");
      link.download = `${member.slug || "ecell"}-id-card.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download ID card:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Get initials for fallback placeholder
  const initials = member.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative flex flex-col items-center pt-2 sm:pt-4 select-none w-full">
      
      {/* LANYARD STRAP (Hanging down from top) */}
      <div className="relative flex flex-col items-center z-10 -mb-2">
        {/* Woven Fabric Strap */}
        <div className="w-9 sm:w-10 h-20 sm:h-24 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 rounded-t-sm shadow-xl relative overflow-hidden flex justify-center border-x border-black/40">
          <div className="w-1.5 h-full bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-[0_0_8px_rgba(255,100,0,0.8)]" />
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_4px)]" />
        </div>

        {/* Metal Carabiner / Ring Clasp */}
        <div className="relative -mt-1 flex flex-col items-center z-20">
          <div className="w-5 h-5 rounded-full border-2 border-zinc-400 bg-zinc-800 shadow-md" />
          <div className="w-7 h-6 rounded-md bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 border border-zinc-400 shadow-lg -mt-2.5 flex items-center justify-center">
            <div className="w-4 h-1.5 rounded-sm bg-zinc-950 border border-zinc-600" />
          </div>
          <div className="w-3 h-3 bg-zinc-900 border border-zinc-600 rounded-sm -mt-1" />
        </div>
      </div>

      {/* HANGING BADGE CARD */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`w-full max-w-[340px] sm:max-w-[365px] transition-transform duration-200 ease-out ${
          !isHovered && !isDownloading ? "animate-lanyard-sway" : ""
        }`}
        style={{
          transform: isHovered && !isDownloading
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : undefined,
          transformOrigin: "top center",
        }}
      >
        <div className="relative bg-white text-zinc-950 rounded-[1.75rem] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7),0_0_50px_rgba(255,100,0,0.25)] border border-zinc-200/90 overflow-hidden flex flex-col">
          
          {/* Slot Punch Hole near Top Center where clip hooks in */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30">
            <div className="w-9 h-2.5 rounded-full bg-zinc-900 border border-zinc-300/40 shadow-inner" />
          </div>

          {/* TOP HEADER BAR */}
          <div className="pt-6 pb-2.5 px-4 sm:px-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/60">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-heading font-black tracking-wider uppercase text-zinc-900">
                E-CELL JMI
              </span>
              <span className="px-1.5 py-0.5 rounded border border-zinc-300 bg-white text-[10px] font-mono font-bold text-zinc-700">
                2026
              </span>
            </div>
          </div> 

          {/* MAIN BODY: Left Vertical Spine + Large Avatar Center */}
          <div className="flex flex-1">
            
            {/* Left Vertical Spine (OFFICIAL MEMBER PASS) */}
            <div className="w-7 sm:w-8 border-r border-zinc-200 flex items-center justify-center bg-zinc-50/40 select-none py-6 shrink-0">
              <span
                className="text-[9px] font-mono tracking-[0.28em] uppercase text-zinc-400 whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                OFFICIAL MEMBER PASS
              </span>
            </div>

            {/* Center Area: Large Avatar Container */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col items-center justify-center">
              {avatarUrl && !imageError ? (
                <div className="w-full aspect-[4/4.5] rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
                  <img
                    key={`${avatarUrl}-${crossOriginMode}`}
                    src={avatarUrl}
                    alt={member.name}
                    crossOrigin={crossOriginMode}
                    onError={() => {
                      // If blocked by strict CORS header requirements, retry without CORS mode
                      if (crossOriginMode === "anonymous") {
                        setCrossOriginMode(undefined);
                      } else {
                        setImageError(true);
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/4.5] rounded-2xl bg-gradient-to-tr from-orange-500/10 via-amber-400/15 to-orange-600/10 border border-zinc-200 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-orange-500/20 via-amber-400/20 to-orange-600/30 border border-orange-500/40 flex items-center justify-center shadow-sm mb-2">
                    <span className="text-3xl sm:text-4xl font-heading font-black text-orange-600 font-mono tracking-wider">
                      {initials}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Official Portrait
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM FOOTER: Name in bold, then Team, Position, Batch */}
          <div className="pt-3 pb-5 px-5 sm:px-6 border-t border-zinc-200 bg-zinc-50/70 text-left">
            {/* Name in bold */}
            <h2 className="text-xl sm:text-2xl font-heading font-black text-zinc-950 uppercase tracking-tight leading-tight">
              {member.name}
            </h2>

            {/* Below it: Team, Position, Batch */}
            <div className="mt-1 flex flex-col gap-0.5 text-xs font-mono">
              <p className="font-bold text-zinc-800 tracking-wide">
                <span>{member.team}</span>
                <span className="mx-1.5 text-zinc-400">&bull;</span>
                <span className="text-orange-600 uppercase">{member.role}</span>
              </p>
              <p className="text-zinc-500 font-semibold tracking-wider text-[11px]">
                {member.batch}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Download Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="group flex items-center gap-2.5 px-5 py-2.5 bg-[#3a1b0c]/80 hover:bg-[#522510] border border-amber-500/30 hover:border-amber-400/60 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(255,120,0,0.15)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs font-bold font-mono text-white tracking-wider">Generating PNG...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold font-mono text-white tracking-wider">Download I-Card</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
