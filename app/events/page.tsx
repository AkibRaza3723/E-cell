import React, { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EventsListView } from "@/components/events-list-view";
import { getEvents } from "@/lib/events-data";
import { Sparkles, ArrowUpRight, Flame } from "lucide-react";


export const metadata = {
  title: "Events & Summits | E-CELL JMI",
  description:
    "Explore upcoming, ongoing, and completed hackathons, case competitions, women empowerment summits, and CEO roundtables organized by the Entrepreneurship Cell at Jamia Millia Islamia.",
};

async function EventsSection() {
  const events = await getEvents();
  return <EventsListView initialEvents={events} />;
}

export default function EventsPage() {

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Master Vibrant Sunset Gradient Atmosphere (Exact site theme match) */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0" />

      {/* Outer Enormous Glowing Orbital Ring Arc */}
      <div className="pointer-events-none fixed -top-[240px] -left-[180px] sm:-left-[300px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-70 z-0" />

      {/* Inner Thin Glowing Orbital Curve */}
      <div className="pointer-events-none fixed -top-[100px] left-[5%] sm:left-[15%] w-[700px] h-[700px] sm:w-[1020px] sm:h-[1020px] rounded-full orbital-ring-inner opacity-55 z-0" />

      {/* Radiant Sun/Planetary Horizon Halo */}
      <div className="pointer-events-none fixed top-[20%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-40 blur-[130px] z-0" />

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

      {/* Main Events Section */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Header Section */}
          <header className="text-center max-w-4xl mx-auto mb-14 sm:mb-18 select-none">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-3">
              NEXT GEN ENTREPRENEURSHIP &bull; Events
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.94] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
              EVENTS & SUMMITS
            </h1>
            <p className="text-lg sm:text-2xl font-extrabold uppercase text-amber-200 tracking-tight leading-tight font-heading drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] mt-3">
              THE PLATFORMS IGNITING NEXT-GEN VENTURES
            </p>
            <p className="text-sm sm:text-base text-white/75 font-sans max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore upcoming, active, and completed hackathons, case competitions, and executive summits connecting student builders with industry leaders and capital.
            </p>

            {/* Micro Stats Row: Categorized by status */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/35 border border-white/10">
                <span className="text-2xl font-black text-amber-300 block font-heading">Upcoming</span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Registrations Open</span>
              </div>
              <div className="p-3 rounded-xl bg-black/35 border border-emerald-500/30">
                <span className="text-2xl font-black text-emerald-400 block font-heading">Ongoing</span>
                <span className="text-[10px] text-emerald-200/60 uppercase tracking-wider">Active Cohorts</span>
              </div>
              <div className="p-3 rounded-xl bg-black/35 border border-white/10">
                <span className="text-2xl font-black text-zinc-300 block font-heading">Completed</span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Flagship Summits</span>
              </div>
              <div className="p-3 rounded-xl bg-black/35 border border-white/10">
                <span className="text-2xl font-black text-amber-300 block font-heading">JMI</span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">New Delhi Hub</span>
              </div>
            </div>
          </header>

          {/* Interactive Event List Display (Month groupings matching the reference photo) */}
          <Suspense
            fallback={
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono text-orange-200">Loading events schedule...</span>
              </div>
            }
          >
            <EventsSection />
          </Suspense>

          {/* Partner & Host Collaboration Card */}
          <section className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-[2rem] bg-black/45 backdrop-blur-2xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-white/15 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-amber-300 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ECOSYSTEM PARTNERSHIPS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white mb-2 uppercase">
                  Want to Sponsor or Host an Event?
                </h3>

                <p className="text-sm sm:text-base text-white/75 leading-relaxed font-sans">
                  Partner with the Entrepreneurship Cell at Jamia Millia Islamia. We connect corporate leaders, startups, and VC funds directly with thousands of passionate student builders, engineers, and future founders.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full glow-orange-button text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-xl hover:shadow-orange-500/40 transition-all uppercase tracking-wide active:scale-95"
                >
                  <span>Propose Partnership</span>
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