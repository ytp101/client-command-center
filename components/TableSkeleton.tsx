import React from "react";

export default function TableSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top filter input skeleton */}
      <div className="flex justify-between items-center w-full">
        <div className="w-full sm:max-w-md h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800/60 animate-pulse" />
      </div>

      {/* Vault Table Shell Container */}
      <div className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 w-[45%]">
                  <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 w-[15%]">
                  <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 w-[20%]">
                  <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 w-[15%]">
                  <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 w-[5%]">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="bg-card">
                  {/* Column 1: File Name + Icon */}
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className="p-4.5 rounded-lg bg-zinc-200 dark:bg-zinc-800/60 animate-pulse shrink-0 w-9 h-9" />
                      <div className="flex flex-col gap-2 w-full max-w-[200px]">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800/80 rounded animate-pulse w-[85%]" />
                        <div className="h-3 bg-zinc-200 dark:bg-zinc-800/40 rounded animate-pulse w-[40%]" />
                      </div>
                    </div>
                  </td>
                  {/* Column 2: Type badge */}
                  <td className="px-6 py-4.5">
                    <div className="h-5 w-14 bg-zinc-200 dark:bg-zinc-800/60 rounded animate-pulse" />
                  </td>
                  {/* Column 3: Date */}
                  <td className="px-6 py-4.5">
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded animate-pulse" />
                  </td>
                  {/* Column 4: Status badge */}
                  <td className="px-6 py-4.5">
                    <div className="h-5.5 w-20 bg-zinc-200 dark:bg-zinc-800/60 rounded-full animate-pulse" />
                  </td>
                  {/* Column 5: Action menu icon */}
                  <td className="px-6 py-4.5 text-right">
                    <div className="h-6 w-6 ml-auto bg-zinc-200 dark:bg-zinc-800/60 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
