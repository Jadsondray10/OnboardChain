"use client";
import { AcademyStats } from "@/components/academy/academy-stats";
import { LessonCard } from "@/components/academy/lesson-card";
import { Reveal } from "@/components/marketing/reveal";
import { lessons } from "@/features/academy/courses";

export function AcademyView() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12 sm:py-16">
      <Reveal className="text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome to Web3 Academy
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Learn Web3 one step at a time with short AI-guided lessons.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <AcademyStats />
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, i) => (
          <Reveal key={lesson.id} delay={0.08 + i * 0.03}>
            <LessonCard lesson={lesson} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
