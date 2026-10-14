import { Suspense } from "react";

interface PageProps {
  params: Promise<{ events: string }>;
}

async function EventDetails({ params }: PageProps) {
  const { events } = await params;

  return (
    <div className="text-2xl text-white text-center mt-44">
      name = {events}
    </div>
  );
}

export default function Events({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="text-white text-center mt-44">Loading member...</div>}>
      <EventDetails params={params} />
    </Suspense>
  );
}
