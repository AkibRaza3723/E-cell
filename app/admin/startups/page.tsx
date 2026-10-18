import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { getStartupsList } from "@/lib/actions/startups-actions";
import { StartupsManager } from "@/components/admin/startups-manager";

export default async function AdminStartupsPage() {
  await requireAdminSession();
  const startups = await getStartupsList();

  return <StartupsManager initialStartups={startups as any} />;
}
