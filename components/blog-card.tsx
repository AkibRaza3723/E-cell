import Image from "next/image";
import { BlogItem } from "@/lib/blogs-data";

interface BlogCardProps {
  blog: BlogItem;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group relative rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(255,100,0,0.18)] transition-all duration-300 flex flex-col">
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

        {/* E-Cell corner badge watermark */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-orange-300 uppercase tracking-widest pointer-events-none">
          E-CELL
        </div>
      </div>

      {/* Blog Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
        {/* Blog Name / Title */}
        <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors">
          {blog.title}
        </h3>

        {/* Author Footer */}
        <div className="flex items-center pt-4 border-t border-white/10">
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
        </div>
      </div>
    </article>
  );
}
