"use server";

import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export interface BlogInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  authorName?: string;
  published?: boolean;
}

export async function getBlogsList() {
  try {
    if (!prisma?.blogs) return [];
    return await prisma.blogs.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    if (!prisma?.blogs) return null;
    return await prisma.blogs.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch blog by id:", error);
    return null;
  }
}

export async function createBlog(data: BlogInput) {
  await requireAdminSession();

  const generatedSlug =
    data.slug?.trim() ||
    data.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  try {
    const blog = await prisma.blogs.create({
      data: {
        title: data.title.trim(),
        slug: generatedSlug,
        excerpt: data.excerpt?.trim() || null,
        content: data.content.trim(),
        coverImage: data.coverImage?.trim() || null,
        authorName: data.authorName?.trim() || "E-Cell JMI",
        published: data.published ?? true,
      },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    return { success: true, blog };
  } catch (error: any) {
    console.error("Failed to create blog post:", error);
    return {
      success: false,
      error: error.message || "Failed to create blog post",
    };
  }
}

export async function updateBlog(id: string, data: Partial<BlogInput>) {
  await requireAdminSession();

  try {
    const blog = await prisma.blogs.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        ...(data.slug !== undefined && { slug: data.slug.trim() }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt?.trim() || null }),
        ...(data.content !== undefined && { content: data.content.trim() }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage?.trim() || null }),
        ...(data.authorName !== undefined && { authorName: data.authorName.trim() }),
        ...(data.published !== undefined && { published: data.published }),
      },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    return { success: true, blog };
  } catch (error: any) {
    console.error("Failed to update blog post:", error);
    return {
      success: false,
      error: error.message || "Failed to update blog post",
    };
  }
}

export async function deleteBlog(id: string) {
  await requireAdminSession();

  try {
    await prisma.blogs.delete({
      where: { id },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete blog post:", error);
    return {
      success: false,
      error: error.message || "Failed to delete blog post",
    };
  }
}
