"use client";

import React, { useState } from "react";
import DeliverablesTable from "@/components/DeliverablesTable";
import ApprovalDrawer from "@/components/ApprovalDrawer";
import { useProjectStore, selectActiveProject, Deliverable, DeliverableStatus } from "@/store/useProjectStore";
import { 
  FolderLock, 
  HardDrive, 
  ShieldAlert, 
  FileCheck,
  Plus
} from "lucide-react";

export default function DeliverablesPage() {
  const activeProject = useProjectStore(selectActiveProject);
  const deliverables = activeProject.deliverables;
  const updateDeliverableStatus = useProjectStore((state) => state.updateDeliverableStatus);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Compute dynamic metrics based on stateful deliverables list
  const totalFiles = deliverables.length;
  const approvedFiles = deliverables.filter((d) => d.status === "Approved").length;
  const pendingFiles = deliverables.filter((d) => d.status === "Awaiting Review").length;

  // Handle status update from within the Approval Drawer
  const handleStatusUpdated = (id: string, newStatus: DeliverableStatus, feedback: string) => {
    updateDeliverableStatus(id, newStatus, feedback);
    
    // In a real application, the feedback string would also be pushed to the activity log/feed
    console.log(`Deliverable ${id} updated to status ${newStatus} with feedback: "${feedback}"`);
  };

  // Open drawer trigger
  const handleReviewDeliverable = (deliverable: Deliverable) => {
    setSelectedDeliverable(deliverable);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderLock className="w-7 h-7 text-primary" />
            <span>Deliverables Vault</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Secure workspace repository to search, sort, and download active project assets, designs, code patches, and contract documents.
          </p>
        </div>
        <div>
          <button className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-primary text-primary-foreground px-4 text-xs font-semibold shadow-sm hover:opacity-90 hover:shadow-md transition-all cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Upload New Asset</span>
          </button>
        </div>
      </section>

      {/* Vault Statistics Dashboard */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Vault Storage Usage */}
        <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Vault Storage
              </span>
              <span className="text-lg font-bold text-foreground mt-0.5 block">
                34.3 MB of 100 MB
              </span>
            </div>
          </div>
          <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden mt-4 shadow-inner">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: "34.3%" }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground mt-2 block font-medium">
            34.3% of total allocated capacity utilized
          </span>
        </div>

        {/* Card 2: Approved Files */}
        <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm flex items-center gap-4 relative overflow-hidden group">
          <span className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Approved Assets
            </span>
            <span className="text-2xl font-extrabold text-foreground mt-1">
              {approvedFiles} <span className="text-xs font-medium text-muted-foreground">/ {totalFiles} Files</span>
            </span>
          </div>
        </div>

        {/* Card 3: Action Required (Awaiting Review) */}
        <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm flex items-center gap-4 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <span className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Reviews Required
            </span>
            <span className="text-2xl font-extrabold text-foreground mt-1">
              {pendingFiles} <span className="text-xs font-medium text-muted-foreground">Awaiting Review</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Table Container */}
      <section className="flex flex-col gap-1">
        <DeliverablesTable 
          data={deliverables} 
          onReviewDeliverable={handleReviewDeliverable}
        />
      </section>

      {/* Slide-out Review & Approval Flow Drawer */}
      <ApprovalDrawer
        deliverable={selectedDeliverable}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedDeliverable(null);
        }}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  );
}
