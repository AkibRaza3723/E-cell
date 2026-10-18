import React from "react";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { getStartupById } from "@/lib/actions/startups-actions";
import { StartupForm } from "@/components/admin/startup-form";

interface EditStartupPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStartupPage({
  params,
}: EditStartupPageProps) {
  await requireAdminSession();
  const { id } = await params;
  const startup = await getStartupById(id);

  if (!startup) {
    notFound();
  }

  return <StartupForm isEdit={true} initialData={startup as any} />;
}
