"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { 
  Code, 
  X, 
  ChevronDown, 
  Layers, 
  Cpu, 
  Database, 
  HelpCircle,
  Gem,
  CheckCircle,
  Network,
  Check,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureDetails {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  techExplain: string;
  businessValue: string;
  highlights: string[];
  techTags: string[];
}

const architectureData: Record<string, ArchitectureDetails> = {
  "/": {
    title: "The Executive Dashboard",
    subtitle: "High-Fidelity Multi-Tenant Analytics",
    icon: <Layers className="w-5 h-5 text-primary" />,
    techExplain: "Next.js Server Components, Tailwind CSS Grid, Dynamic Multi-Tenant Context Switching.",
    businessValue: "Synthesizes complex project data into immediate, actionable insights, saving stakeholders bandwidth and eliminating status-update meetings.",
    highlights: [
      "Sub-second initial page load & paint times",
      "Dynamic project-tenant syncing via Zustand",
      "Harmonious glassmorphic executive widgets"
    ],
    techTags: ["Next.js Server Components", "Tailwind CSS Grid", "Multi-Tenant Context"]
  },
  "/milestones": {
    title: "Interactive Milestone Tracker",
    subtitle: "Reactive State-Driven Kanban",
    icon: <Cpu className="w-5 h-5 text-amber-500" />,
    techExplain: "Zustand Global State Management, Optimistic UI Updates, Client-Side Data Mutation.",
    businessValue: "Replaces static spreadsheets with a living, dynamic Kanban environment, ensuring zero-latency alignment on critical project phases.",
    highlights: [
      "Zero-latency client state card transitions",
      "Memory-efficient relational client-project store",
      "Pre-computed derived project completion scores"
    ],
    techTags: ["Zustand Store", "Optimistic Updates", "Derived Selectors"]
  },
  "/deliverables": {
    title: "The Deliverables Vault",
    subtitle: "Secured Enterprise Asset Table",
    icon: <Database className="w-5 h-5 text-blue-500" />,
    techExplain: "@tanstack/react-table, Headless UI Logic, Debounced Search, Client-Side Sorting Algorithms.",
    businessValue: "Solves enterprise asset retrieval bottlenecks. Robust data-handling ensures stakeholders can instantly find, filter, and approve deliverables.",
    highlights: [
      "Real-time client-side query text filtering",
      "Sortable columns with dynamic indicator chevrons",
      "React 19 build compatibility annotations"
    ],
    techTags: ["TanStack React Table", "Debounced Live Search", "Column Sorting Algos"]
  }
};

const fallbackArchitecture: ArchitectureDetails = {
  title: "Full-Stack Architecture",
  subtitle: "Executive SaaS Blueprint",
  icon: <Network className="w-5 h-5 text-emerald-500" />,
  techExplain: "Next.js App Router (Turbopack), TypeScript, Tailwind CSS, Zustand Relational State Store, TanStack Table.",
  businessValue: "Provides an all-in-one scalable digital ecosystem designed for friction-free project tracking, asset security, and rapid client sign-off.",
  highlights: [
    "Robust multi-tenant relational schema mapping",
    "React Portal-rendered dialog overlay layers",
    "SEO-optimized layout routing structures"
  ],
  techTags: ["Next.js App Router", "TypeScript 5", "Zustand Store", "React Table"]
};

const accordionItems = [
  { id: 1, path: "/", ...architectureData["/"] },
  { id: 2, path: "/milestones", ...architectureData["/milestones"] },
  { id: 3, path: "/deliverables", ...architectureData["/deliverables"] }
];

