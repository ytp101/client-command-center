"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Briefcase, 
  Settings, 
  Menu, 
  X, 
  Layers,
  ChevronRight,
  User,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Milestones", href: "/milestones", icon: Calendar },
  { name: "Deliverables", href: "/deliverables", icon: Briefcase },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="flex md:hidden items-center justify-between w-full h-16 px-6 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm">
            <Layers className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <span className="font-semibold text-base tracking-tight">Command Center</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-muted text-foreground transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile Navigation Drawer Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-72 bg-background border-r border-border p-6 flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">Command Center</span>
            </div>
            <button
              onClick={closeSidebar}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/10"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-105", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 opacity-0 transition-all", isActive ? "opacity-40" : "group-hover:opacity-100 group-hover:translate-x-0.5")} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile block */}
        <div className="pt-4 border-t border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center ring-2 ring-primary/10">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground leading-none">Alex Rivera</span>
            <span className="text-xs text-muted-foreground mt-1">Freelance Architect</span>
          </div>
        </div>
      </aside>

      {/* Desktop Persistent Left-hand Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 h-screen bg-background border-r border-border/80 sticky top-0 p-6 z-30 shrink-0">
        <div className="flex flex-col gap-8">
          {/* Logo Block */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold shadow-md shadow-primary/10">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight tracking-tight">Command Center</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">SaaS Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <span className="px-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-2">Workspace</span>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/5"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-105", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className={cn("w-3.5 h-3.5 opacity-0 transition-all", isActive ? "opacity-40" : "group-hover:opacity-100 group-hover:translate-x-0.5")} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile block */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center ring-2 ring-primary/10">
              <User className="w-4.5 h-4.5 text-muted-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground leading-none truncate">Alex Rivera</span>
              <span className="text-[10px] text-muted-foreground mt-1 truncate">Freelance Architect</span>
            </div>
          </div>
          <button 
            className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Account details"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
