import { prisma } from "@/lib/db";

export interface BlogItem {
  id: string;
  title: string;
  image: string;
  authorName: string;
  authorSubtitle: string;
}

export const PLACEHOLDER_BLOGS: BlogItem[] = [
  {
    id: "blog-1",
    title: "Eureka!2025 startups at Global Accelerators and TigerLaunch",
    image: "/images/events/enord-case-com.jpg",
    authorName: "E-Cell JMI",
    authorSubtitle: "Creating Job Creators",
  },
  {
    id: "blog-2",
    title: "E-Cell Alums in Forbes 30 Under 30: Building DeepTech Ventures",
    image: "/images/events/ceo-roundtable.jpg",
    authorName: "E-Cell JMI",
    authorSubtitle: "Creating Job Creators",
  },
  {
    id: "blog-3",
    title: "The humongous scale of Autonomous Hardware & Second-Life Energy",
    image: "/images/events/women-empowerment.jpg",
    authorName: "E-Cell JMI",
    authorSubtitle: "Creating Job Creators",
  },
];

export async function getBlogs(): Promise<BlogItem[]> {
  try {
    const dbBlogs = await (prisma as any).blogs.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map((b: any, index: number) => ({
        id: b.id || `blog-${index + 1}`,
        title: b.title || PLACEHOLDER_BLOGS[index % PLACEHOLDER_BLOGS.length].title,
        image:
          b.image ||
          (b.content && b.content.startsWith("http")
            ? b.content
            : PLACEHOLDER_BLOGS[index % PLACEHOLDER_BLOGS.length].image),
        authorName: "E-Cell JMI",
        authorSubtitle: "Creating Job Creators",
      }));
    }
  } catch (err) {
    console.warn("Database query for blogs fallback to placeholder:", err);
  }

  return PLACEHOLDER_BLOGS;
}
