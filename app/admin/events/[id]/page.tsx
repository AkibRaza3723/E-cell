import React from "react";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { getEventById } from "@/lib/actions/events-actions";
import { EventForm } from "@/components/admin/event-form";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  await requireAdminSession();
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventForm isEdit={true} initialData={event as any} />;
}
