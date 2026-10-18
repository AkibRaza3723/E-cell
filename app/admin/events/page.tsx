import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { getEventsList } from "@/lib/actions/events-actions";
import { EventsManager } from "@/components/admin/events-manager";

export default async function AdminEventsPage() {
  await requireAdminSession();
  const events = await getEventsList();

  return <EventsManager initialEvents={events as any} />;
}
