import { prisma } from "@/lib/db";

export interface BlogItem {
  id: string;
  title: string;
  image: string;
  authorName: string;
  authorSubtitle: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string;
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
      content: b.content,
      image: b.coverImage?.trim() || "/images/events/enord-case-com.jpg",
      authorName: b.authorName?.trim() || "E-Cell JMI",
      authorSubtitle: "Creating Job Creators",
      createdAt: b.createdAt,
    }));
  } catch (err) {
    console.error("Database query for blogs error:", err);
    return [];
  }
}
