import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogsSkeleton } from "@/components/blogs-skeleton";

export default function BlogsLoading() {
  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden bg-[#070606]">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0" />
      <div className="pointer-events-none fixed -top-[240px] -left-[180px] sm:-left-[300px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-70 z-0" />
      <div className="pointer-events-none fixed top-[20%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-40 blur-[130px] z-0" />

      <Header />
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <BlogsSkeleton />
      </main>
      <Footer />
    </div>
  );
}
