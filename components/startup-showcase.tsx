"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Rocket,
  User,
  Globe,
  Sparkles,
  Search,
  Building2,
  CheckCircle2
} from "lucide-react";

export interface DbStartup {
  id: string;
  name: string;
  slug: string;
  description: string;
  website?: string | null;
  logo?: string | null;
  founder?: string | null;
  category?: string | null;
  published: boolean;
  createdAt: Date;
}

export function StartupShowcase({ initialStartups = [] }: { initialStartups?: DbStartup[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories from actual database startups
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(initialStartups.map((s) => s.category?.trim()).filter(Boolean))
    ) as string[];
    return ["ALL", ...cats];
  }, [initialStartups]);

  // Filtered startups based on selected category and search query
  const filteredStartups = useMemo(() => {
    return initialStartups.filter((item) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        (item.category && item.category.trim().toUpperCase() === selectedCategory.toUpperCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.founder && item.founder.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [initialStartups, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 sm:mb-16 pb-8 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="editorial-tag text-orange-300">
                E-CELL JMI
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              Student-Led Startups
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans max-w-2xl leading-relaxed">
              Explore ventures founded and built by students at Jamia Millia Islamia, incubated and supported through the Entrepreneurship Cell.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full glow-orange-button text-white text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all active:scale-95"
            >
              <span>Submit Startup Deck</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Control Filter Bar (Categories & Search) */}
      {initialStartups.length > 0 && (
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.55)]">
          {/* Categories Pill Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none select-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-[0_0_20px_rgba(255,100,0,0.4)]"
                      : "text-white/65 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {cat === "ALL" ? "All Ventures" : cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, founder, domain..."
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

      {/* When no startups exist in DB */}
      {initialStartups.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-20 px-6 sm:px-12 rounded-[2rem] bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-amber-300 mx-auto mb-6 shadow-inner">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight mb-3">
            No Ventures Listed Yet
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-md mx-auto mb-8 font-sans">
            Startups incubated and supported by E-Cell JMI will be featured here once added through the Admin Portal.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Incubation Pipeline Active &bull; Jamia Millia Islamia</span>
          </div>
        </div>
      ) : filteredStartups.length === 0 ? (
        <div className="py-20 px-6 text-center rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15">
          <h3 className="text-xl font-heading font-bold text-white mb-2">No Matching Startups</h3>
          <p className="text-sm text-white/60 font-sans max-w-md mx-auto mb-6">
            No ventures match your search criteria. Try a different query or reset filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-full glow-orange-button text-white text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
          >
            Show All Startups
          </button>
        </div>
      ) : (
        /* Clean, Direct Venture Grid — No Redundant Duplicate Cards */
        <div
          className={`grid gap-6 ${
            filteredStartups.length === 1
              ? "grid-cols-1 max-w-3xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredStartups.map((startup) => {
            const initials = startup.name
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase();

            return (
              <article
                key={startup.id}
                className="group relative rounded-3xl p-6 sm:p-8 bg-black/60 backdrop-blur-2xl border border-white/15 hover:border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_50px_rgba(255,100,0,0.2)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Amber Glow Accent on Top Edge */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Header: Logo / Avatar and Category Tag */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {startup.logo ? (
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/70 border border-white/15 p-2 flex items-center justify-center shrink-0 shadow-md group-hover:border-amber-400/50 transition-colors">
                        <img
                          src={startup.logo}
                          alt={startup.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 shadow-md text-amber-300 font-heading font-black text-lg">
                        {initials || "EC"}
                      </div>
                    )}

                    <div className="flex flex-col items-end gap-1.5">
                      {startup.category && (
                        <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                          {startup.category}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active Venture</span>
                      </span>
                    </div>
                  </div>

                  {/* Startup Title */}
                  <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors mb-2">
                    {startup.name}
                  </h2>

                  {/* Founder Details */}
                  {startup.founder && (
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 mb-4">
                      <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Founder: {startup.founder}</span>
                    </div>
                  )}

                  {/* Startup Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                    {startup.description}
                  </p>
                </div>

                {/* Footer Strip: Venture ID & External Links */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[10px] font-mono text-zinc-400">
                    ID &bull; {startup.slug}
                  </span>

                  <div className="flex items-center gap-2">
                    {startup.website && (
                      <a
                        href={
                          startup.website.startsWith("http")
                            ? startup.website
                            : `https://${startup.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white border border-white/15 hover:border-white/30 px-3.5 py-1.5 rounded-full transition-colors bg-white/[0.04]"
                      >
                        <Globe className="w-3 h-3 text-orange-300" />
                        <span>Website</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-bold text-white px-3.5 py-1.5 rounded-full glow-orange-button uppercase tracking-wider"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
