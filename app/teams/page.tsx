import React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeadershipSpotlightCard, LeaderData } from "@/components/leadership-spotlight-card";
import { QrCode, ArrowUpRight } from "lucide-react";

const leadershipData: LeaderData[] = [
  {
    id: "mohammad-hamza",
    index: "01",
    slug: "mohammad-hamza",
    role: "Chairperson",
    roleCategory: "Leadership",
    name: "Mohammad Hamza",
    avatar: "https://res.cloudinary.com/dm3eahafo/image/upload/v1792339091/Hamza.png",
    batch: "Founder Council & Executive Board",
    faculty: "Faculty of Engineering & Technology",
    quote:
      "Engineer turned entrepreneur who wants to see the day when Jamia students are building and scaling startups. I love marketing.",
    focusAreas: ["Marketing", "Entrepreneurship", "Communication"],
    initials: "MH",
    socials: {
      linkedin: "https://www.linkedin.com/in/hamzaindia",
      twitter: "",
      email: "heyhamza22@gmail.com",
    },
  },
  {
    id: "faiz-khan",
    index: "02",
    slug: "faiz-khan",
    role: "Co-Chair",
    roleCategory: "Leadership",
    name: "Faiz Khan",
    avatar: "https://res.cloudinary.com/dm3eahafo/image/upload/v1792340518/faiz.png",
    batch: "Founder Council & Executive Board",
    faculty: "Faculty of Engineering & Technology",
    quote:
      "Never thought I would be here, but I manifested it—and here I am. Still, a long way to go.",
    focusAreas: ["Leadership", "Dedication", "Overthinking"],
    initials: "FK",
    socials: {
      linkedin: "https://www.linkedin.com/in/faiz-khan-4a16112b5",
      twitter: "",
      email: "faizullahkhan19113@gmail.com",
    },
  },
  {
    id: "hiba-jamal",
    index: "03",
    slug: "hiba-jamal",
    role: "Co-Chair",
    roleCategory: "Leadership",
    name: "Hiba Jamal",
    avatar: "",
    batch: "Founder Council & Executive Board",
    faculty: "Faculty of Engineering, CIE",
    quote:
      "Turning ideas into tangible impact, to build, create opportunities for people and figure out the rest along the way.",
    focusAreas: ["Ideas", "Initiative", "Creative Chaos"],
    initials: "HJ",
    socials: {
      linkedin: "https://www.linkedin.com/in/hiba-jamal-8a7794254",
      twitter: "",
      email: "Hibajamalkhan796@gmail.com",
    },
  },
  {
    id: "mohammad-arham",
    index: "04",
    slug: "mohammad-arham",
    role: "General Secretary",
    roleCategory: "Secretary",
    name: "Mohammad Arham",
    avatar: "",
    batch: "Founder Council & Executive Board",
    faculty: "Faculty of Social Sciences",
    quote:
      "Leadership isn't about holding a position; it's about turning vision into action, empowering people, and building something that outlasts you.",
    focusAreas: ["Leadership", "Vision", "Execution"],
    initials: "MA",
    socials: {
      linkedin: "https://www.linkedin.com/in/mohammad-arham-272a34373",
      twitter: "",
      email: "arham3340@gmail.com",
    },
  },
  {
    id: "mariyam",
    index: "05",
    slug: "mariyam",
    role: "Joint Secretary",
    roleCategory: "Secretary",
    name: "Mariyam",
    avatar: "",
    batch: "Founder Council & Executive Board",
    faculty: "Faculty of Social Sciences",
    quote:
      "Curious about ideas, passionate about entrepreneurship, and always excited to meet new people, explore possibilities, and turn ideas into meaningful experiences.",
    focusAreas: ["Curious", "Thoughtful", "Creative"],
    initials: "M",
    socials: {
      linkedin: "https://www.linkedin.com/in/mariyam-3a32823b0",
      twitter: "",
      email: "mariyam881460@gmail.com",
    },
  },
  {
    id: "mohd-imam-ashraf",
    index: "06",
    slug: "mohd-imam-ashraf",
    role: "HR Secretary",
    roleCategory: "Secretary",
    name: "Mohd Imam Ashraf",
    avatar: "",
    batch: "Founder Council & Executive Board",
    faculty: "Department of Commerce and Business Studies",
    quote:
      "Dedicated HR leader passionate about talent acquisition, team management, and building collaborative, high-performing teams.",
    focusAreas: ["Ambitious", "Responsible", "Adaptable"],
    initials: "IA",
    socials: {
      linkedin: "https://www.linkedin.com/in/imam-ashraf-219664384",
      twitter: "",
      email: "imamashraf.88888@gmail.com",
    }, 
  },
];

export const metadata = {
  title: "Executive Leadership | E-CELL JMI",
  description:
    "Meet the visionary founders, executive officers, and directors leading the Entrepreneurship Cell at Jamia Millia Islamia.",
};

export default function Teams() {
  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-orange-500 selection:text-white overflow-hidden">

      {/* Master Vibrant Sunset Gradient (Exact reference match) */}
      <div className="fixed inset-0 pointer-events-none nexora-bg-gradient z-0" />

      {/* Outer Enormous Glowing Orbital Ring Arc */}
      <div className="pointer-events-none fixed -top-[240px] -left-[180px] sm:-left-[300px] w-[950px] h-[950px] sm:w-[1350px] sm:h-[1350px] rounded-full orbital-ring-outer opacity-70 z-0" />

      {/* Inner Thin Glowing Orbital Curve */}
      <div className="pointer-events-none fixed -top-[100px] left-[5%] sm:left-[15%] w-[700px] h-[700px] sm:w-[1020px] sm:h-[1020px] rounded-full orbital-ring-inner opacity-55 z-0" />

      {/* Radiant Sun/Planetary Horizon Halo */}
      <div className="pointer-events-none fixed top-[22%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffaa22] to-amber-100 opacity-45 blur-[120px] z-0" />

      {/* Top Warm Ambient Highlight */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-amber-400/30 via-orange-500/15 to-transparent blur-3xl z-0" />

      {/* Mountain Ridge & Dunes Silhouette */}
      <div className="pointer-events-none fixed bottom-0 inset-x-0 h-44 sm:h-56 z-0 opacity-75">
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

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section matching reference typography */}
          <header className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 select-none">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90 font-mono drop-shadow-sm mb-3">
              NEXT GEN ENTREPRENEURSHIP &bull; EXECUTIVE COUNCIL
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.94] font-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
              EXECUTIVE LEADERSHIP
            </h1>
            <p className="text-xl sm:text-3xl font-extrabold uppercase text-amber-200 tracking-tight leading-tight font-heading drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] mt-2">
              THE MINDS GUIDING INNOVATION
            </p>
          </header>

          {/* Interactive Leadership Cards List */}
          <div className="space-y-6 sm:space-y-8">
            {leadershipData.map((leader) => (
              <LeadershipSpotlightCard key={leader.id} leader={leader} />
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}