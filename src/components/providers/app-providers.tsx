"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Single composition point for all client-side providers.
 * Wrap the root layout with this instead of nesting providers directly.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="onboardchain-theme">
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
