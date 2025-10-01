"use client";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed inset-x-0 top-4 z-[9999] flex flex-col items-center gap-2 px-2 sm:top-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            "w-full sm:w-auto max-w-md rounded-2xl border shadow-lg bg-background",
            "px-4 py-3 ring-1 ring-black/5",
            t.variant === "destructive" &&
              "border-destructive/30 bg-destructive/10 text-destructive-foreground",
            t.variant === "success" &&
              "border-emerald-400/40 bg-emerald-50 dark:bg-emerald-900/20",
            t.variant === "info" &&
              "border-sky-400/40 bg-sky-50 dark:bg-sky-900/20"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              {t.title && <div className="font-semibold">{t.title}</div>}
              {t.description && (
                <div className="text-sm opacity-90">{t.description}</div>
              )}
              {t.action && (
                <button
                  onClick={t.action.onClick}
                  className="mt-2 inline-flex rounded-lg border px-2.5 py-1 text-xs hover:bg-muted"
                >
                  {t.action.label}
                </button>
              )}
            </div>
            <button
              aria-label="Dismiss"
              onClick={() => dismiss(t.id)}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
