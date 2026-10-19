import { prisma } from "@/lib/db";

export interface BlogItem {
  id: string;
  title: string;
  image: string;
  authorName: string;
  authorSubtitle: string;
  link: string;
  slug?: string | null;
  excerpt?: string | null;
  createdAt?: Date;
}

export async function getBlogs(): Promise<BlogItem[]> {
  try {
    if (!prisma?.blogs) return [];

    const dbBlogs = await prisma.blogs.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    if (!dbBlogs || dbBlogs.length === 0) {
      return [];
    }

    return dbBlogs.map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      link: b.link?.trim() || "#",
      image: b.coverImage?.trim() || "/images/ecelllogo.png",
      authorName: b.authorName?.trim() || "E-Cell JMI",
      authorSubtitle: "Creating Job Creators",
      createdAt: b.createdAt,
    }));
  } catch (err) {
    console.error("Database query for blogs error:", err);
    return [];
  }
}
