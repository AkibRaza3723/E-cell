"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight, ExternalLink, CheckCircle2 } from "lucide-react";

/* ─── TYPES ─── */
interface Milestone { phase: string; title: string; detail: string; status: "Completed" | "In Progress" | "Upcoming" }
interface Founder { name: string; role: string; dept: string; initials: string; linkedin: string }
interface Startup {
  id: string; name: string; sector: string; stage: string; cohort: string;
  year: string; city: string; accent: string;
  tagline: string; tags: string[];
  metrics: { label: string; value: string; sub: string }[];
  website: string; email: string;
  missionBadge: string; missionHead: string; missionLead: string; missionBody: string;
  bullets: string[]; quote: string;
  adv1Title: string; adv1Lead: string; adv1Desc: string; adv1Metric: string;
  adv2Title: string; adv2Lead: string; adv2Desc: string; adv2Metric: string;
  modelHead: string;
  steps: { title: string; desc: string }[];
  futureHead: string; futureQuote: string;
  milestones: Milestone[];
  founders: Founder[];
  incubatorNote: string;
}

/* ─── DATA ─── */
const STARTUPS: Startup[] = [
  {
    id: "enord", name: "ENORD", sector: "DeepTech / Aerial Robotics",
    stage: "Seed Stage · ₹3.2 Cr Raised", cohort: "Cohort '23 · E-Cell Incubated",
    year: "2023", city: "New Delhi", accent: "#ff6a00",
    tagline: "Autonomous AI Drone Systems for High-Voltage & Energy Grids",
    tags: ["Autonomous Drones", "Edge AI", "Grid Infrastructure", "Hardware+SaaS"],
    metrics: [
      { label: "Transmission Inspected", value: "14,500+ km", sub: "Across 4 state grids" },
      { label: "Downtime Reduction", value: "82%", sub: "Predictive anomaly detection" },
      { label: "Enterprise Pilots", value: "9 Utilities", sub: "PowerGrid & NTPC tiers" },
      { label: "Patents Granted", value: "3 IP", sub: "GPS-denied navigation" },
    ],
    website: "https://enord.co", email: "founder@enord.co",
    missionBadge: "01 / Mission", missionHead: "Replacing Dangerous Grid Surveys with Autonomous Intelligence",
    missionLead: "High-voltage corridors depend on linemen climbing 40-meter towers or helicopters flying in treacherous conditions.",
    missionBody: "At Enord, our mission is to safeguard human life while dramatically scaling inspection frequency of critical national power assets.",
    bullets: [
      "Eliminate catastrophic blackout risks via early micro-defect detection.",
      "Zero dependency on cloud uplinks in remote off-grid corridors.",
      "Precision centimetre-level hover within dense electromagnetic fields.",
    ],
    quote: "Our purpose is to make critical infrastructure resilient through uncompromised autonomous aerial perception.",
    adv1Title: "The GPS-Denied Moat", adv1Lead: "765 kV towers create massive fields that blind commercial drones.",
    adv1Desc: "Enord's FalconNav™ multi-sensor inertial fusion operates within 1.5m of energized conductors without deviation.",
    adv1Metric: "1.5m Precision",
    adv2Title: "Sub-40ms Neural Inference", adv2Lead: "Transmitting 4K video from remote canyons is commercially unfeasible.",
    adv2Desc: "Our edge accelerators classify corona discharges and insulator flashovers in under 40ms directly on the drone.",
    adv2Metric: "40ms Edge Classify",
    modelHead: "From Autonomous Dispatch to Predictive Work-Orders",
    steps: [
      { title: "Autonomous Docking Dispatch", desc: "Ground hubs launch UAVs on pre-computed corridors based on weather telemetry." },
      { title: "Multi-Spectrum Edge Perception", desc: "Dual sensors scan components, cross-referencing 1.2M training images." },
      { title: "Instant Utility Escalation", desc: "Anomalies auto-compile verified defect reports with GPS coordinates." },
    ],
    futureHead: "Scaling National Grid Protection Across South Asia",
    futureQuote: "Backed by university incubation and national grants, we are deploying hubs across 12 new power sectors.",
    milestones: [
      { phase: "Q1 2026", title: "Commercial DGCA Type Certification", detail: "Secured national flight clearance for utility corridors.", status: "Completed" },
      { phase: "Q3 2026", title: "Automated Drone-in-a-Box Pilot", detail: "Deployed 6 zero-person continuous inspection stations.", status: "In Progress" },
      { phase: "Q1 2027", title: "Renewable Energy Expansion", detail: "Extending coverage to wind and mega-solar farms.", status: "Upcoming" },
    ],
    founders: [
      { name: "Muhammad Huzaifa", role: "Co-Founder & CEO", dept: "Mechanical & Aerospace Eng, JMI", initials: "MH", linkedin: "#" },
      { name: "Co-Founder Lead", role: "Chief Technology Officer", dept: "Computer Engineering, JMI", initials: "CT", linkedin: "#" },
    ],
    incubatorNote: "Incubated at E-Cell JMI · Government Seed Grants · National Hackathon Gold",
  },
  {
    id: "nexura", name: "NEXURA DYNAMICS", sector: "ClimateTech / Energy Storage",
    stage: "Pre-Series A · ₹2.6 Cr Raised", cohort: "Cohort '24 · E-Cell Incubated",
    year: "2024", city: "New Delhi", accent: "#f59e0b",
    tagline: "AI-Driven Battery Intelligence & Modular Second-Life Storage",
    tags: ["CleanTech", "Second-Life Batteries", "BMS Analytics", "Circular Economy"],
    metrics: [
      { label: "Active Grid Storage", value: "4.8 MWh", sub: "Across 18 solar microgrids" },
      { label: "State-of-Health Precision", value: "99.4%", sub: "Non-invasive impedance" },
      { label: "Cost vs New Lithium", value: "-54%", sub: "Affordable storage" },
      { label: "CO₂ Displaced", value: "1,200 T", sub: "Battery landfill prevented" },
    ],
    website: "https://nexuraenergy.com", email: "contact@nexuraenergy.com",
    missionBadge: "01 / Mission", missionHead: "Giving EV Batteries a Decade of Second Life",
    missionLead: "When an EV battery degrades to 75% capacity, manufacturers deem it retired — yet millions hold immense usable capacity.",
    missionBody: "Nexura Dynamics builds intelligent BMS units and diagnostic racks that grade, reconfigure, and stabilize retired cells into certified industrial storage modules.",
    bullets: [
      "Cut commercial renewable storage costs in half for local microgrids.",
      "Prevent toxic heavy metal accumulation in municipal landfills.",
      "Real-time cell-level thermal balancing preventing thermal runaway.",
    ],
    quote: "True energy transition requires circular hardware — the batteries powering yesterday's vehicles must power tomorrow's cities.",
    adv1Title: "The Multi-Chemistry Challenge", adv1Lead: "Retired packs from diverse manufacturers have wildly differing degradation curves.",
    adv1Desc: "Our NeuroCell™ algorithms map internal lithium plating in 90 seconds without dismantling cell casings.",
    adv1Metric: "90s Pack Grading",
    adv2Title: "Predictive Thermal Armor", adv2Lead: "Industrial buyers demand fire-safety and guaranteed degradation predictability.",
    adv2Desc: "Our firmware monitors individual cell temperature and DC resistance 100 times per second.",
    adv2Metric: "100Hz Telemetry",
    modelHead: "From Automotive Decommission to Clean Power Storage",
    steps: [
      { title: "Automated Fleet Ingestion", desc: "Retired EV packs tested using high-frequency electrochemical impedance spectroscopy." },
      { title: "Modular Re-Architecting", desc: "Balanced cells housed in fire-insulated cabinets with Nexura's adaptive BMS." },
      { title: "Grid Stabilization Delivery", desc: "Storage banks connect with industrial solar, providing peak shaving and backup." },
    ],
    futureHead: "Expanding to 25 MWh Industrial Deployments",
    futureQuote: "Scaling sustainable power storage across Northern India with commercial OEM partnerships.",
    milestones: [
      { phase: "Q2 2026", title: "CE & BIS Safety Certifications", detail: "Achieved full industrial grid-tie battery certification.", status: "Completed" },
      { phase: "Q4 2026", title: "10 MWh Factory Contract", detail: "Supplying peak-load shaving for automotive tier-1 plants.", status: "In Progress" },
      { phase: "Q2 2027", title: "AI Energy Arbitrage SaaS", detail: "Software trading stored power during grid peak tariffs.", status: "Upcoming" },
    ],
    founders: [
      { name: "Aman Siddiqui", role: "Co-Founder & Energy Systems Lead", dept: "Electrical Engineering, JMI", initials: "AS", linkedin: "#" },
      { name: "Zainab Fatima", role: "Co-Founder & Embedded Hardware Lead", dept: "Electronics & Comm Eng, JMI", initials: "ZF", linkedin: "#" },
    ],
    incubatorNote: "E-Cell JMI Incubation Cohort · National Climate Innovation Pitch Winner",
  },
  {
    id: "zepyr", name: "ZEPYR SYSTEMS", sector: "Enterprise Software / Cloud Infra",
    stage: "Bootstrapped & Seed · ₹1.8 Cr", cohort: "Cohort '24 · E-Cell Incubated",
    year: "2024", city: "New Delhi", accent: "#f97316",
    tagline: "Sub-Millisecond Edge WebAssembly Cloud for Latency-Critical Apps",
    tags: ["DevTools", "WebAssembly", "Serverless Edge", "Cloud Optimization"],
    metrics: [
      { label: "Cold Start Latency", value: "0.8 ms", sub: "Vs 250ms on legacy containers" },
      { label: "Monthly Invocations", value: "140M+", sub: "Across 35 edge nodes" },
      { label: "Compute Bill Reduction", value: "65%", sub: "High-density microVM packing" },
      { label: "Active Dev Teams", value: "480+", sub: "Fintech, gaming, and AI apps" },
    ],
    website: "https://zepyr.dev", email: "team@zepyr.dev",
    missionBadge: "01 / Mission", missionHead: "Unleashing Instant Edge Compute Without the Cloud Tax",
    missionLead: "Modern serverless architectures promised effortless scaling, but delivered crippling cold starts and exorbitant bills.",
    missionBody: "Zepyr Systems rethinks serverless by building on WebAssembly sandboxes instead of heavy Docker containers, spinning up in under a millisecond.",
    bullets: [
      "Instant cold starts that make microservices truly instantaneous.",
      "Zero noisy-neighbor penalties with military-grade memory isolation.",
      "Run code from Rust, Go, TypeScript, or C++ with zero rewrites.",
    ],
    quote: "When computing happens in microseconds at the edge, software feels indistinguishable from instant reality.",
    adv1Title: "The Container Bloat Reality", adv1Lead: "Spinning up a Linux container for a 20-line HTTP handler wastes seconds.",
    adv1Desc: "Zepyr's JIT WASM runtime instantiates an isolated memory sandbox in 800µs consuming only 24 KB of RAM.",
    adv1Metric: "800µs Spin-Up",
    adv2Title: "Global Deterministic Routing", adv2Lead: "Global routing frequently routes traffic across continents due to stale DNS.",
    adv2Desc: "Our Anycast network routes each execution to the nearest of 35 global nodes within 12ms.",
    adv2Metric: "<12ms P99 Hops",
    modelHead: "From Local Git Commit to Planetary Instant Edge",
    steps: [
      { title: "Zero-Config Compilation", desc: "Pushing code compiles logic into cryptographically signed WASM binaries." },
      { title: "Global Artifact Distribution", desc: "Binaries synchronize across the global edge ring in under 3 seconds." },
      { title: "Sub-Millisecond Execution", desc: "Requests trigger instantaneous sandbox execution with live tracing." },
    ],
    futureHead: "Empowering Next-Gen Real-Time AI and Fintech",
    futureQuote: "From college dorm research to powering latency-critical fintech startups across the globe.",
    milestones: [
      { phase: "Q3 2026", title: "Public Beta & Developer CLI", detail: "Onboarded first 400 engineering teams with 99.99% uptime.", status: "Completed" },
      { phase: "Q4 2026", title: "WASM GPU Inference Acceleration", detail: "Enabling small LLM inference directly at the edge.", status: "In Progress" },
      { phase: "Q2 2027", title: "Enterprise Zero-Trust Mesh", detail: "Direct VPC peering for regulated financial institutions.", status: "Upcoming" },
    ],
    founders: [
      { name: "Raza Ali", role: "Co-Founder & Distributed Systems Lead", dept: "Computer Engineering, JMI", initials: "RA", linkedin: "#" },
      { name: "Saad Farooqui", role: "Co-Founder & Cloud Infrastructure Lead", dept: "Computer Engineering, JMI", initials: "SF", linkedin: "#" },
    ],
    incubatorNote: "Incubated at E-Cell JMI · Global Open-Source Community of 1,200+ Devs",
  },
];

