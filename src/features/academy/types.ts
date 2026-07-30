import type { LucideIcon } from "lucide-react";

export type LessonLevel = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  icon: LucideIcon;
  level: LessonLevel;
  estimatedMinutes: number;
}
