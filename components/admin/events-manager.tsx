"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Trash2,
  Edit,
  Search,
  ExternalLink,
  MapPin,
  Clock,
  AlertCircle,
  Check,
  Tag,
} from "lucide-react";
import { deleteEvent } from "@/lib/actions/events-actions";

interface EventItem {
  id: string;
  title: string;
  slug?: string | null;
  category?: string | null;
  fullDate?: string | null;
  time?: string | null;
  venue?: string | null;
  statusBadge: string;
  published: boolean;
  description: string;
  image?: string | null;
  registrationLink?: string | null;
}

interface EventsManagerProps {
  initialEvents: EventItem[];
}

export function EventsManager({ initialEvents }: EventsManagerProps) {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.category && e.category.toLowerCase().includes(search.toLowerCase())) ||
      (e.venue && e.venue.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Upcoming" && (e.statusBadge === "Upcoming" || e.statusBadge === "Registrations Open")) ||
      (statusFilter === "Live" && e.statusBadge === "Live Now") ||
      (statusFilter === "Completed" && e.statusBadge === "Completed");

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    setError(null);
    try {
      const res = await deleteEvent(id);
      if (res.success) {
        setEvents(events.filter((item) => item.id !== id));
        setDeleteConfirmId(null);
        setSuccessMsg("Event deleted successfully");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setError(res.error || "Failed to delete event");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to delete event");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Society Events
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Publish, update, schedule, and track all entrepreneurship events and summits.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.45)]"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </Link>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950/60 border border-white/[0.08] p-3 rounded-2xl backdrop-blur-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title, category, venue..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {["All", "Upcoming", "Live", "Completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                statusFilter === s
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-zinc-950/40 backdrop-blur-xl">
          <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-300">
            No Events Found
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {search || statusFilter !== "All"
              ? "No events matched your current search criteria."
              : "Create your first society event to publish it on the site."}
          </p>
          <Link
            href="/admin/events/new"
            className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Event</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="group relative rounded-2xl bg-zinc-950/70 border border-white/[0.07] hover:border-orange-500/30 p-5 backdrop-blur-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {evt.image ? (
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-16 h-16 rounded-xl object-cover bg-zinc-800 border border-white/10 shrink-0 hidden sm:block"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 hidden sm:flex">
                    <Calendar className="w-6 h-6" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                      {evt.statusBadge}
                    </span>
                    {evt.category && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-zinc-300 border border-white/10">
                        {evt.category}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        evt.published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      {evt.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-base group-hover:text-orange-400 transition-colors truncate">
                    {evt.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-zinc-400">
                    {evt.fullDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {evt.fullDate}
                      </span>
                    )}
                    {evt.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {evt.time}
                      </span>
                    )}
                    {evt.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {evt.venue}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 border-t md:border-t-0 border-white/[0.05] pt-3 md:pt-0 w-full md:w-auto justify-end">
                {evt.registrationLink && (
                  <a
                    href={evt.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-zinc-400 hover:text-orange-400 hover:bg-white/[0.04] transition-colors"
                    title="Registration Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <Link
                  href={`/admin/events/${evt.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 border border-white/10 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                {deleteConfirmId === evt.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(evt.id)}
                      disabled={isDeletingId === evt.id}
                      className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all"
                    >
                      {isDeletingId === evt.id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(evt.id)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
