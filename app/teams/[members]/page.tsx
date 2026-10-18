import React, { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/db";
import { LinkedInIcon, GitHubIcon } from "@/components/icons";
import { HangingIdCard } from "@/components/hanging-id-card";
import { ArrowLeft, Mail, Building2, GraduationCap, Users2, Calendar, ShieldCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ members: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { members } = await params;
  const slug = decodeURIComponent(members).trim();
  const titleName = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${titleName} | E-CELL JMI`,
    description: `Official member profile for ${titleName} at Entrepreneurship Cell, Jamia Millia Islamia.`,
  };
}

// Generate deterministic initials from member name
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

async function MemberProfile({ params }: PageProps) {
  const { members } = await params;
  const rawSlug = decodeURIComponent(members).trim();

  // Query member from database by slug or ID according to Prisma schema
  let member = null;
  try {
    if (prisma?.members) {
      member = await prisma.members.findFirst({
        where: {
          OR: [
            { slug: rawSlug.toLowerCase() },
            { id: rawSlug },
            { slug: rawSlug },
          ],
        },
      });
    }
  } catch (error) {
    console.error("Database query failed:", error);
  }

  if (!member) {
    return (
      <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden">
        <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0" />
        <Header />
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <div className="max-w-md p-8 sm:p-10 rounded-[2rem] bg-black/70 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-heading font-black uppercase text-white mb-2">Member Record Not Found</h2>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              No verified digital membership credential was found matching &ldquo;{rawSlug}&rdquo;. Inducted member passes uploaded via the Admin Portal will be accessible here.
            </p>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glow-orange-button text-xs font-bold uppercase tracking-wider text-white hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Executive Leadership</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const initials = getInitials(member.name);
  const inductionDate = new Date(member.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });



  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0" />
      <div className="pointer-events-none fixed -top-[240px] -left-[180px] sm:-left-[300px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-55 z-0" />
      <div className="pointer-events-none fixed -top-[100px] left-[5%] sm:left-[15%] w-[700px] h-[700px] sm:w-[1020px] sm:h-[1020px] rounded-full orbital-ring-inner opacity-45 z-0" />
      <div className="pointer-events-none fixed top-[20%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-35 blur-[120px] z-0" />

      {/* Mountain Ridge & Dunes Silhouette */}
      <div className="pointer-events-none fixed bottom-0 inset-x-0 h-44 sm:h-56 z-0 opacity-70">
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

      <main className="relative z-10 flex-1 pt-32 sm:pt-40 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Back Navigation Link */}
          <div className="mb-10">
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </Link>
          </div>

          {/* Minimalist 2-Column Profile Layout (No Enclosing Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* =================================================================
                LEFT: Realistic Hanging I-Card with Lanyard & Sway Physics
                ================================================================= */}
            <div className="md:col-span-5 flex justify-center -translate-y-[7%]">
              <HangingIdCard member={member} />
            </div>

            {/* =================================================================
                RIGHT: Editorial Information Directly from Prisma Model
                ================================================================= */}
            <div className="md:col-span-7 flex flex-col">
              
              {/* Member Full Name */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none mb-3">
                {member.name}
              </h1>

              {/* Role & Society Team Designation */}
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono mb-6">
                <span className="text-amber-300 font-bold">{member.role}</span>
                <span className="text-white/30">&bull;</span>
                <span className="text-orange-200/90">{member.team}</span>
              </div>

              {/* Bio / Mission Statement from Prisma */}
              {member.bio && (
                <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed mb-6">
                  {member.bio}
                </p>
              )}

              {/* Minimalist Social Icon Links */}
              <div className="flex items-center gap-3 mb-8">
                {member.linkedin && member.linkedin.trim() !== "" && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-3 rounded-xl bg-black/35 hover:bg-black/55 border border-white/20 text-white transition-all active:scale-95 shadow-md hover:border-amber-400/40"
                  >
                    <LinkedInIcon className="w-4 h-4 text-amber-300" />
                  </a>
                )}
                {member.github && member.github.trim() !== "" && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="p-3 rounded-xl bg-black/35 hover:bg-black/55 border border-white/20 text-white transition-all active:scale-95 shadow-md hover:border-amber-400/40"
                  >
                    <GitHubIcon className="w-4 h-4 text-white" />
                  </a>
                )}
                {member.email && member.email.trim() !== "" && (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="p-3 rounded-xl bg-black/35 hover:bg-black/55 border border-white/20 text-white transition-all active:scale-95 shadow-md hover:border-amber-400/40"
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>

              {/* Elegant Fine Hairline Divider */}
              <div className="h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent my-4 mb-8" />

              {/* Credentials & Affiliation Section (Mapping Prisma Model Fields) */}
              <div>
                <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-white font-bold mb-4 flex items-center gap-2 drop-shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Member Credentials & Information</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Faculty */}
                  <div className="group/block p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 hover:border-amber-400/40 shadow-[0_8px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-amber-300/90 font-bold block mb-1">
                        Faculty & Department
                      </span>
                      <span className="text-sm sm:text-base font-heading font-bold text-white leading-snug block">
                        {member.faculty}
                      </span>
                    </div>
                  </div>

                  {/* Academic Batch */}
                  <div className="group/block p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 hover:border-amber-400/40 shadow-[0_8px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-amber-300/90 font-bold block mb-1">
                        Academic Batch
                      </span>
                      <span className="text-sm sm:text-base font-heading font-bold text-white leading-snug block">
                        {member.batch}
                      </span>
                    </div>
                  </div>

                  {/* Team / Division */}
                  <div className="group/block p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 hover:border-amber-400/40 shadow-[0_8px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
                      <Users2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-amber-300/90 font-bold block mb-1">
                        Society Division
                      </span>
                      <span className="text-sm sm:text-base font-heading font-bold text-white leading-snug block">
                        {member.team}
                      </span>
                    </div>
                  </div>

                  {/* Induction Tenure */}
                  <div className="group/block p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 hover:border-amber-400/40 shadow-[0_8px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-amber-300/90 font-bold block mb-1">
                        Active Tenure
                      </span>
                      <span className="text-sm sm:text-base font-heading font-bold text-white leading-snug block">
                        Inducted {inductionDate}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Members({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center nexora-bg-gradient text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-orange-100">Loading profile...</span>
          </div>
        </div>
      }
    >
      <MemberProfile params={params} />
    </Suspense>
  );
}
