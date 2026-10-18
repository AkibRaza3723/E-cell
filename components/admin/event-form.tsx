"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Check, Calendar, MapPin, Clock, Tag } from "lucide-react";
import { createEvent, updateEvent, EventInput } from "@/lib/actions/events-actions";

interface EventFormProps {
  initialData?: (EventInput & { id: string }) | null;
  isEdit?: boolean;
}

export function EventForm({ initialData, isEdit = false }: EventFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [shortTitle, setShortTitle] = useState(initialData?.shortTitle || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Flagship Summit");
  const [month, setMonth] = useState(initialData?.month || "OCT");
  const [monthNumber, setMonthNumber] = useState(initialData?.monthNumber || 10);
  const [year, setYear] = useState(initialData?.year || 2026);
  const [dayOfWeek, setDayOfWeek] = useState(initialData?.dayOfWeek || "SAT");
  const [dayNumber, setDayNumber] = useState(initialData?.dayNumber || "24");
  const [fullDate, setFullDate] = useState(initialData?.fullDate || "October 24, 2026");
  const [time, setTime] = useState(initialData?.time || "10:00 AM - 4:00 PM");
  const [venue, setVenue] = useState(initialData?.venue || "Mir Anis Hall, JMI Campus");
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") || "Founders, Pitching, Grants");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [registrationLink, setRegistrationLink] = useState(initialData?.registrationLink || "");
  const [statusBadge, setStatusBadge] = useState(initialData?.statusBadge || "Upcoming");
  const [isUpcoming, setIsUpcoming] = useState(initialData?.isUpcoming ?? true);
  const [isOngoing, setIsOngoing] = useState(initialData?.isOngoing ?? false);
  const [isCompleted, setIsCompleted] = useState(initialData?.isCompleted ?? false);
  const [published, setPublished] = useState(initialData?.published ?? true);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!title.trim()) {
      setError("Event title is required");
      setSubmitting(false);
      return;
    }
    if (!description.trim()) {
      setError("Event description is required");
      setSubmitting(false);
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const eventPayload: EventInput = {
      title,
      shortTitle,
      slug,
      category,
      month,
      monthNumber: Number(monthNumber),
      year: Number(year),
      dayOfWeek,
      dayNumber,
      fullDate,
      time,
      venue,
      tags,
      description,
      image,
      registrationLink,
      statusBadge,
      isUpcoming,
      isOngoing,
      isCompleted,
      published,
    };

    try {
      if (isEdit && initialData?.id) {
        const res = await updateEvent(initialData.id, eventPayload);
        if (!res.success) {
          setError(res.error || "Failed to update event");
          setSubmitting(false);
          return;
        }
      } else {
        const res = await createEvent(eventPayload);
        if (!res.success) {
          setError(res.error || "Failed to create event");
          setSubmitting(false);
          return;
        }
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button & Heading */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">
              {isEdit ? "Edit Society Event" : "Create New Event"}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEdit
                ? `Updating event: ${initialData?.title}`
                : "Schedule and announce a new workshop, hackathon, or summit."}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl space-y-6"
      >
        {/* Core Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-400 border-b border-white/[0.06] pb-2">
            1. Core Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Global Entrepreneurship Summit 2026"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Short Display Title
              </label>
              <input
                type="text"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
                placeholder="e.g. E-Summit '26"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Slug (URL identifier)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="global-entrepreneurship-summit-2026"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              >
                <option value="Flagship Summit">Flagship Summit</option>
                <option value="Pitch Competition">Pitch Competition</option>
                <option value="Workshop & Masterclass">Workshop & Masterclass</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Founder Meetup">Founder Meetup</option>
                <option value="Investor Panel">Investor Panel</option>
              </select>
            </div>
          </div>
        </div>

        {/* Date & Location */}
        <div className="space-y-4 pt-4 border-t border-white/[0.06]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-400 border-b border-white/[0.06] pb-2">
            2. Date, Time & Venue
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Month (Short)
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value.toUpperCase())}
                placeholder="OCT"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Day Number
              </label>
              <input
                type="text"
                value={dayNumber}
                onChange={(e) => setDayNumber(e.target.value)}
                placeholder="24"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Day of Week
              </label>
              <input
                type="text"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value.toUpperCase())}
                placeholder="SAT"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                placeholder="2026"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Full Display Date
              </label>
              <input
                type="text"
                value={fullDate}
                onChange={(e) => setFullDate(e.target.value)}
                placeholder="October 24, 2026"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Time Duration
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM - 5:00 PM"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Venue Location
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Mir Anis Hall, JMI"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>
        </div>

        {/* Description & Links */}
        <div className="space-y-4 pt-4 border-t border-white/[0.06]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-400 border-b border-white/[0.06] pb-2">
            3. Content & Registration
          </h2>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Event Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the agenda, keynote speakers, prize pool, or eligibility..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Registration / Ticket URL
              </label>
              <input
                type="url"
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
                placeholder="https://unstop.com/... or Google Form"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Cover Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://... cover poster"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Funding, Hackathon, Mentorship"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
            />
          </div>
        </div>

        {/* Status & Publication Toggles */}
        <div className="space-y-4 pt-4 border-t border-white/[0.06]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-400 border-b border-white/[0.06] pb-2">
            4. Status & Publication
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Status Badge
              </label>
              <select
                value={statusBadge}
                onChange={(e) => setStatusBadge(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Live Now">Live Now</option>
                <option value="Completed">Completed</option>
                <option value="Registrations Open">Registrations Open</option>
                <option value="Housefull">Housefull</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="relative flex items-center gap-2 cursor-pointer select-none text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={isUpcoming}
                  onChange={(e) => setIsUpcoming(e.target.checked)}
                  className="rounded border-zinc-700 text-orange-500 focus:ring-orange-500 w-4 h-4 bg-zinc-900"
                />
                <span>Is Upcoming</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="relative flex items-center gap-2 cursor-pointer select-none text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-zinc-700 text-orange-500 focus:ring-orange-500 w-4 h-4 bg-zinc-900"
                />
                <span className="font-semibold text-orange-400">Published to Website</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-end gap-3">
          <Link
            href="/admin/events"
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] disabled:opacity-60 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Event"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
