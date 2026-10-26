import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogsSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Masthead Skeleton */}
      <header className="mb-12 sm:mb-16 pb-8 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-5 w-24 rounded-full bg-orange-500/20" />
            <Skeleton className="h-12 sm:h-16 w-72 sm:w-[480px] rounded-2xl bg-white/[0.08]" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full max-w-xl rounded-lg bg-white/[0.06]" />
              <Skeleton className="h-4 w-3/4 max-w-md rounded-lg bg-white/[0.06]" />
            </div>
          </div>

          <Skeleton className="h-11 w-48 rounded-full bg-orange-500/30 shrink-0" />
        </div>
      </header>

      {/* Filter Bar Skeleton */}
      <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/15">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-8 w-20 rounded-full bg-white/[0.08] shrink-0"
            />
          ))}
        </div>
        <Skeleton className="h-9 w-full sm:w-72 rounded-xl bg-white/[0.06]" />
      </div>

      {/* Publications Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/15 overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Image Frame Skeleton */}
              <div className="relative w-full aspect-[16/10] bg-white/[0.06] flex items-center justify-center overflow-hidden">
                <Skeleton className="w-full h-full rounded-none bg-white/[0.07]" />
                {/* Platform Badge Placeholder */}
                <div className="absolute top-3 left-3">
                  <Skeleton className="h-6 w-20 rounded-full bg-white/20" />
                </div>
                {/* Date Tag Placeholder */}
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-6 w-24 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Body Content Skeleton */}
              <div className="p-6 space-y-3">
                <Skeleton className="h-5 w-4/5 rounded-lg bg-white/[0.1]" />
                <Skeleton className="h-5 w-3/5 rounded-lg bg-white/[0.1]" />
                <div className="space-y-1.5 pt-2">
                  <Skeleton className="h-3.5 w-full rounded bg-white/[0.06]" />
                  <Skeleton className="h-3.5 w-5/6 rounded bg-white/[0.06]" />
                  <Skeleton className="h-3.5 w-4/6 rounded bg-white/[0.06]" />
                </div>
              </div>
            </div>

            {/* Author Footer Skeleton */}
            <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-full bg-white/[0.08] shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-24 rounded bg-white/[0.08]" />
                  <Skeleton className="h-2.5 w-16 rounded bg-white/[0.06]" />
                </div>
              </div>
              <Skeleton className="w-8 h-8 rounded-full bg-white/[0.08] shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
