"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/features/onboarding/use-onboarding-store";
import { onboardingQuestions } from "@/features/onboarding/questions";
import type { OnboardingChoice, OnboardingFieldKey } from "@/features/onboarding/types";
import { ChatBubble } from "./chat-bubble";
import { TypingIndicator } from "./typing-indicator";
import { QuickReplies } from "./quick-replies";
import { OnboardingProgress } from "./progress-bar";
import { ROUTES } from "@/lib/constants";

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
}

const THINK_DELAY = 550;

export function OnboardingChat() {
  const router = useRouter();
  const { setAnswer, markComplete } = useOnboardingStore();

  const [stepIndex, setStepIndex] = React.useState(0);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);
  const [awaitingChoice, setAwaitingChoice] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const askedRef = React.useRef(false);

  const currentQuestion = onboardingQuestions[stepIndex];

  // Kick off the very first question on mount.
  React.useEffect(() => {
    if (askedRef.current) return;
    askedRef.current = true;
    askQuestion(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  React.useEffect(() => {
    if (!isThinking && !awaitingChoice && !isDone) inputRef.current?.focus();
  }, [isThinking, awaitingChoice, isDone]);

  function askQuestion(index: number) {
    const question = onboardingQuestions[index];
    if (!question) return;

    setIsThinking(true);
    window.setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [...prev, { id: `q-${index}`, role: "ai", content: question.prompt }]);
      setAwaitingChoice(question.kind === "choice");
    }, THINK_DELAY);
  }

  function handleAnswer(fieldId: OnboardingFieldKey, rawValue: string, displayValue: string) {
    if (!rawValue.trim()) return;

    setAnswer(fieldId, rawValue.trim());
    setMessages((prev) => [
      ...prev,
      { id: `a-${stepIndex}`, role: "user", content: displayValue },
    ]);
    setAwaitingChoice(false);
    setInputValue("");

    const nextIndex = stepIndex + 1;
    if (nextIndex >= onboardingQuestions.length) {
      finishOnboarding();
      return;
    }

    setStepIndex(nextIndex);
    askQuestion(nextIndex);
  }

  function finishOnboarding() {
    setIsThinking(true);
    window.setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: "done",
          role: "ai",
          content: "That's everything I need. Your Web3 profile is ready — taking you to your dashboard.",
        },
      ]);
      setIsDone(true);
      markComplete();
      window.setTimeout(() => router.push(ROUTES.identity), 1400);
    }, THINK_DELAY);
  }

  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentQuestion || currentQuestion.kind !== "text") return;
    handleAnswer(currentQuestion.id, inputValue, inputValue.trim());
  }

  function handleChoiceSelect(choice: OnboardingChoice) {
    if (!currentQuestion) return;
    handleAnswer(currentQuestion.id, choice.value, choice.label);
  }

  const totalSteps = onboardingQuestions.length;
  const displayStep = Math.min(stepIndex + 1, totalSteps);

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-2xl flex-col px-4">
      <div className="py-6">
        <OnboardingProgress step={isDone ? totalSteps : displayStep} total={totalSteps} />
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pb-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role}>
              {m.content}
            </ChatBubble>
          ))}
        </AnimatePresence>

        {isThinking && <TypingIndicator />}

        {awaitingChoice && currentQuestion?.kind === "choice" && !isThinking && (
          <QuickReplies choices={currentQuestion.choices ?? []} onSelect={handleChoiceSelect} />
        )}
      </div>

      {!isDone && currentQuestion?.kind === "text" && (
        <form onSubmit={handleTextSubmit} className="flex items-center gap-2 border-t py-4">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={currentQuestion.placeholder}
            disabled={isThinking}
            className="h-11 flex-1 rounded-full border bg-secondary/60 px-4 text-sm outline-none ring-primary/40 transition focus:ring-2 disabled:opacity-50"
          />
          <Button type="submit" size="icon" variant="gradient" disabled={isThinking || !inputValue.trim()}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
      )}

      {!isDone && currentQuestion?.kind === "choice" && (
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          Pick the option that fits best.
        </div>
      )}

      {isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t py-4 text-center text-xs text-muted-foreground"
        >
          Redirecting to your dashboard...
        </motion.div>
      )}
    </div>
  );
}
