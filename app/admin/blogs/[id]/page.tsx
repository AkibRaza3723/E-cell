import React from "react";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { getBlogById } from "@/lib/actions/blogs-actions";
import { BlogForm } from "@/components/admin/blog-form";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  await requireAdminSession();
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return <BlogForm isEdit={true} initialData={blog as any} />;
}
