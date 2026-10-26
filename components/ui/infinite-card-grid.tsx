"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InsightCard {
  id?: string;
  image: string;
  title: string;
  date?: string;
  desc: string;
  description?: string;
}

interface InfiniteCardGridProps {
  cards?: InsightCard[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  momentum?: number;
  className?: string;
}

export const DEFAULT_INSIGHT_CARDS: InsightCard[] = [
  {
    id: "campus-venture-index-2026",
    title: "Campus Venture Index 2026",
    date: "MAR 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    desc: "Valuation multiples, pre-seed check sizes, and syndicate trends across top incubation cells.",
  },
  {
    id: "deeptech-ai-commercialization",
    title: "DeepTech & AI Commercialization",
    date: "FEB 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    desc: "Framework for translating proprietary research models and compute pipelines into enterprise startups.",
  },
  {
    id: "robotics-autonomous-systems",
    title: "Autonomous Robotics Lab",
    date: "FEB 2026",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    desc: "Breakthroughs in SLAM navigation, sensor fusion, and micro-actuator control systems.",
  },
  {
    id: "space-defense-innovations",
    title: "SpaceTech & Orbital Analytics",
    date: "JAN 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    desc: "Small-satellite constellations, hyperspectral earth monitoring, and low-earth launch logistics.",
  },
  {
    id: "cleantech-energy-transition",
    title: "CleanTech & Solid-State EV",
    date: "JAN 2026",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=900&q=80",
    desc: "Grid storage economics, lithium recycling breakthroughs, and urban micro-power distribution networks.",
  },
  {
    id: "student-founder-playbook",
    title: "Zero-to-One Founder Playbook",
    date: "DEC 2025",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    desc: "Balancing engineering coursework, customer discovery sprints, and early term sheet negotiations.",
  },
  {
    id: "biotech-health-frontiers",
    title: "BioDiagnostics & Precision Health",
    date: "DEC 2025",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
    desc: "Microfluidic point-of-care chips, regulatory acceleration pathways, and translational biotechnology.",
  },
  {
    id: "fintech-micro-credit-upi",
    title: "Next-Gen Fintech & Embedded Credit",
    date: "NOV 2025",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
    desc: "UPI-powered instant credit lines, algorithmic credit scoring, and open banking protocols.",
  },
  {
    id: "quantum-computing-optics",
    title: "Photonic Compute & Quantum Security",
    date: "NOV 2025",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
    desc: "Post-quantum encryption standards, room-temperature photonic chips, and high-throughput optical compute.",
  },
  {
    id: "demo-day-pitch-dynamics",
    title: "Venture Conclave & Demo Day",
    date: "OCT 2025",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
    desc: "Pitch presentations and syndicate dynamics that secured seed investments across national startup summits.",
  },
  {
    id: "hyper-mobility-aerodynamics",
    title: "Urban Electric Mobility",
    date: "OCT 2025",
    image: "https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=900&q=80",
    desc: "Battery swapping telemetry, ultra-light carbon chassis designs, and metro logistics efficiency.",
  },
  {
    id: "web3-decentralized-compute",
    title: "Decentralized Compute & Clusters",
    date: "SEP 2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    desc: "Distributed GPU inference networks, cluster orchestrators, and cryptographic compute validation.",
  },
  {
    id: "drone-geospatial-mapping",
    title: "Agritech & Aerial Telemetry",
    date: "SEP 2025",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80",
    desc: "Autonomous flight corridors, multispectral crop yield forecasting, and field robotics.",
  },
  {
    id: "cloud-infrastructure-scale",
    title: "Cloud Unit Economics",
    date: "AUG 2025",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
    desc: "Minimizing gross margin burn: Kubernetes clusters, serverless databases, and egress optimization.",
  },
  {
    id: "collegiate-maker-ecosystems",
    title: "Rapid Hardware Prototyping",
    date: "AUG 2025",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    desc: "3D additive manufacturing, automated SMD pick-and-place, and lean hardware iteration pipelines.",
  },
  {
    id: "sustainable-smart-greenhouse",
    title: "Vertical Hydroponics & Smart Climate",
    date: "JUL 2025",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=900&q=80",
    desc: "Closed-loop nutrient dosing, LED spectral tuning, and urban food security research models.",
  },
];

export function InfiniteCardGrid({
  cards = DEFAULT_INSIGHT_CARDS,
  cardWidth = 280,
  cardHeight = 190,
  gap = 26,
  momentum = 0.93,
  className,
}: InfiniteCardGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Position state (continuous 2D coordinates)
  const [offset, setOffset] = useState({ x: -120, y: -80 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeCard, setActiveCard] = useState<InsightCard | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Dimensions of viewport
  const [dimensions, setDimensions] = useState({ width: 1400, height: 900 });

  // Drag physics tracking refs
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    lastTime: 0,
    hasMoved: false,
    rafId: 0,
  });

