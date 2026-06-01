/* eslint-disable react-hooks/incompatible-library */
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Deliverable, DeliverableStatus } from "@/store/useProjectStore";
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Calendar,
  Layers,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the Zod Form validation schema
const approvalFormSchema = z.object({
  status: z.enum(["Approved", "Changes Requested"]),
  feedback: z.string(),
}).superRefine((data, ctx) => {
  // If requesting changes, feedback must be at least 10 characters
  if (data.status === "Changes Requested") {
    if (!data.feedback || data.feedback.trim().length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide detailed feedback (at least 10 characters) explaining the required changes.",
        path: ["feedback"]
      });
    }
  }
});

type ApprovalFormValues = z.infer<typeof approvalFormSchema>;

interface ApprovalDrawerProps {
  deliverable: Deliverable | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated: (id: string, status: DeliverableStatus, feedback: string) => void;
}

export default function ApprovalDrawer({
  deliverable,
  isOpen,
  onClose,
  onStatusUpdated
}: ApprovalDrawerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "warning" } | null>(null);

  // Initialize React Hook Form with Zod Resolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ApprovalFormValues>({
    resolver: zodResolver(approvalFormSchema),
    defaultValues: {
      status: "Approved",
      feedback: ""
    }
  });

  const selectedStatus = watch("status");

  // Reset form when deliverable changes or drawer closes
  useEffect(() => {
    if (isOpen && deliverable) {
      reset({
        status: "Approved",
        feedback: ""
      });
    }
  }, [deliverable, isOpen, reset]);

  // Handle auto-dismiss toast and drawer close on successful submission
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!isOpen || !deliverable) return null;

  // Submit Handler
  const onSubmit = async (values: ApprovalFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsSubmitting(false);

    // Call status updated callback (updates deliverables list in state)
    const newStatus: DeliverableStatus = values.status === "Approved" ? "Approved" : "Awaiting Review";
    onStatusUpdated(deliverable.id, newStatus, values.feedback);

    // Trigger Success Toast based on approval action
    if (values.status === "Approved") {
      setToast({
        message: `"${deliverable.fileName}" has been Approved! Your team has been notified.`,
        type: "success"
      });
    } else {
      setToast({
        message: "Revision request submitted! The team is revieweing your comments.",
        type: "warning"
      });
    }
  };

  return (
    <>
      {/* Drawer Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs z-40 transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Main Sheet Content Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:max-w-md bg-background border-l border-border shadow-2xl flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">Review Deliverable</h2>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold block mt-0.5">
                Client Sign-off
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            aria-label="Close review drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Form Scroll Area */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex-1 flex flex-col justify-between overflow-y-auto"
        >
          <div className="p-6 flex flex-col gap-6">
            {/* Deliverable Metadata Panel */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Deliverable Info
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground truncate">
                  {deliverable.fileName}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Added: {deliverable.dateAdded}</span>
                  <span className="mx-1">•</span>
                  <span>Size: {deliverable.fileSize}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-muted-foreground border border-border/50">
                  {deliverable.type}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                    deliverable.status === "Approved" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                    deliverable.status === "Awaiting Review" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                    deliverable.status === "Draft" && "bg-slate-500/10 text-slate-600 border-slate-500/20"
                  )}
                >
                  {deliverable.status}
                </span>
              </div>
            </div>

            {/* Form Fields container */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Review Comments / Revisions</span>
                </label>
                <textarea
                  {...register("feedback")}
                  placeholder={
                    selectedStatus === "Approved"
                      ? "Optional: Leave comments or sign-off notes for the freelance team..."
                      : "Describe the revisions and changes required (minimum 10 characters)..."
                  }
                  className={cn(
                    "w-full min-h-[160px] p-3 text-sm border rounded-xl bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none leading-relaxed",
                    errors.feedback ? "border-rose-500 focus:ring-rose-500/10" : "border-border"
                  )}
                />
                
                {/* Zod Validation Error message */}
                {errors.feedback && (
                  <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.feedback.message}</span>
                  </p>
                )}
              </div>

              {/* Information pill */}
              <div className={cn(
                "p-3 rounded-lg border text-xs leading-relaxed flex gap-2.5",
                selectedStatus === "Approved" 
                  ? "bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 border-emerald-500/10"
                  : "bg-amber-500/5 text-amber-700 dark:text-amber-400 border-amber-500/10"
              )}>
                {selectedStatus === "Approved" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Approve Action:</strong> Approving this deliverable marks it completed, locks editing, and notifies the development team to launch subsequent milestones.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Revisions Action:</strong> Submission returns the deliverable to review status and prompts the developer to address your comments.</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-6 border-t border-border bg-muted/10 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => setValue("status", "Changes Requested")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && selectedStatus === "Changes Requested" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <span>Request Changes</span>
              )}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => setValue("status", "Approved")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && selectedStatus === "Approved" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <span>Approve Asset</span>
              )}
            </button>
          </div>
        </form>
      </aside>

      {/* Floating Success/Warning Toast Overlay */}
      {toast && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-[100] max-w-sm p-4.5 rounded-xl border shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom duration-300",
            toast.type === "success" 
              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border-emerald-500/20"
              : "bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border-amber-500/20"
          )}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col">
            <span className="text-xs font-bold">
              {toast.type === "success" ? "Deliverable Approved" : "Changes Requested"}
            </span>
            <span className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              {toast.message}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
