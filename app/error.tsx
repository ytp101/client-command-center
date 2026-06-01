"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { 
  RotateCcw, 
  Home, 
  ShieldAlert
} from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics service in a real production environment
    console.error("Intercepted uncaught client-side error:", error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[70vh] px-6 py-12 text-center bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="flex flex-col items-center max-w-md w-full bg-card border border-border/80 rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
        {/* Visual Background Accent Decorator */}
        <div className="absolute top-0 inset-x-0 h-2 bg-rose-500" />
        
        {/* Warning Badge Shield */}
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mb-6 border border-rose-500/15">
          <ShieldAlert className="w-10 h-10 animate-bounce" />
        </div>

        {/* Error Typography */}
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Command Center Alert
        </h1>
        <h2 className="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-2 tracking-wide uppercase">
          Something went wrong
        </h2>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-sm">
          An unexpected application error crashed the view. We have logged the trace details. Try restarting the frame to recover.
        </p>

        {/* Optional Error Message for Developers */}
        {process.env.NODE_ENV !== "production" && (
          <div className="w-full text-left bg-muted/70 p-3 rounded-lg border border-border/60 mt-5 text-[10px] font-mono text-muted-foreground overflow-x-auto max-h-24">
            <span className="font-bold text-rose-600 block mb-1">Details:</span>
            {error.message || "Unknown compile/runtime mismatch"}
          </div>
        )}

        {/* Recovery Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-8 pt-6 border-t border-border/60">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm hover:opacity-90 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10.5 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground font-semibold text-xs transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
