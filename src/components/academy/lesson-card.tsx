"use client";

import { Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAcademyStore } from "@/features/academy/use-academy-store";
import type { Lesson } from "@/features/academy/types";

const levelStyles: Record<Lesson["level"], string> = {
  beginner: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  intermediate: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  advanced: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { isComplete, toggleComplete } = useAcademyStore();
  const Icon = lesson.icon;
  const completed = isComplete(lesson.id);

  return (
    <Card className={cn("glow-card flex flex-col justify-between p-5", completed && "border-primary/30")}>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary/60">
            <Icon className="h-5 w-5" />
          </div>
          {completed && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3.5 w-3.5" />
            </span>
          )}
        </div>

        <h3 className="font-heading font-semibold leading-snug">{lesson.title}</h3>

        <div className="mt-3 flex items-center gap-2">
          <Badge variant="outline" className={cn("capitalize", levelStyles[lesson.level])}>
            {lesson.level}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Estimated {lesson.estimatedMinutes} min
          </span>
        </div>
      </div>

      <Button
        variant={completed ? "secondary" : "outline"}
        size="sm"
        className="mt-5 w-full"
        onClick={() => toggleComplete(lesson.id)}
      >
        {completed ? "Completed" : "Start lesson"}
      </Button>
    </Card>
  );
}
