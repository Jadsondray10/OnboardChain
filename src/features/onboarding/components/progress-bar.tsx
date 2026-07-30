"use client";

import { motion } from "framer-motion";

export function OnboardingProgress({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, Math.round((step / total) * 100));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          Step {String(Math.min(step, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(95deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
