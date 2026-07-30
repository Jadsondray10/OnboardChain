"use client";

import * as React from "react";

const STORAGE_KEY = "onboardchain-academy-progress";

interface AcademyStore {
  completedLessonIds: string[];
  hydrated: boolean;
  toggleComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
}

const AcademyContext = React.createContext<AcademyStore | null>(null);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const [completedLessonIds, setCompletedLessonIds] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCompletedLessonIds(JSON.parse(stored));
    } catch {
      // localStorage unavailable — start fresh, in-memory only
    } finally {
      setHydrated(true);
    }
  }, []);

  const toggleComplete = React.useCallback((lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const next = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore write failures
      }
      return next;
    });
  }, []);

  const isComplete = React.useCallback(
    (lessonId: string) => completedLessonIds.includes(lessonId),
    [completedLessonIds]
  );

  const value = React.useMemo(
    () => ({ completedLessonIds, hydrated, toggleComplete, isComplete }),
    [completedLessonIds, hydrated, toggleComplete, isComplete]
  );

  return <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>;
}

export function useAcademyStore() {
  const ctx = React.useContext(AcademyContext);
  if (!ctx) throw new Error("useAcademyStore must be used within AcademyProvider");
  return ctx;
}
