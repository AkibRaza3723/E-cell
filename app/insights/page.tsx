import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sparkles, ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Insights | Coming Soon | E-Cell JMI",
  description:
    "E-Cell JMI Insights & Market Research: Deep-dive analytical reports, campus funding benchmarks, and ecosystem whitepapers.",
};

export default function InsightsComingSoonPage() {
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

      {/* Main Centered Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center pt-28 sm:pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center">
          
          {/* Badge */}
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-3">
              NEXT GEN ENTREPRENEURSHIP &bull; Insights
            </p>


          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase text-white tracking-tight leading-[0.94] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            COMING SOON
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl font-extrabold uppercase text-amber-200 tracking-tight leading-tight font-heading drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] mt-4">
            E-CELL JMI INSIGHTS & REPORTS
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/75 font-sans max-w-xl mx-auto mt-4 leading-relaxed">
            We are curating deep-dive research papers, student venture funding benchmarks, and macroeconomic startup case studies from Jamia Millia Islamia.
          </p>

          {/* Minimalist Glass Status Card */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>PUBLICATION PIPELINE IN PROGRESS</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-md mx-auto">
              Our inaugural 2026 Campus Venture Index and DeepTech whitepapers will be launched here shortly.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/events"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-xs font-semibold text-zinc-200 hover:text-white transition-colors bg-white/[0.04] inline-flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Explore Events</span>
              </Link>
              <Link
                href="/blogs"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full glow-orange-button text-xs font-semibold text-white shadow-lg hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-1.5"
              >
                <span>Read Blogs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
