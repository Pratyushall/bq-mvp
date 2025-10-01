"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";

type ToastVariant = "default" | "destructive" | "success" | "info";
export type ToastOpts = {
  title?: string;
  description?: string;
  duration?: number; // ms
  variant?: ToastVariant;
  action?: { label: string; onClick: () => void };
};

type ToastItem = ToastOpts & { id: string };

type Ctx = {
  toasts: ToastItem[];
  remove: (id: string) => void;
  push: (opts: ToastOpts) => string;
};

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (opts: ToastOpts) => {
      const id = Math.random().toString(36).slice(2);
      const item: ToastItem = {
        id,
        duration: 3500,
        variant: "default",
        ...opts,
      };
      setToasts((t) => [item, ...t]);
      if (item.duration && item.duration > 0) {
        setTimeout(() => remove(id), item.duration);
      }
      return id;
    },
    [remove]
  );

  const value = useMemo(
    () => ({ toasts, remove, push }),
    [toasts, remove, push]
  );

  return <ToastCtx.Provider value={value}>{children}</ToastCtx.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  const toast = ctx.push;
  return { toast, toasts: ctx.toasts, dismiss: ctx.remove };
}
