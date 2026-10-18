import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { BlogForm } from "@/components/admin/blog-form";

export default async function NewBlogPage() {
  await requireAdminSession();

  return <BlogForm isEdit={false} />;
}
