"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConnectionsStore } from "@/features/identity/use-connections-store";
import { calculateProfileCompletion } from "@/features/identity/progress";
import { ROUTES } from "@/lib/constants";

const TOTAL_PLATFORMS = 4;

export function IdentityProgress() {
  const router = useRouter();
  const { connectedCount } = useConnectionsStore();
  const completion = calculateProfileCompletion(connectedCount);

  return (
    <div className="rounded-xl border bg-card p-6 glow-card">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 space-y-4">
          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Profile Complete
              </span>
              <span className="font-heading text-sm font-semibold">{completion}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(95deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))]"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Connected Accounts
              </span>
              <span className="font-heading text-sm font-semibold">
                {connectedCount} of {TOTAL_PLATFORMS}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-secondary-foreground/40"
                initial={{ width: 0 }}
                animate={{ width: `${(connectedCount / TOTAL_PLATFORMS) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        <Button size="lg" variant="gradient" onClick={() => router.push(ROUTES.academy)}>
          Continue Learning <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
