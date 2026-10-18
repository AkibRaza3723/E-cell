import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { getBlogsList } from "@/lib/actions/blogs-actions";
import { BlogsManager } from "@/components/admin/blogs-manager";

export default async function AdminBlogsPage() {
  await requireAdminSession();
  const blogs = await getBlogsList();

  return <BlogsManager initialBlogs={blogs as any} />;
}
