"use client";

import React, { useState } from "react";
import { 
  Settings, 
  User, 
  Building, 
  Bell, 
  ShieldCheck, 
  Webhook, 
  CheckCircle, 
  Info,
  Save
} from "lucide-react";
import { useProjectStore, selectActiveProject, selectActiveClient } from "@/store/useProjectStore";

type TabId = "profile" | "notifications" | "security" | "webhooks";

export default function SettingsPage() {
  const activeProject = useProjectStore(selectActiveProject);
  const activeClient = useProjectStore(selectActiveClient);
  
  // Tab State
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  
  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [milestoneNotifications, setMilestoneNotifications] = useState(true);
  const [reviewPrompts, setReviewPrompts] = useState(false);

  // Webhook states
  const [webhookUrl, setWebhookUrl] = useState("https://api.acme.com/webhooks/deliverables");
  const [webhookEvents, setWebhookEvents] = useState({
    uploaded: true,
    approved: true,
    rejected: false
  });
  
  // Show save toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full relative">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-primary animate-[spin_5s_linear_infinite]" />
            <span>Workspace Settings</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure tenant profiles, client communication channels, deliverables security, and SaaS API webhooks.
          </p>
        </div>
      </section>

      {/* Grid Content Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Left Column: Navigation Sidebar Tabs */}
        <div className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-2 mb-2">
            Configuration Groups
          </span>
          
          <button 
            type="button" 
            onClick={() => setActiveTab("profile")}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer border",
              activeTab === "profile" 
                ? "bg-primary/10 text-primary border-primary/10 shadow-sm"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground border-transparent"
            )}
          >
            <User className="w-4.5 h-4.5" />
            <span>Profile & Client Context</span>
          </button>
          
          <button 
            type="button" 
            onClick={() => setActiveTab("notifications")}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer border",
              activeTab === "notifications" 
                ? "bg-primary/10 text-primary border-primary/10 shadow-sm"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground border-transparent"
            )}
          >
            <Bell className="w-4.5 h-4.5" />
            <span>Notification Rules</span>
          </button>
          
          <button 
            type="button" 
            onClick={() => setActiveTab("security")}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer border",
              activeTab === "security" 
                ? "bg-primary/10 text-primary border-primary/10 shadow-sm"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground border-transparent"
            )}
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            <span>Security & Vault Keys</span>
          </button>
          
          <button 
            type="button" 
            onClick={() => setActiveTab("webhooks")}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer border",
              activeTab === "webhooks" 
                ? "bg-primary/10 text-primary border-primary/10 shadow-sm"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground border-transparent"
            )}
          >
            <Webhook className="w-4.5 h-4.5" />
            <span>Webhooks & Integrations</span>
          </button>
          
          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/15 text-xs text-primary leading-relaxed">
            <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1 text-primary">
              <Info className="w-4.5 h-4.5 shrink-0" />
              <span>Multi-Tenant Sync</span>
            </p>
            <span>Your settings automatically adapt when switching the client workspace tenant using the header selection context!</span>
          </div>
        </div>

        {/* Right Columns: Actual Settings Controls (Renders dynamically based on active tab) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* PROFILE & CLIENT CONTEXT TAB */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              
              {/* Card 1.1: Active Client Context Info */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
                  <Building className="w-4 h-4 text-primary" />
                  <span>Active Client Context Info</span>
                </h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Company Name
                    </span>
                    <span className="text-xs font-bold text-foreground bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
                      {activeClient.company}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Primary Contact
                    </span>
                    <span className="text-xs font-bold text-foreground bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
                      {activeClient.name}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Active Workspace Project
                    </span>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                      {activeProject.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 1.2: General User Settings Mock */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
                  <User className="w-4 h-4 text-primary" />
                  <span>Lead Architect Account</span>
                </h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Architect Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Rivera"
                      className="text-xs font-semibold bg-muted/20 text-foreground border border-border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary/25"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Professional Role
                    </label>
                    <input
                      type="text"
                      defaultValue="Freelance Architect"
                      className="text-xs font-semibold bg-muted/20 text-foreground border border-border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary/25"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Sign-off Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="alex.rivera@commandcenter.io"
                      className="text-xs font-semibold bg-muted/20 text-foreground border border-border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary/25"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => triggerToast("Profile changes saved successfully!")}
                    className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-all shadow-sm hover:opacity-90 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm animate-in fade-in duration-200">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Notification Preferences</span>
              </h2>
              
              <div className="flex flex-col gap-4">
                {/* Option 1 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">Email Status Digests</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">Receive summary emails when milestones change status.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={cn(
                      "w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer",
                      emailAlerts ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-background shadow-md transition-transform transform",
                      emailAlerts ? 'translate-x-4' : 'translate-x-0'
                    )} />
                  </button>
                </div>

                {/* Option 2 */}
                <div className="flex items-center justify-between gap-4 border-t border-border/40 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">Milestone Complete Alerts</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">Push internal browser notifications on milestone approvals.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMilestoneNotifications(!milestoneNotifications)}
                    className={cn(
                      "w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer",
                      milestoneNotifications ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-background shadow-md transition-transform transform",
                      milestoneNotifications ? 'translate-x-4' : 'translate-x-0'
                    )} />
                  </button>
                </div>

                {/* Option 3 */}
                <div className="flex items-center justify-between gap-4 border-t border-border/40 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">Immediate Review Prompts</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">Notify the freelance architect instantly when a deliverable is reviewed.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReviewPrompts(!reviewPrompts)}
                    className={cn(
                      "w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer",
                      reviewPrompts ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-background shadow-md transition-transform transform",
                      reviewPrompts ? 'translate-x-4' : 'translate-x-0'
                    )} />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => triggerToast("Notification rules updated!")}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-all shadow-sm hover:opacity-90 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Rules</span>
                </button>
              </div>
            </div>
          )}

          {/* SECURITY & VAULT KEYS TAB */}
          {activeTab === "security" && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm animate-in fade-in duration-200">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Deliverables Vault Encryption</span>
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-xs text-blue-700 dark:text-blue-300">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-blue-500" />
                  <span>All documents uploaded to the Deliverables Vault are encrypted using AES-GCM-256 protocols.</span>
                </div>
                
                <div className="flex flex-col gap-1 mt-2">
                  <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    Vault Security Access Token
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="password"
                      readOnly
                      value="cc_prod_aes256_vault_token_key_alexrivera"
                      className="flex-1 text-xs font-mono font-semibold bg-muted/40 text-muted-foreground border border-border rounded-lg px-3 py-2 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => triggerToast("Access Token copied to clipboard!")}
                      className="px-3 rounded-lg border border-border text-xs font-bold hover:bg-muted transition-all cursor-pointer shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">Session Expiry Time</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">Automatically log out inactive dashboard sessions.</span>
                  </div>
                  <select className="h-8 text-xs bg-muted/30 border border-border rounded-md px-2 focus:outline-none cursor-pointer">
                    <option>1 Hour</option>
                    <option>12 Hours</option>
                    <option>24 Hours</option>
                    <option>Never Expire</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => triggerToast("Security credentials verified and saved!")}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-all shadow-sm hover:opacity-90 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Verify & Save</span>
                </button>
              </div>
            </div>
          )}

          {/* WEBHOOKS TAB */}
          {activeTab === "webhooks" && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm animate-in fade-in duration-200">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
                <Webhook className="w-4 h-4 text-emerald-500" />
                <span>Webhooks & Integrations</span>
              </h2>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    Webhook Endpoint URL
                  </label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full text-xs font-semibold bg-muted/20 text-foreground border border-border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary/25"
                  />
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    Trigger Webhook Events
                  </span>
                  
                  {/* Event 1 */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={webhookEvents.uploaded}
                      onChange={(e) => setWebhookEvents({...webhookEvents, uploaded: e.target.checked})}
                      className="rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">deliverable.uploaded</span>
                      <span className="text-[10px] text-muted-foreground">Trigger when new client files are uploaded to the vault.</span>
                    </div>
                  </label>

                  {/* Event 2 */}
                  <label className="flex items-center gap-3 cursor-pointer border-t border-border/30 pt-3">
                    <input
                      type="checkbox"
                      checked={webhookEvents.approved}
                      onChange={(e) => setWebhookEvents({...webhookEvents, approved: e.target.checked})}
                      className="rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">deliverable.approved</span>
                      <span className="text-[10px] text-muted-foreground">Trigger when a client signs off or approves a deliverable.</span>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 mt-2 border-t border-border/40 pt-4">
                  <button
                    type="button"
                    onClick={() => triggerToast("Test Webhook payload dispatched!")}
                    className="inline-flex items-center justify-center h-9 px-3 rounded-lg border border-border bg-background text-xs font-bold hover:bg-muted text-foreground transition-all cursor-pointer"
                  >
                    Send Test Payload
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => triggerToast("Webhook integrations saved!")}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-all shadow-sm hover:opacity-90 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Integration</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating Branded micro-toast feedback panel */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-100 p-4 rounded-xl bg-card border border-border shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">{toastMessage}</span>
            <span className="text-[10px] text-muted-foreground">Changes synchronized across context stores.</span>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple helper utility to conditionally combine classnames
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
