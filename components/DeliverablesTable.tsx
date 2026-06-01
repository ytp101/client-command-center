/* eslint-disable react-hooks/incompatible-library */
"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Deliverable, DeliverableType, DeliverableStatus } from "@/store/useProjectStore";
import {
  FileText,
  FileCode2,
  FileCheck2,
  Image as ImageIcon,
  MoreHorizontal,
  ArrowUpDown,
  Search,
  Download,
  Eye,
  Trash2,
  ChevronUp,
  ChevronDown,
  FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliverablesTableProps {
  data: Deliverable[];
  onReviewDeliverable: (deliverable: Deliverable) => void;
}

export default function DeliverablesTable({ data, onReviewDeliverable }: DeliverablesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close open dropdowns if clicking elsewhere
  React.useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Map file types to appropriate lucide-react icons
  const getFileTypeIcon = (type: DeliverableType) => {
    switch (type) {
      case "Invoice":
        return <FileCheck2 className="w-4 h-4 text-emerald-500" />;
      case "Design":
        return <ImageIcon className="w-4 h-4 text-pink-500" />;
      case "Code":
        return <FileCode2 className="w-4 h-4 text-blue-500" />;
      case "Document":
        return <FileText className="w-4 h-4 text-indigo-500" />;
      default:
        return <FileSpreadsheet className="w-4 h-4 text-slate-500" />;
    }
  };

  // Define columns structure
  const columns = useMemo<ColumnDef<Deliverable>[]>(
    () => [
      {
        accessorKey: "fileName",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center gap-1 hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>File Name</span>
              {isSorted === "asc" && <ChevronUp className="w-3.5 h-3.5" />}
              {isSorted === "desc" && <ChevronDown className="w-3.5 h-3.5" />}
              {!isSorted && <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />}
            </button>
          );
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/80 text-muted-foreground flex items-center justify-center shrink-0 shadow-inner">
                {getFileTypeIcon(item.type)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-foreground truncate max-w-[240px] md:max-w-[320px]">
                  {item.fileName}
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  {item.fileSize}
                </span>
              </div>
            </div>
          );
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "type",
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Type
          </span>
        ),
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-muted text-muted-foreground border border-border/50">
              {type}
            </span>
          );
        },
      },
      {
        accessorKey: "dateAdded",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="flex items-center gap-1 hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Date Added</span>
              {isSorted === "asc" && <ChevronUp className="w-3.5 h-3.5" />}
              {isSorted === "desc" && <ChevronDown className="w-3.5 h-3.5" />}
              {!isSorted && <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />}
            </button>
          );
        },
        cell: ({ row }) => {
          const dateStr = row.getValue("dateAdded") as string;
          const formatted = new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return <span className="text-sm font-medium text-muted-foreground">{formatted}</span>;
        },
      },
      {
        accessorKey: "status",
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Status
          </span>
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as DeliverableStatus;
          return (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border shadow-sm",
                status === "Approved" && 
                  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
                status === "Awaiting Review" && 
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
                status === "Draft" && 
                  "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/25"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full mr-1.5 shrink-0",
                status === "Approved" && "bg-emerald-500",
                status === "Awaiting Review" && "bg-amber-500",
                status === "Draft" && "bg-slate-400"
              )} />
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => {
          const item = row.original;
          const isMenuOpen = openMenuId === item.id;

          const toggleMenu = (e: React.MouseEvent) => {
            e.stopPropagation();
            setOpenMenuId(isMenuOpen ? null : item.id);
          };

          return (
            <div className="relative flex justify-end">
              <button
                onClick={toggleMenu}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus:outline-none"
                aria-label="Actions menu"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* Floating Row Actions Dropdown */}
              {isMenuOpen && (
                <div
                  className="absolute right-0 top-8 z-50 w-44 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg py-1 animate-in fade-in slide-in-from-top-1 duration-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      alert(`Downloading asset: ${item.fileName}`);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-primary transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Download Asset</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onReviewDeliverable(item);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-primary transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Review & Approve</span>
                  </button>
                  
                  <div className="border-t border-border/60 my-1" />
                  
                  <button
                    onClick={() => {
                      alert(`Deleting record: ${item.id}`);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Remove Record</span>
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [openMenuId, onReviewDeliverable]
  );

  // Initialize TanStack React Table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Top Filter and Actions Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Filter input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search deliverables by filename..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm bg-card hover:bg-muted/10 focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-border bg-muted/30"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 select-none align-middle"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border/60">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center text-sm text-muted-foreground font-medium bg-card"
                  >
                    No deliverables found matching your search.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/20 transition-colors group/row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4.5 align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
