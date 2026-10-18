"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Plus,
  Trash2,
  Edit,
  Search,
  ExternalLink,
  Check,
  AlertCircle,
  Globe,
  User,
} from "lucide-react";
import { deleteStartup } from "@/lib/actions/startups-actions";

interface StartupItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  website?: string | null;
  logo?: string | null;
  founder?: string | null;
  category?: string | null;
  published: boolean;
}

interface StartupsManagerProps {
  initialStartups: StartupItem[];
}

export function StartupsManager({ initialStartups }: StartupsManagerProps) {
  const [startups, setStartups] = useState<StartupItem[]>(initialStartups);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredStartups = startups.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.founder && s.founder.toLowerCase().includes(search.toLowerCase())) ||
      (s.category && s.category.toLowerCase().includes(search.toLowerCase())) ||
      s.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || s.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    setError(null);
    try {
      const res = await deleteStartup(id);
      if (res.success) {
        setStartups(startups.filter((item) => item.id !== id));
        setDeleteConfirmId(null);
        setSuccessMsg("Startup record removed successfully");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setError(res.error || "Failed to delete startup");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to delete startup");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Incubated Startups
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Showcase student ventures, incubation cohort listings, and portfolio companies.
          </p>
        </div>

        <Link
          href="/admin/startups/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.45)]"
        >
          <Plus className="w-4 h-4" />
          <span>Register Startup</span>
        </Link>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-zinc-950/60 border border-white/[0.08] p-3 rounded-2xl backdrop-blur-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups by name, founder, industry sector..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>
      </div>

      {/* Startups Grid */}
      {filteredStartups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-zinc-950/40 backdrop-blur-xl">
          <Rocket className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-300">
            No Startups Found
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {search
              ? "No startups matched your search keywords."
              : "Register an incubated startup to feature them on the E-Cell portal."}
          </p>
          <Link
            href="/admin/startups/new"
            className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Startup</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStartups.map((s) => (
            <div
              key={s.id}
              className="group relative rounded-2xl bg-zinc-950/70 border border-white/[0.07] hover:border-orange-500/30 p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {s.logo ? (
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="w-11 h-11 rounded-xl object-contain bg-white/[0.04] p-1.5 border border-white/10"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Rocket className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-white text-base group-hover:text-orange-400 transition-colors">
                        {s.name}
                      </h3>
                      {s.founder && (
                        <p className="text-xs text-zinc-400">
                          Founder: {s.founder}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                      s.published
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {s.published ? "Active" : "Draft"}
                  </span>
                </div>

                {s.category && (
                  <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/5 mb-2">
                    {s.category}
                  </span>
                )}

                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {s.website ? (
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-orange-400 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-600">No site listed</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/admin/startups/${s.id}`}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05] transition-colors"
                    title="Edit Startup"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>

                  {deleteConfirmId === s.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={isDeletingId === s.id}
                        className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-medium transition-all"
                      >
                        {isDeletingId === s.id ? "..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-1.5 py-1 text-zinc-400 hover:text-zinc-200 text-[11px]"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(s.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Remove startup"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
