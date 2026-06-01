"use client";

import React from "react";
import { 
  useProjectStore, 
  selectProjectCompletionPercentage, 
  selectActiveProject,
  Milestone, 
  MilestoneStatus 
} from "@/store/useProjectStore";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Play, 
  Check, 
  RotateCcw, 
  Calendar, 
  ClipboardList, 
  Activity, 
  CheckCircle2, 
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MilestonesPage() {
  const activeProject = useProjectStore(selectActiveProject);
  const milestones = activeProject.milestones;
  const updateMilestoneStatus = useProjectStore((state) => state.updateMilestoneStatus);
  const completionPercentage = useProjectStore(selectProjectCompletionPercentage);

  // Group milestones by status
  const pendingMilestones = milestones.filter((m) => m.status === "Pending");
  const inProgressMilestones = milestones.filter((m) => m.status === "In Progress");
  const approvedMilestones = milestones.filter((m) => m.status === "Approved");

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Milestones Kanban
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track, update, and manage your agile sprint milestones. Shift deliverables between stages in real-time.
          </p>
        </div>
      </section>

      {/* Real-time Project Completion Score Card */}
      <section className="bg-card border border-border/80 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
            <TrendingUp className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Overall Project Completion</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Derived dynamically from approved milestones ({approvedMilestones.length} of {milestones.length} completed)
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-96 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-muted-foreground">Sprint Status</span>
            <span className="text-primary font-bold">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-secondary h-3 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Kanban Grid Layout */}
      <section className="grid gap-6 grid-cols-1 lg:grid-cols-3 items-start">
        
        {/* Column 1: Pending */}
        <div className="flex flex-col gap-4 bg-zinc-100/50 dark:bg-zinc-900/30 p-4 rounded-xl border border-border/40">
          <div className="flex items-center justify-between px-2 pb-1 border-b-2 border-slate-300 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <h3 className="text-sm font-bold text-foreground">Pending</h3>
            </div>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-200/60 dark:bg-slate-800/80 text-muted-foreground">
              {pendingMilestones.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[300px]">
            {pendingMilestones.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-12 border border-dashed border-border/60 rounded-xl bg-card/40">
                <ClipboardList className="w-8 h-8 text-muted-foreground/40 stroke-1" />
                <span className="text-xs text-muted-foreground/60 font-medium mt-2">No pending milestones</span>
              </div>
            ) : (
              pendingMilestones.map((m) => (
                <MilestoneCard 
                  key={m.id} 
                  milestone={m} 
                  onUpdateStatus={updateMilestoneStatus} 
                />
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="flex flex-col gap-4 bg-zinc-100/50 dark:bg-zinc-900/30 p-4 rounded-xl border border-border/40">
          <div className="flex items-center justify-between px-2 pb-1 border-b-2 border-amber-500/55 dark:border-amber-900/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-sm font-bold text-foreground">In Progress</h3>
            </div>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {inProgressMilestones.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[300px]">
            {inProgressMilestones.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-12 border border-dashed border-border/60 rounded-xl bg-card/40">
                <Activity className="w-8 h-8 text-muted-foreground/40 stroke-1 animate-pulse" />
                <span className="text-xs text-muted-foreground/60 font-medium mt-2">No active milestones</span>
              </div>
            ) : (
              inProgressMilestones.map((m) => (
                <MilestoneCard 
                  key={m.id} 
                  milestone={m} 
                  onUpdateStatus={updateMilestoneStatus} 
                />
              ))
            )}
          </div>
        </div>

        {/* Column 3: Approved */}
        <div className="flex flex-col gap-4 bg-zinc-100/50 dark:bg-zinc-900/30 p-4 rounded-xl border border-border/40">
          <div className="flex items-center justify-between px-2 pb-1 border-b-2 border-emerald-500/55 dark:border-emerald-900/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-bold text-foreground">Approved</h3>
            </div>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {approvedMilestones.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[300px]">
            {approvedMilestones.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-12 border border-dashed border-border/60 rounded-xl bg-card/40">
                <CheckCircle2 className="w-8 h-8 text-muted-foreground/40 stroke-1" />
                <span className="text-xs text-muted-foreground/60 font-medium mt-2">No approved milestones</span>
              </div>
            ) : (
              approvedMilestones.map((m) => (
                <MilestoneCard 
                  key={m.id} 
                  milestone={m} 
                  onUpdateStatus={updateMilestoneStatus} 
                />
              ))
            )}
          </div>
        </div>

      </section>
    </div>
  );
}

interface MilestoneCardProps {
  milestone: Milestone;
  onUpdateStatus: (id: string, status: MilestoneStatus) => void;
}

function MilestoneCard({ milestone, onUpdateStatus }: MilestoneCardProps) {
  const { id, title, description, status, dueDate } = milestone;

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:ring-1 bg-card border-border",
      status === "Pending" && "hover:ring-slate-300 dark:hover:ring-slate-800",
      status === "In Progress" && "hover:ring-amber-500/30",
      status === "Approved" && "hover:ring-emerald-500/30"
    )}>
      {/* Top indicator line */}
      <div className={cn(
        "absolute top-0 inset-x-0 h-1.5",
        status === "Pending" && "bg-slate-400/40",
        status === "In Progress" && "bg-amber-500",
        status === "Approved" && "bg-emerald-500"
      )} />

      <CardHeader className="pt-5 pb-2">
        <CardTitle className="text-sm font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Due: {dueDate}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border/40 flex justify-end gap-2 bg-muted/20 px-4 py-3">
        {status === "Pending" && (
          <button
            onClick={() => onUpdateStatus(id, "In Progress")}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all cursor-pointer shadow-sm hover:shadow"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Milestone</span>
          </button>
        )}

        {status === "In Progress" && (
          <div className="flex w-full gap-2">
            <button
              onClick={() => onUpdateStatus(id, "Pending")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted text-muted-foreground transition-all cursor-pointer"
              title="Revert to Pending"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => onUpdateStatus(id, "Approved")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Check className="w-3.5 h-3.5 stroke-[3px]" />
              <span>Approve</span>
            </button>
          </div>
        )}

        {status === "Approved" && (
          <button
            onClick={() => onUpdateStatus(id, "In Progress")}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted text-muted-foreground transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reopen Milestone</span>
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
