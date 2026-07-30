"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { OnboardingChoice } from "../types";

interface QuickRepliesProps {
  choices: OnboardingChoice[];
  onSelect: (choice: OnboardingChoice) => void;
  disabled?: boolean;
}

export function QuickReplies({ choices, onSelect, disabled }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 pl-11">
      {choices.map((choice, i) => (
        <motion.button
          key={choice.value}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(choice)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className={cn(
            "rounded-full border bg-secondary/60 px-3.5 py-1.5 text-sm text-foreground transition-colors",
            "hover:border-primary/50 hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {choice.label}
        </motion.button>
      ))}
    </div>
  );
}
