import { prisma } from "@/lib/db";

export interface EventItem {
  id: string;
  title: string;
  shortTitle?: string;
  month: string; // "OCTOBER" | "NOVEMBER"
  monthNumber: number;
  year: number;
  dayOfWeek: string; // e.g. "SAT", "TUE", "THU"
  dayNumber: string; // e.g. "24", "07"
  fullDate: string; // "October 24, 2026"
  time: string; // "10:00 AM – 05:30 PM IST"
  venue: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  registrationLink: string;
  isUpcoming: boolean;
  isOngoing?: boolean;
  isCompleted?: boolean;
  statusBadge: string;
}

export const PLACEHOLDER_EVENTS: EventItem[] = [
  {
    id: "enord-case-com",
    title: "ENORD CASE COMPETITION",
    shortTitle: "Enord Case Com",
    month: "OCTOBER",
    monthNumber: 10,
    year: 2026,
    dayOfWeek: "SAT",
    dayNumber: "24",
    fullDate: "October 24, 2026",
    time: "10:00 AM – 05:30 PM IST",
    venue: "Dr. M. A. Ansari Auditorium, Jamia Millia Islamia, New Delhi",
    category: "Case Competition",
    tags: ["CASE COMPETITION", "AI & ROBOTICS", "DRONE TECH", "₹50,000 PRIZES"],
    description:
      "A flagship national case study challenge in collaboration with AI drone robotics venture Enord. Student teams analyze autonomous aerial logistics networks and pitch actionable go-to-market strategies.",
    image: "/images/events/enord-case-com.jpg",
    registrationLink: "https://unstop.com",
    isUpcoming: true,
    statusBadge: "Registration Open",
  },
  {
    id: "women-empowerment",
    title: "WOMEN IN ENTREPRENEURSHIP & EMPOWERMENT CONCLAVE",
    shortTitle: "Women Empowerment",
    month: "OCTOBER",
    monthNumber: 10,
    year: 2026,
    dayOfWeek: "TUE",
    dayNumber: "27",
    fullDate: "October 27, 2026",
    time: "11:00 AM – 04:30 PM IST",
    venue: "Mir Anis Hall, Central University Campus, JMI, New Delhi",
    category: "Summit & Keynote",
    tags: ["WOMEN FOUNDERS", "VENTURE CAPITAL", "LEADERSHIP", "PANEL DISCUSSION"],
    description:
      "A premier conclave celebrating trailblazing women founders, angel investors, and tech leaders. Features keynote fireside chats, funding roadmap panels, and 1-on-1 mentorship breakout circles.",
    image: "/images/events/women-empowerment.jpg",
    registrationLink: "https://unstop.com",
    isUpcoming: true,
    statusBadge: "Free Registration",
  },
  {
    id: "ceo-roundtable",
    title: "EXECUTIVE CEO ROUNDTABLE: SCALING DISRUPTION",
    shortTitle: "CEO Roundtable",
    month: "OCTOBER",
    monthNumber: 10,
    year: 2026,
    dayOfWeek: "THU",
    dayNumber: "29",
    fullDate: "October 29, 2026",
    time: "02:30 PM – 06:30 PM IST",
    venue: "FTK-CIT Executive Boardroom & Conference Complex, JMI",
    category: "Executive Roundtable",
    tags: ["EXECUTIVE ROUNDTABLE", "STARTUP SCALE", "ANGEL INVESTORS", "ZERO-TO-ONE"],
    description:
      "An exclusive closed-door conclave uniting breakout series-funded CEOs, institutional venture partners, and student leaders to dissect product-market fit, capital efficiency, and scale.",
    image: "/images/events/ceo-roundtable.jpg",
    registrationLink: "https://unstop.com",
    isUpcoming: true,
    statusBadge: "Limited Executive Seats",
  },
  {
    id: "national-esummit-2025",
    title: "NATIONAL ENTREPRENEURSHIP SUMMIT (E-SUMMIT '25)",
    shortTitle: "E-Summit '25",
    month: "SEPTEMBER",
    monthNumber: 9,
    year: 2026,
    dayOfWeek: "FRI",
    dayNumber: "18",
    fullDate: "September 18 – 20, 2026",
    time: "Concluded Event",
    venue: "Dr. M. A. Ansari Auditorium & Central Lawns, JMI",
    category: "Annual Flagship Conclave",
    tags: ["E-SUMMIT", "4,000+ ATTENDEES", "PITCH BATTLE", "CONCLUDED"],
    description:
      "E-Cell's landmark annual entrepreneurial festival featuring 40+ speakers, 12 investor syndicates, national startup expo, and ₹3 Lakhs in seed grants awarded to top collegiate ventures.",
    image: "/images/image2.png",
    registrationLink: "https://unstop.com",
    isUpcoming: false,
    isOngoing: false,
    isCompleted: true,
    statusBadge: "Completed",
  },
  {
    id: "treasure-hunt",
    title: "THE GREAT CAMPUS TREASURE HUNT: E-CELL QUEST",
    shortTitle: "Treasure Hunt",
    month: "NOVEMBER",
    monthNumber: 11,
    year: 2026,
    dayOfWeek: "SAT",
    dayNumber: "07",
    fullDate: "November 07, 2026",
    time: "09:30 AM – 03:00 PM IST",
    venue: "Central Amphitheatre & Campus Complex, Jamia Millia Islamia",
    category: "Campus Adventure",
    tags: ["TREASURE HUNT", "CAMPUS QUEST", "CASH & MERCH", "TEAM CHALLENGE"],
    description:
      "Jamia's signature campus-wide entrepreneurial riddle rally. Decrypt cryptographic clues, race across historical campus checkpoints, and solve fast-paced startup mini-games against 100+ competing squads.",
    image: "/images/events/treasure-hunt.jpg",
    registrationLink: "https://unstop.com",
    isUpcoming: true,
    isOngoing: false,
    isCompleted: false,
    statusBadge: "Squad Entries Open",
  },
];

