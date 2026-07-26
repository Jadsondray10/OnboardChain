"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The signature element of the landing page: a single arc that sweeps
 * from a muted "Web2" point to a glowing "Web3" point, drawing itself
 * in on load. It's the one visual idea the whole page is built around —
 * literalizing the product name and the shape of the onboarding journey.
 */
export function ArcPath({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--arc-from))" stopOpacity="0" />
            <stop offset="35%" stopColor="hsl(var(--arc-from))" />
            <stop offset="65%" stopColor="hsl(var(--arc-via))" />
            <stop offset="100%" stopColor="hsl(var(--arc-to))" />
          </linearGradient>
          <filter id="arc-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Faint origin point — "Web2" */}
        <circle cx="120" cy="470" r="4" className="fill-muted-foreground/40" />
        <text
          x="140"
          y="475"
          className="fill-muted-foreground text-[13px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          web2
        </text>

        {/* Glowing destination point — "Web3 / Arc" */}
        <circle cx="1080" cy="90" r="5" fill="hsl(var(--arc-to))" filter="url(#arc-blur)" />
        <circle cx="1080" cy="90" r="3" fill="hsl(var(--arc-to))" />
        <text
          x="1000"
          y="70"
          className="fill-foreground text-[13px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          arc
        </text>

        <motion.path
          d="M 120 470 C 380 470, 420 90, 1080 90"
          stroke="url(#arc-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
    </div>
  );
}