  // Cell sizing
  const cellWidth = cardWidth + gap;
  const cellHeight = cardHeight + gap;

  // Window resize observer
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || window.innerWidth,
          height: containerRef.current.clientHeight || window.innerHeight,
        });
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeCard) {
        setActiveCard(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCard]);

  // Pointer Down (Mouse & Touch)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (activeCard) return;

    cancelAnimationFrame(dragRef.current.rafId);

    dragRef.current.isDown = true;
    dragRef.current.hasMoved = false;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.lastTime = performance.now();
    dragRef.current.velocityX = 0;
    dragRef.current.velocityY = 0;

    setIsDragging(true);
  }, [activeCard]);

  // Pointer Move
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.isDown) return;

    const now = performance.now();
    const dt = Math.max(now - dragRef.current.lastTime, 1);
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;

    if (
      Math.abs(e.clientX - dragRef.current.startX) > 5 ||
      Math.abs(e.clientY - dragRef.current.startY) > 5
    ) {
      dragRef.current.hasMoved = true;
      if (!hasInteracted) setHasInteracted(true);
    }

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    const instantVx = (dx / dt) * 16.67;
    const instantVy = (dy / dt) * 16.67;

    dragRef.current.velocityX = dragRef.current.velocityX * 0.35 + instantVx * 0.65;
    dragRef.current.velocityY = dragRef.current.velocityY * 0.35 + instantVy * 0.65;

    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.lastTime = now;
  }, [hasInteracted]);

  // Pointer Up
  const handlePointerUp = useCallback(() => {
    if (!dragRef.current.isDown) return;
    dragRef.current.isDown = false;
    setIsDragging(false);

    const glide = () => {
      if (
        Math.abs(dragRef.current.velocityX) < 0.08 &&
        Math.abs(dragRef.current.velocityY) < 0.08
      ) {
        return;
      }

      setOffset((prev) => ({
        x: prev.x + dragRef.current.velocityX,
        y: prev.y + dragRef.current.velocityY,
      }));

      dragRef.current.velocityX *= momentum;
      dragRef.current.velocityY *= momentum;

      dragRef.current.rafId = requestAnimationFrame(glide);
    };

    dragRef.current.rafId = requestAnimationFrame(glide);
  }, [momentum]);

  // Trackpad / Wheel 2D Pan Support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (activeCard) return;

      e.preventDefault();
      cancelAnimationFrame(dragRef.current.rafId);

      setOffset((prev) => ({
        x: prev.x - e.deltaX * 0.95,
        y: prev.y - e.deltaY * 0.95,
      }));

      if (!hasInteracted) setHasInteracted(true);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activeCard, hasInteracted]);

  // Calculate visible range of virtual column and row indices
  const visibleCards = useMemo(() => {
    if (!cards || cards.length === 0) return [];

    const { width, height } = dimensions;
    const buffer = 2;

    const minCol = Math.floor((-offset.x) / cellWidth) - buffer;
    const maxCol = Math.floor((-offset.x + width) / cellWidth) + buffer;

    const minRow = Math.floor((-offset.y) / cellHeight) - buffer;
    const maxRow = Math.floor((-offset.y + height) / cellHeight) + buffer;

    const tiles: { col: number; row: number; card: InsightCard }[] = [];
    const totalCards = cards.length;

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const cardIndex = Math.abs((c * 5 + r * 7) % totalCards);
        tiles.push({
          col: c,
          row: r,
          card: cards[cardIndex],
        });
      }
    }

    return tiles;
  }, [offset, dimensions, cellWidth, cellHeight, cards]);

  // Recenter handler
  const handleRecenter = () => {
    cancelAnimationFrame(dragRef.current.rafId);
    setOffset({ x: -120, y: -80 });
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "relative w-full h-full overflow-hidden select-none touch-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
    >
      {/* Edge Gradient Ambient Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070606] via-[#070606]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#070606] via-[#070606]/85 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070606] via-[#070606]/60 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070606] via-[#070606]/60 to-transparent z-10" />

      {/* Infinite Canvas Grid Layer */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {visibleCards.map(({ col, row, card }) => {
          const posX = col * cellWidth;
          const posY = row * cellHeight;

          return (
            <div
              key={`${col}-${row}`}
              onClick={(e) => {
                if (dragRef.current.hasMoved) return;
                e.stopPropagation();
                setActiveCard(card);
              }}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transform: `translate3d(${posX}px, ${posY}px, 0)`,
              }}
              className="absolute top-0 left-0 hover:z-30 cursor-pointer"
            >
              {/* Inner Card: lifts straight UP on hover, no sideways expansion */}
              <div className="group relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950/90 border border-white/10 hover:border-orange-500/60 shadow-[0_12px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(255,119,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-3 flex flex-col">
                {/* Card Image */}
                <div className="relative w-full h-full overflow-hidden bg-zinc-900">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover select-none transition-all duration-300 group-hover:brightness-110"
                  />

                  {/* Multi-tone Ambient Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:via-black/20 transition-colors duration-300" />

                  {/* Top Date Badge */}
                  {card.date && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono text-white/80 bg-black/60 backdrop-blur-md border border-white/15 shadow-sm">
                        {card.date}
                      </span>
                    </div>
                  )}

                  {/* Bottom Title & Desc */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 z-10 pointer-events-none">
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight font-heading line-clamp-1 leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                      {card.title}
                    </h3>
                    {(card.desc || card.description) && (
                      <p className="text-[11px] text-zinc-300/80 line-clamp-1 mt-0.5 font-sans">
                        {card.desc || card.description}
                      </p>
                    )}
                  </div>

                  {/* Subtle Hover Glow Border Accent */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-orange-500/40 transition-colors duration-300" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Exploration Hint & Controls */}
      <div className="pointer-events-none absolute bottom-8 inset-x-0 flex items-center justify-center gap-3 z-20 px-4">
        {/* Drag Helper Pill */}
        <div
          className={cn(
            "pointer-events-auto px-4 py-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 text-xs font-mono text-zinc-300 shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5 transition-opacity duration-700",
            hasInteracted ? "opacity-35 hover:opacity-100" : "opacity-90"
          )}
        >
          <span>DRAG IN ANY DIRECTION &bull; CLICK ANY PICTURE TO EXPAND</span>
        </div>

        {/* Reset / Recenter Button */}
        <button
          onClick={handleRecenter}
          title="Recenter Grid"
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-white/10 transition-all flex items-center justify-center shadow-lg active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Modal: One image, title, date and short description only */}
      <AnimatePresence>
        {activeCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveCard(null)}
          >
            {/* Backdrop Blur & Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Clean Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-zinc-950/95 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(255,119,0,0.25)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCard(null)}
                aria-label="Close"
                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 hover:border-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Single Image Display */}
              <div className="relative w-full bg-black flex items-center justify-center overflow-hidden max-h-[60vh] sm:max-h-[65vh]">
                <img
                  src={activeCard.image}
                  alt={activeCard.title}
                  className="w-full h-auto max-h-[60vh] sm:max-h-[65vh] object-contain"
                />
              </div>

              {/* Title, Date & Short Desc Only */}
              <div className="p-5 sm:p-6 bg-zinc-950/95">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-heading">
                    {activeCard.title}
                  </h3>
                  {activeCard.date && (
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-400 bg-white/[0.06] border border-white/10">
                      {activeCard.date}
                    </span>
                  )}
                </div>
                {(activeCard.desc || activeCard.description) && (
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {activeCard.desc || activeCard.description}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
