"use server";

import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export interface MemberData {
  id?: string;
  name: string;
  slug: string;
  team: string;
  role: string;
  batch: string;
  faculty: string;
  Avatar: string;
  linkedin: string;
  github?: string | null;
  email?: string | null;
  bio?: string | null;
}

export async function getMembersList() {
  try {
    if (!prisma?.members) return [];
    return await prisma.members.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

export async function createMember(data: {
  name: string;
  slug?: string;
  team: string;
  role?: string;
  batch: string;
  faculty: string;
  Avatar: string;
  linkedin: string;
  github?: string;
  email?: string;
  bio?: string;
}) {
  await requireAdminSession();

  const generatedSlug =
    data.slug?.trim() ||
    data.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  try {
    const member = await prisma.members.create({
      data: {
        name: data.name.trim(),
        slug: generatedSlug,
        team: data.team.trim(),
        role: data.role?.trim() || "Core Team Member",
        batch: data.batch.trim(),
        faculty: data.faculty.trim(),
        Avatar: data.Avatar.trim() || "/placeholder-avatar.png",
        linkedin: data.linkedin.trim(),
        github: data.github?.trim() || null,
        email: data.email?.trim() || null,
        bio: data.bio?.trim() || null,
      },
    });

    revalidatePath("/admin/members");
    revalidatePath("/teams");
    return { success: true, member };
  } catch (error: any) {
    console.error("Failed to create member:", error);
    return {
      success: false,
      error: error.message || "Failed to create member",
    };
  }
}

export async function deleteMember(id: string) {
  await requireAdminSession();

  try {
    await prisma.members.delete({
      where: { id },
    });

    revalidatePath("/admin/members");
    revalidatePath("/teams");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete member:", error);
    return {
      success: false,
      error: error.message || "Failed to delete member",
    };
  }
}
