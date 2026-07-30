"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))] text-xs font-semibold text-white">
        O
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border bg-card px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
