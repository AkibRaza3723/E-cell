import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BlogItem } from "@/lib/blogs-data";

interface BlogCardProps {
  blog: BlogItem;
}

function getPlatformDetails(url?: string) {
  if (!url) return { name: "Article", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" };
  const lower = url.toLowerCase();
  if (lower.includes("medium.com")) {
    return { name: "Medium", color: "bg-emerald-500/25 text-emerald-300 border-emerald-500/40" };
  }
  if (lower.includes("linkedin.com")) {
    return { name: "LinkedIn", color: "bg-sky-500/25 text-sky-300 border-sky-500/40" };
  }
  if (lower.includes("substack.com")) {
    return { name: "Substack", color: "bg-orange-500/25 text-orange-300 border-orange-500/40" };
  }
  return { name: "External Article", color: "bg-white/10 text-amber-300 border-white/20" };
}

export function BlogCard({ blog }: BlogCardProps) {
  const platform = getPlatformDetails(blog.link);

  return (
    <a
      href={blog.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-orange-500/45 hover:shadow-[0_20px_50px_rgba(255,100,0,0.22)] transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Blog Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
        <Image
          src={blog.image?.trim() || "/images/ecelllogo.png"}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Platform Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono font-bold uppercase tracking-wider ${platform.color}`}
          >
            {platform.name}
          </span>
        </div>

        {/* E-Cell corner badge watermark */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-orange-300 uppercase tracking-widest pointer-events-none">
          E-CELL
        </div>
      </div>

      {/* Blog Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Blog Name / Title */}
          <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt if present */}
          {blog.excerpt && (
            <p className="mt-2 text-xs sm:text-sm text-zinc-300/85 font-sans leading-relaxed line-clamp-2">
              {blog.excerpt}
            </p>
          )}
        </div>

        {/* Author Footer & Read Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-black/60 border border-white/20 shrink-0 flex items-center justify-center shadow-sm">
              <Image
                src="/images/ecelllogo.png"
                alt="E-Cell JMI"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="min-w-0">
              <p className="font-bold text-sm text-white truncate leading-tight">
                {blog.authorName}
              </p>
              <p className="text-[11px] text-zinc-400 truncate leading-tight mt-0.5">
                {blog.authorSubtitle}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center text-amber-300 group-hover:bg-orange-500 group-hover:border-orange-400 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </a>
  );
}
