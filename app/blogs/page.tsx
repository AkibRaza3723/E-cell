import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/blog-card";
import { getBlogs } from "@/lib/blogs-data";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Blogs | E-Cell JMI",
  description:
    "Read inspiring stories, case studies, and entrepreneurial insights from student founders and innovators at E-Cell Jamia Millia Islamia.",
};

async function BlogsGrid() {
  const blogs = await getBlogs();

  if (blogs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6 sm:px-12 rounded-[2rem] bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-amber-300 mx-auto mb-6 shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight mb-3">
          No Publications Yet
        </h2>
        <p className="text-sm text-white/70 leading-relaxed max-w-md mx-auto mb-8 font-sans">
          Founder stories, case studies, and entrepreneurial articles will be published here once authored through the Admin Portal.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>E-Cell Editorial Desk &bull; Jamia Millia Islamia</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default function BlogsPage() {
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

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <header className="text-center max-w-4xl mx-auto mb-14 sm:mb-18 select-none">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-3">
              NEXT GEN ENTREPRENEURSHIP &bull; Blogs
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.94] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              OUR BLOGS
            </h1>
            <p className="text-lg sm:text-2xl font-extrabold uppercase text-amber-200 tracking-tight leading-tight font-heading drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] mt-3">
              INSIGHTS, STORIES & FOUNDER JOURNEYS
            </p>
            <p className="text-sm sm:text-base text-white/75 font-sans max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore perspectives on student innovation, venture creation, and startup ecosystems directly from Jamia Millia Islamia.
            </p>
          </header>

          {/* Blogs Grid */}
          <Suspense
            fallback={
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono text-orange-200">Loading publications...</span>
              </div>
            }
          >
            <BlogsGrid />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
