"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Search,
  Sparkles,
  Calendar,
  ExternalLink
} from "lucide-react";
import { BlogItem } from "@/lib/blogs-data";

interface BlogsShowcaseProps {
  initialBlogs: BlogItem[];
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
  return { name: "Article", color: "bg-white/10 text-amber-300 border-white/20" };
}

export function BlogsShowcase({ initialBlogs = [] }: BlogsShowcaseProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract platforms from existing blog links
  const platformTabs = useMemo(() => {
    const platforms = new Set<string>();
    for (const b of initialBlogs) {
      const details = getPlatformDetails(b.link);
      platforms.add(details.name);
    }
    return ["ALL", ...Array.from(platforms)];
  }, [initialBlogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const platform = getPlatformDetails(blog.link);
      const matchesPlatform =
        selectedPlatform === "ALL" ||
        platform.name.toUpperCase() === selectedPlatform.toUpperCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(query)) ||
        blog.authorName.toLowerCase().includes(query) ||
        (blog.authorSubtitle && blog.authorSubtitle.toLowerCase().includes(query));

      return matchesPlatform && matchesQuery;
    });
  }, [initialBlogs, selectedPlatform, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Masthead */}
      <header className="mb-12 sm:mb-16 pb-8 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="editorial-tag text-orange-300">
                E-CELL JMI
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              Articles & Founder Stories
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans max-w-2xl leading-relaxed">
              Explore perspectives on student innovation, venture creation, and startup ecosystems directly from Jamia Millia Islamia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full glow-orange-button text-white text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all active:scale-95"
            >
              <span>Submit An Article</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Control Filter Bar (when blogs exist) */}
      {initialBlogs.length > 0 && (
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.55)]">
          {/* Platform Tabs */}
          {platformTabs.length > 2 ? (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none select-none">
              {platformTabs.map((platform) => {
                const isActive = selectedPlatform === platform;
                return (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-[0_0_20px_rgba(255,100,0,0.4)]"
                        : "text-white/65 hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    {platform === "ALL" ? "All Publications" : platform}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs font-mono text-zinc-400 px-2">
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, topic, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.06] border border-white/15 hover:border-white/25 focus:border-amber-400/60 focus:outline-none text-xs font-sans text-white placeholder-white/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* When no publications exist */}
      {initialBlogs.length === 0 ? (
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
      ) : filteredBlogs.length === 0 ? (
        <div className="py-20 px-6 text-center rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15">
          <h3 className="text-xl font-heading font-bold text-white mb-2">No Matching Articles</h3>
          <p className="text-sm text-white/60 font-sans max-w-md mx-auto mb-6">
            No publications match your search query. Try a different keyword or reset filters.
          </p>
          <button
            onClick={() => {
              setSelectedPlatform("ALL");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-full glow-orange-button text-white text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        /* Clean Editorial Publications Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog) => {
            const platform = getPlatformDetails(blog.link);
            const dateStr = blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : null;

            return (
              <a
                key={blog.id}
                href={blog.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-amber-400/50 hover:shadow-[0_20px_50px_rgba(255,100,0,0.2)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Subtle Amber Glow Accent on Top Edge */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                <div>
                  {/* Blog Image Frame */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950">
                    <Image
                      src={blog.image?.trim() || "/images/ecelllogo.png"}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Platform Badge on Top Left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono font-bold uppercase tracking-wider ${platform.color}`}
                      >
                        {platform.name}
                      </span>
                    </div>

                    {/* Date Tag on Top Right if present */}
                    {dateStr && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300 z-10 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        <span>{dateStr}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h2 className="font-heading font-black text-xl text-white tracking-tight leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors mb-2.5">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="text-xs sm:text-sm text-zinc-300/85 font-sans leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Author Footer & Read Action */}
                <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-black/70 border border-white/20 shrink-0 flex items-center justify-center shadow-sm">
                      <Image
                        src="/images/ecelllogo.png"
                        alt="E-Cell JMI"
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-xs sm:text-sm text-white truncate leading-tight">
                        {blog.authorName}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate leading-tight mt-0.5">
                        {blog.authorSubtitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center text-amber-300 group-hover:bg-orange-500 group-hover:border-orange-400 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
