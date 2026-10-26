import { Header } from "@/components/header";
import { InfiniteCardGrid } from "@/components/ui/infinite-card-grid";

export const metadata = {
  title: "Insights | E-Cell JMI",
  description:
    "Explore E-Cell JMI Insights, research whitepapers, startup benchmarks, and frontier venture analyses through an endless interactive card grid.",
};

export default function InsightsPage() {
  return (
    <div className="relative h-[100svh] w-full flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden bg-[#070606]">
      {/* Master Vibrant Sunset Gradient Atmosphere (Exact E-Cell site theme match) */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0 opacity-90" />

      {/* Outer Enormous Glowing Orbital Ring Arc */}
      <div className="pointer-events-none fixed -top-[240px] -left-[180px] sm:-left-[300px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-70 z-0" />

      {/* Inner Thin Glowing Orbital Curve */}
      <div className="pointer-events-none fixed -top-[100px] left-[5%] sm:left-[15%] w-[700px] h-[700px] sm:w-[1020px] sm:h-[1020px] rounded-full orbital-ring-inner opacity-55 z-0" />

      {/* Radiant Sun/Planetary Horizon Halo */}
      <div className="pointer-events-none fixed top-[20%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-35 blur-[140px] z-0" />

      {/* Top Warm Ambient Highlight */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-72 bg-gradient-to-b from-amber-400/20 via-orange-500/10 to-transparent blur-3xl z-0" />

      {/* Distant Mountain Ridge Silhouette */}
      <div className="pointer-events-none fixed bottom-0 inset-x-0 h-40 sm:h-52 z-0 opacity-60">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            fill="#541200"
            opacity="0.5"
            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,186.7C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#2c0700"
            opacity="0.8"
            d="M0,224L60,218.7C120,213,240,203,360,213.3C480,224,600,256,720,250.7C840,245,960,203,1080,197.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Navigation Header */}
      <div className="relative z-30 shrink-0">
        <Header />
      </div>

      {/* Edge-to-Edge Infinite Card Grid Canvas (No box, no heading, just pictures with infinite scroll) */}
      <main className="relative z-10 flex-1 w-full h-full overflow-hidden">
        <InfiniteCardGrid />
      </main>
    </div>
  );
}