// Helper to query database or return placeholders seamlessly
export async function getEvents(): Promise<EventItem[]> {
  try {
    const dbEvents = await (prisma.event as any).findMany();

    if (dbEvents && dbEvents.length > 0) {
      const mapped = dbEvents.map((e: any) => {
        const month =
          e.month ||
          (e.date ? new Date(e.date).toLocaleString("en-US", { month: "long" }).toUpperCase() : "OCTOBER");
        const monthNumber =
          Number(e.monthNumber) || (e.date ? new Date(e.date).getMonth() + 1 : 10);
        const year =
          Number(e.year) || (e.date ? new Date(e.date).getFullYear() : 2026);
        const dayOfWeek =
          e.dayOfWeek ||
          (e.date ? new Date(e.date).toLocaleString("en-US", { weekday: "short" }).toUpperCase() : "SAT");
        const dayNumber =
          e.dayNumber ||
          (e.date ? String(new Date(e.date).getDate()).padStart(2, "0") : "01");
        const fullDate =
          e.fullDate ||
          (e.date
            ? new Date(e.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
            : "");
        const time =
          e.time ||
          (e.date ? new Date(e.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "10:00 AM IST");

        return {
          id: e.id,
          title: String(e.title || "Untitled Event").toUpperCase(),
          shortTitle: e.shortTitle || e.title,
          month,
          monthNumber,
          year,
          dayOfWeek,
          dayNumber,
          fullDate,
          time,
          venue: e.venue || "Jamia Millia Islamia, New Delhi",
          category: e.category || "Featured Event",
          tags: Array.isArray(e.tags) ? e.tags : ["E-CELL EVENT", month],
          description: e.description || "",
          image: e.image || "/images/events/enord-case-com.jpg",
          registrationLink: e.registrationLink || "https://unstop.com",
          isUpcoming: e.isUpcoming ?? true,
          isOngoing: e.isOngoing ?? false,
          isCompleted: e.isCompleted ?? false,
          statusBadge: e.statusBadge || (e.isOngoing ? "Live Now" : e.isCompleted ? "Completed" : "Upcoming"),
        };
      });

      return mapped.sort(
        (a: EventItem, b: EventItem) =>
          a.monthNumber - b.monthNumber || Number(a.dayNumber) - Number(b.dayNumber)
      );
    }
  } catch (err) {
    console.warn("Database query for events fallback to placeholder:", err);
  }

  return PLACEHOLDER_EVENTS;
}
