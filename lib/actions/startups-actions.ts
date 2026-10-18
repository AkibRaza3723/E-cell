"use server";

import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export interface StartupInput {
  name: string;
  slug?: string;
  description: string;
  website?: string;
  logo?: string;
  founder?: string;
  category?: string;
  published?: boolean;
}

export async function getStartupsList() {
  try {
    if (!prisma?.startup) return [];
    return await prisma.startup.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch startups:", error);
    return [];
  }
}

export async function getStartupById(id: string) {
  try {
    if (!prisma?.startup) return null;
    return await prisma.startup.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch startup by id:", error);
    return null;
  }
}

export async function createStartup(data: StartupInput) {
  await requireAdminSession();

  const generatedSlug =
    data.slug?.trim() ||
    data.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  try {
    const startup = await prisma.startup.create({
      data: {
        name: data.name.trim(),
        slug: generatedSlug,
        description: data.description.trim(),
        website: data.website?.trim() || null,
        logo: data.logo?.trim() || null,
        founder: data.founder?.trim() || null,
        category: data.category?.trim() || "Technology",
        published: data.published ?? true,
      },
    });

    revalidatePath("/admin/startups");
    revalidatePath("/startup");
    return { success: true, startup };
  } catch (error: any) {
    console.error("Failed to create startup:", error);
    return {
      success: false,
      error: error.message || "Failed to create startup",
    };
  }
}

export async function updateStartup(id: string, data: Partial<StartupInput>) {
  await requireAdminSession();

  try {
    const startup = await prisma.startup.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name.trim() }),
        ...(data.slug !== undefined && { slug: data.slug.trim() }),
        ...(data.description !== undefined && { description: data.description.trim() }),
        ...(data.website !== undefined && { website: data.website?.trim() || null }),
        ...(data.logo !== undefined && { logo: data.logo?.trim() || null }),
        ...(data.founder !== undefined && { founder: data.founder?.trim() || null }),
        ...(data.category !== undefined && { category: data.category?.trim() || null }),
        ...(data.published !== undefined && { published: data.published }),
      },
    });

    revalidatePath("/admin/startups");
    revalidatePath("/startup");
    return { success: true, startup };
  } catch (error: any) {
    console.error("Failed to update startup:", error);
    return {
      success: false,
      error: error.message || "Failed to update startup",
    };
  }
}

export async function deleteStartup(id: string) {
  await requireAdminSession();

  try {
    await prisma.startup.delete({
      where: { id },
    });

    revalidatePath("/admin/startups");
    revalidatePath("/startup");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete startup:", error);
    return {
      success: false,
      error: error.message || "Failed to delete startup",
    };
  }
}
