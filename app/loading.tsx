import React from "react";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Top Welcome Header Bar Skeleton */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-2.5 w-full max-w-md">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse w-[50%]" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-[90%]" />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800/60 rounded-lg animate-pulse" />
          <div className="h-9 w-32 bg-zinc-200 dark:bg-zinc-800/80 rounded-lg animate-pulse" />
        </div>
      </section>

      {/* Metrics Card Grid Skeleton */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i} 
            className="bg-card border border-border/80 rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2 w-full max-w-[140px]">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-[60%]" />
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse w-[95%]" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-800/60 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse w-12" />
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800/60 rounded-full animate-pulse w-16" />
            </div>
            {/* Custom inner progress bar loader for completion card */}
            {i === 1 && (
              <div className="w-full bg-zinc-200 dark:bg-zinc-850 h-2 rounded-full mt-1 animate-pulse" />
            )}
            <div className="border-t border-border/60 pt-3 mt-1">
              <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-[70%]" />
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activity Feed Timeline Section Skeleton */}
      <section className="mt-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2 border-b border-border/60 pb-3">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse w-48" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-[320px]" />
        </div>

        {/* Shimmer Feed Container */}
        <div className="bg-card border border-border/80 rounded-xl p-6 shadow-sm">
          <div className="relative border-l border-border pl-6 ml-3 space-y-8 py-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative flex flex-col gap-2">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-background" />
                <div className="flex items-center justify-between">
                  <div className="h-4.5 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse w-40" />
                  <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-16" />
                </div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800/60 rounded animate-pulse w-[90%] mt-1.5" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-[65%]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
