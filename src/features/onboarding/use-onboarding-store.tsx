"use client";

import * as React from "react";
import { emptyOnboardingAnswers, type OnboardingAnswers } from "./types";

const STORAGE_KEY = "onboardchain-onboarding-answers";
const COMPLETE_KEY = "onboardchain-onboarding-complete";

interface OnboardingStore {
  answers: OnboardingAnswers;
  isComplete: boolean;
  hydrated: boolean;
  setAnswer: (key: keyof OnboardingAnswers, value: string) => void;
  markComplete: () => void;
  reset: () => void;
}

const OnboardingContext = React.createContext<OnboardingStore | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = React.useState<OnboardingAnswers>(emptyOnboardingAnswers);
  const [isComplete, setIsComplete] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedAnswers = window.localStorage.getItem(STORAGE_KEY);
      const storedComplete = window.localStorage.getItem(COMPLETE_KEY);
      if (storedAnswers) setAnswers(JSON.parse(storedAnswers));
      if (storedComplete) setIsComplete(storedComplete === "true");
    } catch {
      // localStorage unavailable — fall back to in-memory only
    } finally {
      setHydrated(true);
    }
  }, []);

  const setAnswer = React.useCallback((key: keyof OnboardingAnswers, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore write failures
      }
      return next;
    });
  }, []);

  const markComplete = React.useCallback(() => {
    setIsComplete(true);
    try {
      window.localStorage.setItem(COMPLETE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  const reset = React.useCallback(() => {
    setAnswers(emptyOnboardingAnswers);
    setIsComplete(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(COMPLETE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo(
    () => ({ answers, isComplete, hydrated, setAnswer, markComplete, reset }),
    [answers, isComplete, hydrated, setAnswer, markComplete, reset]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboardingStore() {
  const ctx = React.useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboardingStore must be used within OnboardingProvider");
  return ctx;
}
