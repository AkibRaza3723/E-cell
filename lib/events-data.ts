import { prisma } from "@/lib/db";

export interface EventItem {
  id: string;
  title: string;
  shortTitle?: string;
  month: string;
  monthNumber: number;
  year: number;
  dayOfWeek: string;
  dayNumber: string;
  fullDate: string;
  time: string;
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

export async function getEvents(): Promise<EventItem[]> {
  try {
    if (!prisma?.event) return [];

    const dbEvents = await prisma.event.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    if (!dbEvents || dbEvents.length === 0) {
      return [];
    }

    const mapped: EventItem[] = dbEvents.map((e) => {
      const month = e.month || "UPCOMING";
      const monthNumber = Number(e.monthNumber) || 1;
      const year = Number(e.year) || new Date(e.createdAt).getFullYear();
      const dayOfWeek = e.dayOfWeek || "";
      const dayNumber = e.dayNumber || "";
      const fullDate = e.fullDate || "";
      const time = e.time || "";

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
        tags: Array.isArray(e.tags) && e.tags.length > 0 ? e.tags : ["E-CELL"],
        description: e.description || "",
        image: e.image || "/images/ecelllogo.png",
        registrationLink: e.registrationLink || "https://unstop.com",
        isUpcoming: e.isUpcoming ?? true,
        isOngoing: e.isOngoing ?? false,
        isCompleted: e.isCompleted ?? false,
        statusBadge:
          e.statusBadge ||
          (e.isOngoing ? "Live Now" : e.isCompleted ? "Completed" : "Upcoming"),
      };
    });

    return mapped.sort((a, b) => {
      if (a.monthNumber !== b.monthNumber) {
        return a.monthNumber - b.monthNumber;
      }
      return Number(a.dayNumber || 0) - Number(b.dayNumber || 0);
    });
  } catch (err) {
    console.error("Database query error for events:", err);
    return [];
  }
}
