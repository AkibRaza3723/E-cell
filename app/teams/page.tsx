import React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeadershipSpotlightCard, LeaderData } from "@/components/leadership-spotlight-card";
import { QrCode, ArrowUpRight } from "lucide-react";

const leadershipData: LeaderData[] = [
  {
    id: "founder",
    index: "01",
    slug: "founder",
    role: "Founder & President Emeritus",
    roleCategory: "Founder",
    name: "Founder Name",
    batch: "Founder Council & Executive Board",
    faculty: "Faculty of Engineering & Technology",
    quote:
      "Innovation isn't just about starting a company; it's about shifting the cultural mindset from seeking employment to creating disruptive opportunities that endure.",
    focusAreas: ["Ecosystem Governance", "Venture Incubation", "DeepTech Acceleration"],
    initials: "FN",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:founder@ecelljmi.com",
    },
  },
  {
    id: "co-founder",
    index: "02",
    slug: "co-founder",
    role: "Co-Founder & Executive Director",
    roleCategory: "Co-Founder",
    name: "Co-Founder Name",
    batch: "Strategic Advisory & Operations",
    faculty: "Centre for Innovation & Entrepreneurship",
    quote:
      "Ideas without relentless execution are merely dreams. We build the infrastructure, mentorship frameworks, and investor access so student founders can build the future.",
    focusAreas: ["Strategic Growth", "Investor Syndicate", "Incubation Pipelines"],
    initials: "CF",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:cofounder@ecelljmi.com",
    },
  },
  {
    id: "gen-sec",
    index: "03",
    slug: "general-secretary",
    role: "General Secretary",
    roleCategory: "Executive Lead",
    name: "General Secretary Name",
    batch: "Executive Board & Governance",
    faculty: "Faculty of Engineering & Technology",
    quote:
      "Execution is the bridge between aspiration and triumph. Cohesion across our teams translates raw university talent into impactful ventures.",
    focusAreas: ["Executive Governance", "Flagship Summits", "Cross-Team Operations"],
    initials: "GS",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:gensec@ecelljmi.com",
    },
  },
  {
    id: "joint-sec",
    index: "04",
    slug: "joint-secretary",
    role: "Joint Secretary",
    roleCategory: "Executive Lead",
    name: "Joint Secretary Name",
    batch: "Executive Board & Outreach",
    faculty: "Faculty of Natural Sciences",
    quote:
      "True entrepreneurship blossoms when diverse minds intersect. Our mission is to lower the barrier to entry for every curious student builder.",
    focusAreas: ["Student Outreach", "Hackathons & Challenges", "Talent Incubation"],
    initials: "JS",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:jointsec@ecelljmi.com",
    },
  },
  {
    id: "treasurer",
    index: "05",
    slug: "treasurer",
    role: "Treasurer & Financial Controller",
    roleCategory: "Fiscal Lead",
    name: "Treasurer Name",
    batch: "Executive Board & Fiscal Management",
    faculty: "Department of Commerce & Business Studies",
    quote:
      "Sustainable innovation requires disciplined capital allocation. We ensure every rupee fuels student vision and maximum community impact.",
    focusAreas: ["Venture Grants", "Corporate Sponsorships", "Fiscal Audits"],
    initials: "TR",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:treasurer@ecelljmi.com",
    },
  },
  {
    id: "strategic-advisor",
    index: "06",
    slug: "strategic-advisor",
    role: "Strategic Advisor",
    roleCategory: "Advisory Council",
    name: "Strategic Advisor Name",
    batch: "Alumni Council & Industry Advisory",
    faculty: "Faculty of Engineering & Technology",
    quote:
      "The next generation of breakout startups will come from campuses. Our responsibility is to provide the strategic clarity and mentorship to steer them right.",
    focusAreas: ["Institutional Alignment", "Angel Syndicates", "Ecosystem Expansion"],
    initials: "SA",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:advisor@ecelljmi.com",
    },
  },
];

export const metadata = {
  title: "Executive Leadership | E-CELL JMI",
  description:
    "Meet the visionary founders, executive officers, and directors leading the Entrepreneurship Cell at Jamia Millia Islamia.",
};

export default function Teams() {
  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden">

      {/* Master Vibrant Sunset Gradient (Exact reference match) */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0" />

      {/* Outer Enormous Glowing Orbital Ring Arc */}
      <div className="pointer-events-none fixed -top-[240px] -left-[180px] sm:-left-[300px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-70 z-0" />

      {/* Inner Thin Glowing Orbital Curve */}
      <div className="pointer-events-none fixed -top-[100px] left-[5%] sm:left-[15%] w-[700px] h-[700px] sm:w-[1020px] sm:h-[1020px] rounded-full orbital-ring-inner opacity-55 z-0" />

      {/* Radiant Sun/Planetary Horizon Halo */}
      <div className="pointer-events-none fixed top-[22%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-45 blur-[120px] z-0" />

      {/* Top Warm Ambient Highlight */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-amber-400/30 via-orange-500/15 to-transparent blur-3xl z-0" />

      {/* Mountain Ridge & Dunes Silhouette */}
      <div className="pointer-events-none fixed bottom-0 inset-x-0 h-44 sm:h-56 z-0 opacity-75">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            fill="#541200"
            opacity="0.65"
            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,186.7C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#2c0700"
            d="M0,224L60,218.7C120,213,240,203,360,213.3C480,224,600,256,720,250.7C840,245,960,203,1080,197.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section matching reference typography */}
          <header className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 select-none">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-3">
              NEXT GEN ENTREPRENEURSHIP &bull; EXECUTIVE COUNCIL
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.94] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
              EXECUTIVE LEADERSHIP
            </h1>
            <p className="text-xl sm:text-3xl font-extrabold uppercase text-amber-200 tracking-tight leading-tight font-heading drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] mt-2">
              THE MINDS GUIDING INNOVATION
            </p>
          </header>

          {/* Interactive Leadership Cards List */}
          <div className="space-y-6 sm:space-y-8">
            {leadershipData.map((leader) => (
              <LeadershipSpotlightCard key={leader.id} leader={leader} />
            ))}
          </div>

          {/* Offer Letter & Member Profile QR Section (Minimalist Glass Banner) */}
          <section className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-[2rem] bg-black/40 backdrop-blur-2xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-white/10 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-amber-300 text-xs font-mono mb-3">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>OFFER LETTER VERIFICATION</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white mb-2 uppercase">
                  Are You an Inducted Member?
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                  Every appointed E-Cell member receives an official offer letter equipped with a unique QR credential. Scan your letter to view and share your cryptographic digital membership pass.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Link
                  href="/teams/demo-member"
                  className="px-6 py-3.5 rounded-full glow-orange-button text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-xl hover:shadow-orange-500/40 transition-all uppercase tracking-wide active:scale-95"
                >
                  <span>Preview Demo Credential</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}