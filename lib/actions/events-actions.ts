"use server";

import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export interface EventInput {
  title: string;
  slug?: string;
  shortTitle?: string;
  month?: string;
  monthNumber?: number;
  year?: number;
  dayOfWeek?: string;
  dayNumber?: string;
  fullDate?: string;
  time?: string;
  venue?: string;
  category?: string;
  tags?: string[];
  description: string;
  image?: string;
  registrationLink?: string;
  isUpcoming?: boolean;
  isOngoing?: boolean;
  isCompleted?: boolean;
  statusBadge?: string;
  published?: boolean;
}

export async function getEventsList() {
  try {
    if (!prisma?.event) return [];
    return await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getEventById(id: string) {
  try {
    if (!prisma?.event) return null;
    return await prisma.event.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch event by id:", error);
    return null;
  }
}

export async function createEvent(data: EventInput) {
  await requireAdminSession();

  const generatedSlug =
    data.slug?.trim() ||
    data.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  try {
    const event = await prisma.event.create({
      data: {
        title: data.title.trim(),
        slug: generatedSlug,
        shortTitle: data.shortTitle?.trim() || null,
        month: data.month?.trim() || null,
        monthNumber: data.monthNumber || null,
        year: data.year || null,
        dayOfWeek: data.dayOfWeek?.trim() || null,
        dayNumber: data.dayNumber?.trim() || null,
        fullDate: data.fullDate?.trim() || null,
        time: data.time?.trim() || null,
        venue: data.venue?.trim() || null,
        category: data.category?.trim() || "General",
        tags: data.tags || [],
        description: data.description.trim(),
        image: data.image?.trim() || null,
        registrationLink: data.registrationLink?.trim() || null,
        isUpcoming: data.isUpcoming ?? true,
        isOngoing: data.isOngoing ?? false,
        isCompleted: data.isCompleted ?? false,
        statusBadge: data.statusBadge?.trim() || "Upcoming",
        published: data.published ?? true,
      },
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");
    return { success: true, event };
  } catch (error: any) {
    console.error("Failed to create event:", error);
    return {
      success: false,
      error: error.message || "Failed to create event",
    };
  }
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
  await requireAdminSession();

  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        ...(data.slug !== undefined && { slug: data.slug.trim() }),
        ...(data.shortTitle !== undefined && { shortTitle: data.shortTitle?.trim() || null }),
        ...(data.month !== undefined && { month: data.month?.trim() || null }),
        ...(data.monthNumber !== undefined && { monthNumber: data.monthNumber }),
        ...(data.year !== undefined && { year: data.year }),
        ...(data.dayOfWeek !== undefined && { dayOfWeek: data.dayOfWeek?.trim() || null }),
        ...(data.dayNumber !== undefined && { dayNumber: data.dayNumber?.trim() || null }),
        ...(data.fullDate !== undefined && { fullDate: data.fullDate?.trim() || null }),
        ...(data.time !== undefined && { time: data.time?.trim() || null }),
        ...(data.venue !== undefined && { venue: data.venue?.trim() || null }),
        ...(data.category !== undefined && { category: data.category?.trim() || null }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.description !== undefined && { description: data.description.trim() }),
        ...(data.image !== undefined && { image: data.image?.trim() || null }),
        ...(data.registrationLink !== undefined && {
          registrationLink: data.registrationLink?.trim() || null,
        }),
        ...(data.isUpcoming !== undefined && { isUpcoming: data.isUpcoming }),
        ...(data.isOngoing !== undefined && { isOngoing: data.isOngoing }),
        ...(data.isCompleted !== undefined && { isCompleted: data.isCompleted }),
        ...(data.statusBadge !== undefined && { statusBadge: data.statusBadge.trim() }),
        ...(data.published !== undefined && { published: data.published }),
      },
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");
    return { success: true, event };
  } catch (error: any) {
    console.error("Failed to update event:", error);
    return {
      success: false,
      error: error.message || "Failed to update event",
    };
  }
}

export async function deleteEvent(id: string) {
  await requireAdminSession();

  try {
    await prisma.event.delete({
      where: { id },
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete event:", error);
    return {
      success: false,
      error: error.message || "Failed to delete event",
    };
  }
}
