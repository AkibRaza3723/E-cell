import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StartupShowcase, DbStartup } from "@/components/startup-showcase";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Student Ventures | E-Cell JMI",
  description: "Explore incubated student-led startups from Jamia Millia Islamia accelerating innovation.",
};

async function StartupsSection() {
  let startups: DbStartup[] = [];
  try {
    if (prisma?.startup) {
      startups = await prisma.startup.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      }); 
    }
  } catch (error) {
    console.error("Failed to query startups from database:", error);
  }

  return <StartupShowcase initialStartups={startups} />;
}

export default function StartupPage() {
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

      <Header />
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <Suspense
          fallback={
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-orange-200">Loading student ventures...</span>
            </div>
          }
        >
          <StartupsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}