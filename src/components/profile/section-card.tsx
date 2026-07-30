import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, className, children }: SectionCardProps) {
  return (
    <Card className={cn("glow-card", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
