"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "ai" | "user";
  children: React.ReactNode;
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isAi = role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex w-full gap-3", isAi ? "justify-start" : "justify-end")}
    >
      {isAi && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))] text-xs font-semibold text-white">
          O
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%]",
          isAi
            ? "rounded-tl-sm border bg-card text-card-foreground"
            : "rounded-tr-sm bg-primary text-primary-foreground"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
