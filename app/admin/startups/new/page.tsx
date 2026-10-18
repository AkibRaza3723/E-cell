import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { StartupForm } from "@/components/admin/startup-form";

export default async function NewStartupPage() {
  await requireAdminSession();

  return <StartupForm isEdit={false} />;
}
