import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({ icon: Icon, label, value, hint, className, children }: StatCardProps) {
  return (
    <Card className={cn("glow-card flex flex-col justify-between p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-secondary/60">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-heading text-2xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </Card>
  );
}