export default function ArchitectureOverlay() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOverlay = () => setIsOpen(!isOpen);
  const closeOverlay = () => setIsOpen(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // By default, open the accordion item matching the active route
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathname === "/") setOpenIndex(1);
      else if (pathname === "/milestones") setOpenIndex(2);
      else if (pathname === "/deliverables") setOpenIndex(3);
      else setOpenIndex(1);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname, isOpen]);

  // Prevent background scrolling when overlay drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Resolve active context based on current route
  const activeContext = architectureData[pathname] || fallbackArchitecture;
  const isFallback = !architectureData[pathname];

  return (
    <>
      {/* Sleek Trigger Button in Header */}
      <button
        onClick={toggleOverlay}
        className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs transition-all shadow-sm shadow-primary/5 cursor-pointer"
        aria-label="View architecture overlay"
      >
        <Code className="w-4 h-4" />
        <span className="hidden sm:inline">View Architecture</span>
      </button>

      {/* Slide-out Backdrop Overlay & Drawer rendered via Portal to escape stacking context restrictions */}
      {mounted && createPortal(
        <>
          {isOpen && (
            <div
              onClick={closeOverlay}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 transition-opacity duration-300 animate-in fade-in"
            />
          )}

          {/* Slide-out Sheet Drawer Container */}
          <aside
            className={cn(
              "fixed inset-y-0 right-0 w-full sm:max-w-lg bg-background border-l border-border shadow-2xl flex flex-col justify-between z-55 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Network className="w-5 h-5 animate-pulse" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-foreground">Architect&apos;s Overlay</h2>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold block mt-0.5">
                    Technical Blueprint & Value Propositions
                  </span>
                </div>
              </div>
              <button
                onClick={closeOverlay}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                aria-label="Close architecture drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              
              {/* Dynamic Route Context Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 uppercase tracking-wider animate-pulse">
                  <Zap className="w-3 h-3 text-emerald-500" />
                  <span>Active Context Spotlight</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest bg-muted px-2 py-0.5 rounded">
                  {isFallback ? "Global" : pathname === "/" ? "Home" : pathname.replace("/", "")}
                </span>
              </div>

              {/* Dynamic Context Spotlight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent border border-primary/15 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {activeContext.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{activeContext.title}</h3>
                    <span className="text-xs text-muted-foreground font-medium block mt-0.5">{activeContext.subtitle}</span>
                  </div>
                </div>

                {/* Tech Stack Explanation */}
                <div className="mt-4 flex flex-col gap-1 border-t border-border/60 pt-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Tech Stack Under The Hood
                  </span>
                  <p className="text-xs text-foreground font-semibold leading-relaxed mt-1">
                    {activeContext.techExplain}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeContext.techTags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Business Value Highlight Callout Box */}
                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-950/10 border border-amber-500/15 text-xs text-amber-700 dark:text-amber-400 mt-4 flex items-start gap-3">
                  <Gem className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      Business Value Proposition
                    </span>
                    <p className="mt-1 leading-relaxed font-semibold text-foreground text-amber-900 dark:text-amber-200">
                      {activeContext.businessValue}
                    </p>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="mt-4 flex flex-col gap-2 pt-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                    Engineering Highlights
                  </span>
                  {activeContext.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanatory Info Divider */}
              <div className="p-3.5 rounded-xl bg-muted/20 border border-border text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 shrink-0 text-muted-foreground/80 mt-0.5" />
                <span>
                  This overlay is dynamic. Switch pages in the sidebar navigation behind the sheet to watch the blueprints and value propositions adjust reactively!
                </span>
              </div>

              {/* System Architecture Blueprint (Interactive Accordion) */}
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 px-1">
                  System Module Blueprints
                </span>

                <div className="flex flex-col gap-3.5">
                  {accordionItems.map((item) => {
                    const isExpanded = openIndex === item.id;
                    const isItemActive = pathname === item.path;

                    return (
                      <div 
                        key={item.id} 
                        className={cn(
                          "border rounded-xl transition-all duration-300 overflow-hidden bg-card",
                          isExpanded ? "border-primary/25 ring-1 ring-primary/20 shadow-sm" : "border-border/80 hover:border-border"
                        )}
                      >
                        {/* Accordion Header Toggle */}
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full flex items-center justify-between px-4 py-3.5 text-left font-semibold text-xs hover:bg-muted/30 transition-all cursor-pointer focus:outline-none"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-2.5">
                            {item.icon}
                            <span className="text-foreground font-bold">{item.title}</span>
                            {isItemActive && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-600 uppercase border border-emerald-500/10">
                                Active View
                              </span>
                            )}
                          </div>
                          <ChevronDown 
                            className={cn(
                              "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                              isExpanded && "transform rotate-180"
                            )} 
                          />
                        </button>

                        {/* Accordion Body Content */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0.5 border-t border-border/40 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                            
                            {/* Tech Stack */}
                            <div className="flex flex-col gap-1 mt-2">
                              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                Tech Stack
                              </span>
                              <p className="text-xs text-foreground font-semibold mt-0.5">
                                {item.techExplain}
                              </p>
                            </div>

                            {/* Business Value */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                                Business Value
                              </span>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {item.businessValue}
                              </p>
                            </div>

                            {/* Tech Spec Badges */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.techTags.map((tag, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-muted text-muted-foreground border border-border/40"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Drawer Footer Panel */}
            <div className="p-6 border-t border-border bg-muted/15 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ready for Production</span>
              </span>
              <span>Lead Architect Sign-off</span>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
