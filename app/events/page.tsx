import React, { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EventsListView } from "@/components/events-list-view";
import { getEvents } from "@/lib/events-data";
import { Sparkles, ArrowUpRight, Calendar, MapPin, Radio } from "lucide-react";

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
    <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden bg-[#070606]">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient opacity-90 z-0" />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-amber-400/20 via-orange-500/10 to-transparent blur-3xl z-0" />

      {/* Header */}
      <Header />

      {/* Main Events Section */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Distinctive Asymmetric Architectural Masthead */}
          <header className="mb-12 sm:mb-16 pb-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="editorial-tag text-orange-300">
                    E-CELL JMI
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                  Campus Summits & Pitch Sprints
                </h1>

                <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans max-w-2xl leading-relaxed">
                  The proving grounds for campus innovation. Compete in hackathons, present to tier-1 venture funds at demo days, and learn directly from founders who have built at scale.
                </p>
              </div>

              {/* Action Block & Keynote Proposal */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full glow-orange-button text-white text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all active:scale-95"
                >
                  <span>Propose Keynote / Sponsor</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <span className="text-[11px] font-mono text-zinc-400">
                  Applications evaluated within 48h
                </span>
              </div>

            </div>
          </header>

          {/* Interactive Events List */}
          <Suspense
            fallback={
              <div className="py-24 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono text-orange-200">Loading events schedule...</span>
              </div>
            }
          >
            <EventsSection />
          </Suspense>

          {/* Institutional Ecosystem Partner Banner */}
          <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/10 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <span className="editorial-tag text-orange-400 mb-2">
                  [ECOSYSTEM COLLABORATION]
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white uppercase mt-1 mb-2">
                  Bring Your Venture Challenge To Jamia Millia Islamia
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  Partner with the official Entrepreneurship Cell to host hackathons, brand challenges, or venture scouting rounds with access to 15,000+ STEM, management, and design students.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 border border-white/15 transition-all active:scale-95"
                >
                  <span>Partner With E-Cell</span>
                  <ArrowUpRight className="w-4 h-4 text-orange-400" />
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