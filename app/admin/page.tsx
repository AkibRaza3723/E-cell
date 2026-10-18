import React from "react";
import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import {
  Users,
  Calendar,
  FileText,
  Rocket,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const instant = false;

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  let membersCount = 0;
  let eventsCount = 0;
  let blogsCount = 0;
  let startupsCount = 0;

  try {
    if (prisma) {
      [membersCount, eventsCount, blogsCount, startupsCount] = await Promise.all([
        prisma.members?.count().catch(() => 0) ?? 0,
        prisma.event?.count().catch(() => 0) ?? 0,
        prisma.blogs?.count().catch(() => 0) ?? 0,
        prisma.startup?.count().catch(() => 0) ?? 0,
      ]);
    }
  } catch (err) {
    console.error("Dashboard count query error:", err);
  }

  const modules = [
    {
      title: "Members",
      count: membersCount,
      description: "Manage society team members, core leadership, roles, batches, and profiles.",
      href: "/admin/members",
      addHref: "/admin/members?action=new",
      icon: Users,
      badge: "Team Directory",
      color: "from-blue-500/20 to-cyan-500/10",
      accent: "text-blue-400",
      border: "hover:border-blue-500/40",
    },
    {
      title: "Events",
      count: eventsCount,
      description: "Publish summits, hackathons, speaker sessions, dates, and registration links.",
      href: "/admin/events",
      addHref: "/admin/events/new",
      icon: Calendar,
      badge: "Flagship Events",
      color: "from-orange-500/20 to-amber-500/10",
      accent: "text-orange-400",
      border: "hover:border-orange-500/40",
    },
    {
      title: "Blogs",
      count: blogsCount,
      description: "Compose, edit, and publish society articles, founder guides, and startup news.",
      href: "/admin/blogs",
      addHref: "/admin/blogs/new",
      icon: FileText,
      badge: "Editorial Content",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
      border: "hover:border-emerald-500/40",
    },
    {
      title: "Startups",
      count: startupsCount,
      description: "List student ventures, incubation records, founder details, and portfolio sites.",
      href: "/admin/startups",
      addHref: "/admin/startups/new",
      icon: Rocket,
      badge: "Venture Showcase",
      color: "from-purple-500/20 to-pink-500/10",
      accent: "text-purple-400",
      border: "hover:border-purple-500/40",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Society Command Center
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Welcome, {session.user?.name || "Administrator"}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Control the four core pillars of the E-Cell portal. Add new team members, schedule upcoming events, post blogs, and highlight incubated startups.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/events/new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.45)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
            <Link
              href="/admin/members"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 transition-all"
            >
              <Users className="w-4 h-4 text-zinc-400" />
              <span>Manage Members</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-zinc-200">
              Core Modules
            </h2>
          </div>
          <span className="text-xs text-zinc-500">4 authorized management areas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className={`group relative rounded-2xl bg-zinc-950/70 border border-white/[0.07] ${m.border} p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${m.color} border border-white/10 flex items-center justify-center ${m.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-extrabold text-white font-heading">
                      {m.count}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    {m.badge}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white mt-0.5 group-hover:text-orange-400 transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {m.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <Link
                    href={m.href}
                    className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href={m.addHref}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-orange-500/20 text-zinc-400 hover:text-orange-300 border border-white/5 transition-all"
                    title={`Add new ${m.title.slice(0, -1)}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Security & Operations Info */}
      <div className="rounded-2xl bg-zinc-950/50 border border-white/[0.05] p-5 sm:p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200">
              Live Neon PostgreSQL Sync
            </h4>
            <p className="text-xs text-zinc-500">
              Changes published in this panel reflect immediately across the public website pages.
            </p>
          </div>
        </div>

        <Link
          href="/admin/events"
          className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1 shrink-0"
        >
          <span>View all upcoming events</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
