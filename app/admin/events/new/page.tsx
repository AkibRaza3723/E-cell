import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { EventForm } from "@/components/admin/event-form";

export default async function NewEventPage() {
  await requireAdminSession();

  return <EventForm isEdit={false} />;
}
