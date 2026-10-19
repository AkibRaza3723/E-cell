"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  Search,
  Sparkles,
} from "lucide-react";
import { EventItem } from "@/lib/events-data";

interface EventsListViewProps {
  initialEvents: EventItem[];
}

type StatusFilter = "ALL" | "UPCOMING" | "ONGOING" | "COMPLETED";

export function EventsListView({ initialEvents }: EventsListViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Status counts for badge tabs
  const statusCounts = useMemo(() => {
    return {
      ALL: initialEvents.length,
      UPCOMING: initialEvents.filter((e) => e.isUpcoming).length,
      ONGOING: initialEvents.filter((e) => e.isOngoing).length,
      COMPLETED: initialEvents.filter((e) => e.isCompleted).length,
    };
  }, [initialEvents]);

  // Extract unique months in chronological order
  const monthTabs = useMemo(() => {
    const months = Array.from(new Set(initialEvents.map((e) => e.month)));
    return ["ALL", ...months];
  }, [initialEvents]);

  // Filtered events based on status, month selection, and search query
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((item) => {
      // Status filter
      const matchesStatus =
        selectedStatus === "ALL" ||
        (selectedStatus === "UPCOMING" && item.isUpcoming) ||
        (selectedStatus === "ONGOING" && item.isOngoing) ||
        (selectedStatus === "COMPLETED" && item.isCompleted);

      // Month filter
      const matchesMonth =
        selectedMonth === "ALL" || item.month.toUpperCase() === selectedMonth.toUpperCase();

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.shortTitle && item.shortTitle.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.venue.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchesStatus && matchesMonth && matchesQuery;
    });
  }, [initialEvents, selectedStatus, selectedMonth, searchQuery]);

  // Group events by Month for editorial section display
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: EventItem[] } = {};
    for (const evt of filteredEvents) {
      if (!groups[evt.month]) {
        groups[evt.month] = [];
      }
      groups[evt.month].push(evt);
    }
    return groups;
  }, [filteredEvents]);

  return (
    <div className="w-full">
      {/* Control Header: Status Pills & Search Bar */}
      <div className="mb-10 space-y-4">
        
        {/* Primary Filter Bar: Status Tabs (All, Upcoming, Ongoing, Completed) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.55)]">
          
          {/* Status Tabs with Dynamic Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none select-none">
            {(
              [
                { key: "ALL", label: "All Events", count: statusCounts.ALL },
                { key: "UPCOMING", label: "Upcoming", count: statusCounts.UPCOMING },
                { key: "ONGOING", label: "Ongoing", count: statusCounts.ONGOING },
                { key: "COMPLETED", label: "Completed", count: statusCounts.COMPLETED },
              ] as { key: StatusFilter; label: string; count: number }[]
            ).map((tab) => {
              const isActive = selectedStatus === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedStatus(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-[0_0_20px_rgba(255,100,0,0.4)]"
                      : "text-white/65 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-black/35 text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, tag, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.06] border border-white/15 hover:border-white/25 focus:border-amber-400/60 focus:outline-none text-xs font-sans text-white placeholder-white/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Secondary Sub-filter: Month Selector */}
        {monthTabs.length > 2 && (
          <div className="flex items-center gap-2 px-2 overflow-x-auto scrollbar-none select-none text-xs font-mono">
            <span className="text-white/40 uppercase tracking-widest text-[10px] mr-1">Filter Month:</span>
            {monthTabs.map((month) => {
              const isSelected = selectedMonth === month;
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold"
                      : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {month === "ALL" ? "All Months" : month}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Events Grouped by Month / Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="py-24 px-6 text-center rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15">
          <Calendar className="w-12 h-12 text-amber-400/60 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-white mb-2">No Events Found</h3>
          <p className="text-sm text-white/60 font-sans max-w-md mx-auto mb-6">
            {initialEvents.length === 0
              ? "No events have been published yet. Events uploaded through the Admin Portal will appear here."
              : "No events match your current filter or search criteria. Try resetting your filters."}
          </p>
          {initialEvents.length > 0 && (
            <button
              onClick={() => {
                setSelectedStatus("ALL");
                setSelectedMonth("ALL");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full glow-orange-button text-white text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
            >
              Show All Events
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-14">
          {Object.entries(groupedEvents).map(([month, events]) => (
          <section key={month} className="relative">
            
            {/* Month Header Banner with Solid Black Box & Extended Horizontal Rule */}
            <div className="flex items-center gap-4 sm:gap-6 mb-8 select-none">
              <div className="px-6 py-2.5 rounded-lg bg-black/90 border border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.5)] shrink-0">
                <span className="font-heading font-black text-xs sm:text-sm tracking-[0.28em] text-white uppercase">
                  {month}
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
            </div>

            {/* List of Events within this Month */}
            <div className="space-y-5 sm:space-y-6">
              {events.map((event) => (
                <article
                  key={event.id}
                  className={`group relative p-5 sm:p-7 lg:p-8 rounded-[1.75rem] backdrop-blur-2xl border transition-all duration-300 overflow-hidden ${
                    event.isCompleted
                      ? "bg-black/50 border-white/10 hover:border-white/25 opacity-90 hover:opacity-100 shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
                      : event.isOngoing
                      ? "bg-black/65 border-emerald-500/35 hover:border-emerald-400/60 shadow-[0_15px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(16,185,129,0.15)]"
                      : "bg-black/60 border-white/15 hover:border-amber-400/50 shadow-[0_15px_45px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.7),0_0_35px_rgba(255,100,0,0.2)]"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10">
                    
                    {/* 1. Date Column: Day abbreviation on top, Large numeric date underneath */}
                    <div className="flex flex-row md:flex-col items-baseline md:items-center justify-between w-full md:w-20 shrink-0 select-none pb-2 md:pb-0 border-b md:border-b-0 border-white/10">
                      <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-300/90 font-bold">
                        {event.dayOfWeek}
                      </span>
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none drop-shadow-md">
                        {event.dayNumber}
                      </span>
                      <span className="md:hidden text-xs font-mono text-white/50">
                        {event.time}
                      </span>
                    </div>

                    {/* 2. Event Thumbnail Image */}
                    <div className="relative w-full sm:w-64 md:w-60 lg:w-72 aspect-[16/10] rounded-xl overflow-hidden bg-black/50 border border-white/15 shrink-0 shadow-lg group-hover:border-amber-400/50 group-hover:shadow-[0_10px_30px_rgba(255,100,0,0.25)] transition-all duration-500">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Subtle Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Status Badge in Top Corner */}
                      <div className="absolute top-2.5 left-2.5">
                        {event.isOngoing ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Ongoing</span>
                          </span>
                        ) : event.isCompleted ? (
                          <span className="px-2.5 py-1 rounded-full bg-zinc-800/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300 inline-flex items-center gap-1.5">
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-300 inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>{event.statusBadge || "Upcoming"}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 3. Event Details Middle Column */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black uppercase text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                          {event.title}
                        </h3>

                        {/* Venue & Location with Pin */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200 font-sans mt-2 mb-2.5">
                          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>

                        {/* Concise 2-line Description */}
                        <p className="text-xs sm:text-sm text-zinc-300/90 font-sans leading-relaxed line-clamp-2 mb-4">
                          {event.description}
                        </p>
                      </div>

                      {/* Tags / Category Pills */}
                      <div className="flex flex-wrap items-center gap-2">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/[0.08] border border-white/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/90 group-hover:border-amber-400/40 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. Right Angled Arrow Icon (Matching reference image) */}
                    <div className="w-full md:w-auto flex items-center justify-end md:justify-center shrink-0 pt-2 md:pt-0">
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Action for ${event.title}`}
                        className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer ${
                          event.isCompleted
                            ? "bg-white/[0.05] hover:bg-white/[0.15] border-white/15 text-zinc-300"
                            : event.isOngoing
                            ? "bg-emerald-500/15 hover:bg-emerald-500/30 border-emerald-400/40 text-emerald-300"
                            : "bg-white/[0.08] hover:bg-amber-500/25 border-white/20 hover:border-amber-400/50 text-amber-300"
                        }`}
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform" />
                      </a>
                    </div>

                  </div>
                </article>
              ))}
            </div>

          </section>
        ))}
        </div>
      )}
    </div>
  );
}
