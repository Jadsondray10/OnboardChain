"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useAcademyStore } from "@/features/academy/use-academy-store";
import { lessons } from "@/features/academy/courses";

export function AcademyStats() {
  const { completedLessonIds } = useAcademyStore();

  const total = lessons.length;
  const completed = completedLessonIds.length;
  const percent = Math.round((completed / total) * 100);
  const totalMinutes = lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);

  return (
    <Card className="glow-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-8">
          <Stat label="Lessons" value={`${completed}/${total}`} />
          <Stat label="Total time" value={`${totalMinutes} min`} />
          <Stat label="Progress" value={`${percent}%`} />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary sm:w-56">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(95deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))]"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-heading text-lg font-semibold">{value}</p>
    </div>
  );
}
