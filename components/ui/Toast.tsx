"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateId } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

let addToastFn: ((toast: Omit<Toast, "id">) => void) | null = null;

export function toast(type: ToastType, message: string, duration = 4000) {
  addToastFn?.({ type, message, duration });
}

const icons: Record<ToastType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors: Record<ToastType, string> = {
  success: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  error: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  info: "border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-400",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (toastData) => {
      const id = generateId();
      const newToast: Toast = { id, ...toastData };
      setToasts((prev) => [...prev, newToast]);
      if (newToast.duration !== 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, newToast.duration ?? 4000);
      }
    };
    return () => { addToastFn = null; };
  }, []);

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-sm shadow-lg",
                colors[t.type]
              )}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="flex-1 text-sm font-medium text-[var(--text-primary)]">
                {t.message}
              </p>
              <button
                onClick={() => remove(t.id)}
                className="p-0.5 rounded-md opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Закрити"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
