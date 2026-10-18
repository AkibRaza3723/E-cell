"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  FileText,
  Rocket,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

interface AdminNavProps {
  userEmail?: string;
  userName?: string;
}

export function AdminNav({ userEmail, userName }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Members",
      href: "/admin/members",
      icon: Users,
    },
    {
      name: "Events",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      name: "Startups",
      href: "/admin/startups",
      icon: Rocket,
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.href = "/admin/login";
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090807]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Admin Badge */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <span className="font-heading font-extrabold tracking-tight text-lg text-white group-hover:text-orange-400 transition-colors">
                E-CELL<span className="text-orange-500">.</span>
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/25 tracking-wide uppercase">
                <ShieldCheck className="w-3 h-3" /> Admin
              </span>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1 pl-4 border-l border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname?.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: User status & Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-colors"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {userEmail && (
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-xs font-medium text-zinc-200">
                  {userName || "Administrator"}
                </span>
                <span className="text-[11px] text-zinc-500 truncate max-w-[150px]">
                  {userEmail}
                </span>
              </div>
            )}

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-400 bg-white/[0.03] hover:bg-red-500/10 border border-white/10 hover:border-red-500/25 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary nav row */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 border-t border-white/[0.05] -mx-4 px-4 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
