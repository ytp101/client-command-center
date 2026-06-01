"use client";

import React from "react";
import { 
  useProjectStore, 
  selectActiveProject, 
  selectActiveClient, 
  selectProjectCompletionPercentage 
} from "@/store/useProjectStore";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardAction
} from "@/components/ui/card";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CalendarDays,
  FileCheck2,
  TrendingUp,
  Plus,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const activeProject = useProjectStore(selectActiveProject);
  const activeClient = useProjectStore(selectActiveClient);
  const completionPercentage = useProjectStore(selectProjectCompletionPercentage);

  // Compute metrics dynamically from the active project context
  const daysLeft = activeProject.daysUntilDelivery;
  
  // Count deliverables awaiting review in the active project
  const pendingApprovalsCount = activeProject.deliverables.filter(
    (d) => d.status === "Awaiting Review"
  ).length;

  // Filter approved deliverables
  const approvedMilestonesCount = activeProject.milestones.filter(
    (m) => m.status === "Approved"
  ).length;

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Top Welcome Header Bar */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">
            Tenant: {activeClient.company}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-2">
            {activeProject.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>Primary Client: <strong>{activeClient.name}</strong></span>
            <span className="text-muted-foreground/45">•</span>
            <span>{activeProject.description}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border px-3 text-xs font-semibold hover:bg-muted/70 hover:text-foreground transition-all cursor-pointer">
            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Schedule</span>
          </button>
          <button className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-primary text-primary-foreground px-4 text-xs font-semibold shadow-sm hover:opacity-90 hover:shadow-md transition-all cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>New Deliverable</span>
          </button>
        </div>
      </section>

      {/* Metrics Card Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Days Until Delivery */}
        <Card className="relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-primary/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Days Until Delivery
              </CardDescription>
              <CardTitle className="text-2xl font-bold mt-1">Next Milestone</CardTitle>
            </div>
            <CardAction>
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </span>
            </CardAction>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">{daysLeft}</span>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Days Left
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5 border-t border-border/60 pt-3">
              <CalendarDays className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span>Target deadline scheduled in sprint</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Project Completion */}
        <Card className="relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-primary/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Project Completion
              </CardDescription>
              <CardTitle className="text-2xl font-bold mt-1">Sprint Progress</CardTitle>
            </div>
            <CardAction>
              <span className="p-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </span>
            </CardAction>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">{completionPercentage}%</span>
              <span className="text-xs font-medium text-muted-foreground">
                Overall Status
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-4 shadow-inner">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5 border-t border-border/60 pt-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary/70" />
              <span>{approvedMilestonesCount} of {activeProject.milestones.length} milestones approved</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Pending Approvals */}
        <Card className="relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-primary/20 sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pending Approvals
              </CardDescription>
              <CardTitle className="text-2xl font-bold mt-1">Review Needed</CardTitle>
            </div>
            <CardAction>
              <span className={cn(
                "p-2 rounded-lg flex items-center justify-center",
                pendingApprovalsCount > 0 
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" 
                  : "bg-slate-500/10 text-slate-600 dark:text-slate-400"
              )}>
                <AlertCircle className="w-4 h-4" />
              </span>
            </CardAction>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">{pendingApprovalsCount}</span>
              <span className={cn(
                "text-sm font-semibold px-2 py-0.5 rounded-full",
                pendingApprovalsCount > 0 
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" 
                  : "bg-slate-500/10 text-slate-500"
              )}>
                {pendingApprovalsCount > 0 ? "Action Required" : "Up to Date"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5 border-t border-border/60 pt-3">
              <FileCheck2 className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span>Review requested from Client partner</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity Feed Timeline Section */}
      <section className="mt-4 flex flex-col gap-5">
        <div className="flex flex-col gap-1 border-b border-border/60 pb-3">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
            Recent Activity Feed
          </h2>
          <p className="text-xs text-muted-foreground">
            A chronological timeline of milestones, design uploads, and task approvals for {activeProject.name}.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="bg-card border border-border/80 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="relative border-l border-border pl-6 ml-3 space-y-8 py-2">
            
            {/* Activity Item 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background ring-4 ring-emerald-500/10" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>Approved Milestone Logged</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-600">
                    Milestones
                  </span>
                </h3>
                <span className="text-xs text-muted-foreground font-medium">Active Sprint</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Project milestones have been updated in active store contexts. Total progress has computed dynamically to {completionPercentage}% on schedule.
              </p>
            </div>

            {/* Activity Item 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-background ring-4 ring-blue-500/10" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>Project Context Synced</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-500/10 text-blue-600">
                    Tenant
                  </span>
                </h3>
                <span className="text-xs text-muted-foreground font-medium">Just Now</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Relational multi-tenant context loaded for <span className="font-semibold text-foreground">{activeProject.name}</span>. Currently displaying {activeProject.deliverables.length} files under {activeClient.company}.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
