"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useProjectStore } from "@/store/useProjectStore";
import ArchitectureOverlay from "@/components/ArchitectureOverlay";
import { 
  ChevronRight, 
  FolderGit2, 
  UserSquare2,
  Calendar,
  Layers,
  FolderOpen,
  X,
  Check,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GlobalHeader() {
  const pathname = usePathname();
  const clients = useProjectStore((state) => state.clients);
  const projects = useProjectStore((state) => state.projects);
  const activeProjectId = useProjectStore((state) => state.activeProjectId);
  const setActiveProject = useProjectStore((state) => state.setActiveProject);

  // Mobile Bottom Sheet state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync scroll lock when mobile sheet is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  // Resolve active project name
  const activeProject = projects.find((p) => p.id === activeProjectId);

  // Generate dynamic breadcrumb segment based on the active path
  const getBreadcrumbLabel = () => {
    switch (pathname) {
      case "/":
        return { label: "Dashboard", icon: <Layers className="w-3.5 h-3.5 text-muted-foreground" /> };
      case "/milestones":
        return { label: "Milestones Kanban", icon: <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> };
      case "/deliverables":
        return { label: "Deliverables Vault", icon: <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" /> };
      default:
        return { label: "Workspace", icon: <Layers className="w-3.5 h-3.5 text-muted-foreground" /> };
    }
  };

  const breadcrumb = getBreadcrumbLabel();

  return (
    <header className="w-full h-16 px-6 md:px-8 border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left side: Dynamic breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground min-w-0">
        <span className="hidden sm:flex items-center gap-1.5 hover:text-foreground transition-colors shrink-0">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Active Context</span>
        </span>
        <ChevronRight className="hidden sm:block w-3 h-3 text-muted-foreground/60 shrink-0" />
        <span className="flex items-center gap-1.5 text-foreground font-bold shrink-0 truncate max-w-[100px] xs:max-w-[120px] sm:max-w-none">
          {breadcrumb.icon}
          <span>{breadcrumb.label}</span>
        </span>
      </div>

      {/* Right side: Context Selector & Architecture Sales Overlay */}
      <div className="flex items-center gap-3 shrink-0">
        {pathname !== "/settings" && <ArchitectureOverlay />}
        <label htmlFor="context-selector" className="hidden lg:flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <UserSquare2 className="w-3.5 h-3.5 text-muted-foreground/80" />
          <span>Project Tenant:</span>
        </label>
        
        {/* DESKTOP VIEWPORT SELECTOR: Standard styled dropdown */}
        <select
          id="context-selector"
          value={activeProjectId}
          onChange={(e) => {
            const selectedProj = projects.find((p) => p.id === e.target.value);
            if (selectedProj) {
              setActiveProject(selectedProj.clientId, selectedProj.id);
            }
          }}
          className="hidden sm:block h-9.5 border border-border bg-card text-foreground rounded-lg text-xs font-bold px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all shadow-sm cursor-pointer hover:bg-muted/30"
        >
          {clients.map((client) => {
            const clientProjects = projects.filter((p) => p.clientId === client.id);
            return (
              <optgroup 
                key={client.id} 
                label={`${client.company} - ${client.name}`}
                className="font-bold text-muted-foreground animate-none"
              >
                {clientProjects.map((proj) => (
                  <option 
                    key={proj.id} 
                    value={proj.id}
                    className="font-semibold text-foreground bg-background"
                  >
                    {proj.name}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>

        {/* MOBILE VIEWPORT SELECTOR: Sleek Custom Slide-up bottom sheet trigger button */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex sm:hidden items-center justify-between h-9.5 w-full max-w-[110px] xs:max-w-[130px] border border-border bg-card text-foreground rounded-lg text-xs font-bold px-3 py-1.5 focus:outline-none transition-all shadow-sm cursor-pointer hover:bg-muted/30 text-left min-w-0"
          aria-label="Switch client project context"
        >
          <span className="truncate mr-1">{activeProject ? activeProject.name : "Select Project"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </button>
      </div>

      {/* MOBILE CONTEXT SLIDE-UP DRAWER SHEET */}
      {mounted && isMobileDrawerOpen && createPortal(
        <>
          {/* Backdrop Layer */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] transition-opacity duration-300 animate-in fade-in"
          />
          
          {/* Bottom Sheet Drawer */}
          <div 
            className="fixed bottom-0 inset-x-0 bg-background border-t border-border rounded-t-3xl shadow-2xl p-6 pb-8 z-[10000] flex flex-col gap-5 transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto" />
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex flex-col">
                <h3 className="text-sm font-extrabold text-foreground">Select Project Tenant</h3>
                <span className="text-[10px] text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">Switch active client context workspace</span>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                aria-label="Close project switcher"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Clients and Projects */}
            <div className="flex flex-col gap-5 pt-1">
              {clients.map((client) => {
                const clientProjects = projects.filter((p) => p.clientId === client.id);
                return (
                  <div key={client.id} className="flex flex-col gap-2.5">
                    {/* Client Header */}
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                      {client.company} — {client.name}
                    </span>
                    
                    {/* Projects Cards */}
                    <div className="flex flex-col gap-2">
                      {clientProjects.map((proj) => {
                        const isActive = proj.id === activeProjectId;
                        return (
                          <button
                            key={proj.id}
                            onClick={() => {
                              setActiveProject(proj.clientId, proj.id);
                              // Add a slight delay to close to feel responsive but smooth
                              setTimeout(() => setIsMobileDrawerOpen(false), 80);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer",
                              isActive
                                ? "bg-primary/5 border-primary text-primary"
                                : "bg-card border-border/80 text-foreground hover:bg-muted/30"
                            )}
                          >
                            <div className="flex flex-col min-w-0 pr-3">
                              <span className="text-xs font-bold truncate">{proj.name}</span>
                              <span className="text-[10px] text-muted-foreground truncate mt-1">{proj.description}</span>
                            </div>
                            
                            {isActive && (
                              <span className="p-1 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                                <Check className="w-3.5 h-3.5 font-bold" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
}
