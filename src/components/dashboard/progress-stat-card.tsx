import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgressStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  percent: number;
  hint?: string;
  className?: string;
}

export function ProgressStatCard({
  icon: Icon,
  label,
  value,
  percent,
  hint,
  className,
}: ProgressStatCardProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <Card className={cn("glow-card flex flex-col justify-between p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-secondary/60">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <p className="font-heading text-2xl font-semibold tracking-tight">{value}</p>
          <span className="font-mono text-xs text-muted-foreground">{clamped}%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-[linear-gradient(95deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))]"
            style={{ width: `${clamped}%` }}
          />
        </div>
        {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </Card>
  );
}
