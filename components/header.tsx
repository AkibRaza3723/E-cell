"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavRoute {
  name: string;
  href: string;
  current?: boolean;
  badge?: string;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Defined routes placeholders as requested by user
  const rawRoutes: NavRoute[] = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/teams" },
    { name: "Events", href: "/events" },
    { name: "StartUp", href: "/startup" },
    { name: "Blogs", href: "/blogs" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];

  const navRoutes: NavRoute[] = rawRoutes.map((route) => {
    const isActive =
      route.href === "/"
        ? pathname === "/"
        : pathname === route.href || pathname?.startsWith(route.href + "/");
    return {
      ...route,
      current: isActive,
    };
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#090807]/90 backdrop-blur-xl border-b border-orange-500/15 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-white/[0.05] py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black border border-white/15 shrink-0 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dm3eahafo/image/upload/v1791916461/dc9f584b-8632-4c25-8290-c8649a4301e3.png"
                alt="E-Cell Logo"
                className="w-full h-full object-cover"
                width={40}
                height={40}
              />
            </div> */}

            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-white group-hover:text-orange-800 transition-colors">
                E-CELL JMI
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-orange-400/90 -mt-1 font-mono">
                Entrepreneurship Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Routes (Room reserved for future routes) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-1.5 rounded-full bg-[#120e0b]/80 border border-orange-500/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {navRoutes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${route.current
                    ? "text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] border border-white/[0.08]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
              >
                {route.name}
                {route.badge && (
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 animate-pulse">
                    {route.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="#pitch"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full glow-orange-button text-white transition-all transform active:scale-95 shadow-md"
            >
              <span>Pitch Your Idea</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="#pitch"
              className="sm:hidden px-3 py-1.5 text-xs font-semibold rounded-full glow-orange-button text-white"
            >
              Pitch
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#15100c] border border-orange-500/20 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-[#0f0b09]/95 border border-orange-500/20 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1">
              {navRoutes.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center justify-between ${route.current
                      ? "text-orange-400 bg-orange-500/10 font-semibold"
                      : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                    }`}
                >
                  <span>{route.name}</span>
                  {route.badge && (
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-full font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
                      {route.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-white/[0.08]">
                <Link
                  href="#pitch"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl glow-orange-button text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>Pitch Your Startup</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