/* ─── SMALL HELPERS ─── */
function PanelBg({ accent }: { accent: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 70% 40%, ${accent}1a 0%, transparent 70%)`,
      }}
    />
  );
}

function Dot({ status, accent }: { status: Milestone["status"]; accent: string }) {
  const colors: Record<Milestone["status"], string> = {
    Completed: "#22c55e",
    "In Progress": accent,
    Upcoming: "#3f3f46",
  };
  return (
    <div
      className="absolute -left-[1.15rem] top-1.5 w-2 h-2 rounded-full"
      style={{
        background: colors[status],
        boxShadow: status !== "Upcoming" ? `0 0 8px ${colors[status]}88` : "none",
      }}
    />
  );
}

/* ─── MAIN ─── */
export function StartupShowcase() {
  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const s = STARTUPS[active];

  const animateIndicator = useCallback((idx: number) => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      left: `${(idx / STARTUPS.length) * 100}%`,
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [active]);

  useEffect(() => {
    animateIndicator(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (idx: number) => {
    if (idx === active) return;
    setActive(idx);
    animateIndicator(idx);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── PAGE HEADER (Exact match to Events & site theme) ── */}
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
          Three student-built ventures pushing the boundaries of DeepTech, Clean Energy, and Cloud Infrastructure — from Jamia Millia Islamia to global scale.
        </p>
      </header>

      {/* ── THREE-PANEL SELECTOR ── */}
      <div className="relative mb-12">
        {/* sliding underline */}
        <div className="relative h-px bg-white/15 mb-4">
          <div
            ref={indicatorRef}
            className="absolute top-[-1px] h-[2px] rounded-full"
            style={{
              width: `${100 / STARTUPS.length}%`,
              background: `linear-gradient(90deg, ${STARTUPS[active].accent}, ${STARTUPS[active].accent}88)`,
              boxShadow: `0 0 14px ${STARTUPS[active].accent}`,
              left: 0,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STARTUPS.map((st, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={st.id}
                onClick={() => select(idx)}
                className={`relative text-left p-4 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden group backdrop-blur-2xl ${
                  isActive
                    ? "border-orange-500/50 bg-black/85 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)] ring-1 ring-orange-500/30"
                    : "border-white/15 bg-black/70 hover:border-white/30 hover:bg-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                }`}
              >
                {isActive && <PanelBg accent={st.accent} />}

                <div className="relative z-10 space-y-2.5 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold"
                      style={isActive ? { background: `${st.accent}22`, color: st.accent, border: `1px solid ${st.accent}44` } : { background: "#ffffff0d", color: "#d4d4d8", border: "1px solid #ffffff15" }}
                    >
                      {idx + 1}
                    </div>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: st.accent, boxShadow: `0 0 8px ${st.accent}` }}
                      />
                    )}
                  </div>

                  <div>
                    <h3
                      className={`font-heading font-black text-lg sm:text-2xl tracking-tight ${isActive ? "text-white" : "text-zinc-200 group-hover:text-white"} transition-colors`}
                    >
                      {st.name}
                    </h3>
                    <p className="hidden sm:block mt-1 text-[10px] font-mono uppercase tracking-wider text-amber-200/70">
                      {st.sector}
                    </p>
                  </div>

                  {/* Hidden on phone view as requested */}
                  <p className={`hidden sm:block text-xs leading-relaxed line-clamp-2 ${isActive ? "text-zinc-200" : "text-white/70"}`}>
                    {st.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-1 sm:pt-0">
                    <span className="text-xs sm:text-[10px] font-mono font-medium text-amber-200/90 sm:text-white/50">{st.stage.split("·")[1]?.trim()}</span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: isActive ? st.accent : "#d4d4d8" }}
                    >
                      {isActive ? "↓ Viewing" : "Select →"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DETAIL PANEL ── */}
      <div ref={contentRef} key={active} className="space-y-6">

        {/* ─ A. HERO STRIP ─ */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/15 bg-black/75 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <PanelBg accent={s.accent} />
          {/* top accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent}66, transparent)` }} />

          <div className="relative z-10 p-7 sm:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 flex-1">
              {/* eyebrow */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-full border"
                  style={{ color: s.accent, borderColor: `${s.accent}44`, background: `${s.accent}0d` }}>
                  {s.cohort}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Est. {s.year} · {s.city}</span>
              </div>

              <h2 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-none">
                {s.name}
              </h2>

              <p className="text-zinc-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                {s.tagline}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {s.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-mono text-zinc-300 bg-white/[0.06] px-3 py-1 rounded-full border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* metrics */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 shrink-0 lg:border-l lg:border-white/10 lg:pl-8">
              {s.metrics.map((m: { label: string; value: string; sub: string }) => (
                <div key={m.label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200/70">{m.label}</span>
                  <span className="font-heading font-black text-xl sm:text-2xl text-white leading-none">{m.value}</span>
                  <span className="text-[10px] text-zinc-400">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10 px-7 sm:px-10 py-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-zinc-400 font-mono">{s.stage}</p>
            <div className="flex items-center gap-3">
              <a href={s.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-full transition-colors bg-white/[0.04]">
                Website <ExternalLink className="w-3 h-3" />
              </a>
              <Link href="#pitch"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-full glow-orange-button hover:scale-[1.03] transition-transform">
                Pitch Deck <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ─ B. MISSION + MODEL ─ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Mission — spans 2 cols */}
          <div className="md:col-span-2 p-7 sm:p-9 rounded-[1.75rem] bg-black/75 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: s.accent }}>{s.missionBadge}</span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-tight">{s.missionHead}</h3>
            <p className="text-sm text-zinc-200 leading-relaxed">{s.missionLead}</p>
            <ul className="space-y-2.5 pt-1">
              {s.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: s.accent }} />
                  {b}
                </li>
              ))}
            </ul>
            <blockquote className="pl-4 border-l-2 text-xs italic text-zinc-300 leading-relaxed"
              style={{ borderColor: s.accent }}>
              &ldquo;{s.quote}&rdquo;
            </blockquote>
          </div>

          {/* Model */}
          <div className="p-7 sm:p-9 rounded-[1.75rem] bg-black/75 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: s.accent }}>How It Works</span>
            <h3 className="font-heading font-bold text-base text-white">{s.modelHead}</h3>
            <div className="space-y-3 pt-1">
              {s.steps.map((st: { title: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0"
                    style={{ background: `${s.accent}22`, color: s.accent, border: `1px solid ${s.accent}44` }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{st.title}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─ C. ADVANTAGES ─ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { badge: "Our Edge", title: s.adv1Title, lead: s.adv1Lead, desc: s.adv1Desc, metric: s.adv1Metric },
            { badge: "Key Differentiator", title: s.adv2Title, lead: s.adv2Lead, desc: s.adv2Desc, metric: s.adv2Metric },
          ].map((adv) => (
            <div key={adv.badge} className="p-7 sm:p-8 rounded-[1.75rem] bg-black/75 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-3 hover:border-white/30 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: s.accent }}>{adv.badge}</span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${s.accent}18`, color: s.accent, border: `1px solid ${s.accent}33` }}>
                  {adv.metric}
                </span>
              </div>
              <h4 className="font-heading font-bold text-base text-white">{adv.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: `${s.accent}cc` }}>{adv.lead}</p>
              <p className="text-xs text-zinc-300 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>

        {/* ─ D. HORIZON + FOUNDERS ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Milestones */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-[1.75rem] bg-black/75 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: s.accent }}>Traction & Roadmap</span>
              <h3 className="mt-2 font-heading font-bold text-xl text-white">{s.futureHead}</h3>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />
              <div className="space-y-5">
                {s.milestones.map((m: Milestone, i: number) => (
                  <div key={i} className="relative pl-5">
                    <Dot status={m.status} accent={s.accent} />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400">{m.phase}</span>
                        <p className="text-sm font-semibold text-white mt-0.5">{m.title}</p>
                        <p className="text-xs text-zinc-300 mt-0.5">{m.detail}</p>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 px-2 py-0.5 rounded-full border ${
                        m.status === "Completed" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                        : m.status === "In Progress" ? "text-orange-400 border-orange-500/30 bg-orange-500/10"
                        : "text-zinc-400 border-zinc-700 bg-zinc-800/40"
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs italic text-zinc-400">&ldquo;{s.futureQuote}&rdquo;</p>
          </div>

          {/* Founders */}
          <div className="lg:col-span-5 p-7 sm:p-9 rounded-[1.75rem] bg-black/75 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-col space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: s.accent }}>Founding Team</span>
              <h3 className="mt-2 font-heading font-bold text-xl text-white">University Builders</h3>
              <p className="mt-1 text-xs text-zinc-400">{s.incubatorNote}</p>
            </div>
            <div className="space-y-3 flex-1">
              {s.founders.map((f: Founder, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.05] border border-white/10 group hover:border-white/20 transition-colors">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0"
                    style={{ background: `${s.accent}22`, color: s.accent, border: `1px solid ${s.accent}33` }}>
                    {f.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{f.name}</p>
                    <p className="text-[11px] font-mono truncate" style={{ color: s.accent }}>{f.role.split("&")[0].trim()}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{f.dept}</p>
                  </div>
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100" aria-label="LinkedIn">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
            <a href={`mailto:${s.email}`}
              className="w-full py-2.5 rounded-xl text-center text-xs font-semibold border transition-colors"
              style={{ borderColor: `${s.accent}44`, color: s.accent, background: `${s.accent}0d` }}>
              Connect · {s.email}
            </a>
          </div>
        </div>

        {/* ─ E. BOTTOM CTA ─ */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/15 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-black/75 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <PanelBg accent={s.accent} />
          <div className="relative z-10">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-200/70 mb-1">Ready to Build?</p>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">Pitch Your University Venture</h3>
            <p className="mt-1 text-sm text-zinc-300 max-w-md">Pre-seed grants, IP support, and direct VC access for student-led startups.</p>
          </div>
          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-5 py-2.5 rounded-full border border-white/20 text-zinc-300 hover:text-white text-xs font-semibold transition-colors bg-white/[0.03]">
              ↑ All Startups
            </button>
            <Link href="#pitch"
              className="px-6 py-2.5 rounded-full glow-orange-button text-white text-xs font-semibold flex items-center gap-2 shadow-lg hover:scale-[1.03] transition-transform">
              Get Incubated <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
