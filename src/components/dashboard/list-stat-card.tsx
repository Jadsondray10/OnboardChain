import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ListStatRow {
  title: string;
  meta: string;
  badge?: string;
}

interface ListStatCardProps {
  icon: LucideIcon;
  label: string;
  rows: ListStatRow[];
  className?: string;
}

export function ListStatCard({ icon: Icon, label, rows, className }: ListStatCardProps) {
  return (
    <Card className={cn("glow-card flex flex-col p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-secondary/60">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.title} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{row.title}</p>
              <p className="text-xs text-muted-foreground">{row.meta}</p>
            </div>
            {row.badge && (
              <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
                {row.badge}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
