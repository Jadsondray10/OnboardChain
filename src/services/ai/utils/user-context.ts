import type { OnboardingAnswers } from "@/features/onboarding/types";
import { getGoalLabel, splitList } from "@/features/onboarding/questions";
import type { UserContext } from "../types";

/**
 * Normalizes raw onboarding answers into the `UserContext` shape every
 * prompt builder expects. Centralizing this means the free-text →
 * structured-list parsing (comma splitting, goal-label lookup) happens
 * once, not once per prompt file.
 */
export function toUserContext(answers: OnboardingAnswers): UserContext {
  return {
    name: answers.name.trim(),
    role: answers.role.trim(),
    skills: splitList(answers.skills),
    interests: splitList(answers.interests),
    reason: answers.reason.trim(),
    goalLabel: answers.goal ? getGoalLabel(answers.goal) : "Not set",
  };
}

/** Renders a `UserContext` as a compact block for interpolation into prompts. */
export function formatUserContextBlock(context: UserContext): string {
  return [
    `Name: ${context.name || "Unknown"}`,
    `Current role: ${context.role || "Unknown"}`,
    `Skills: ${context.skills.join(", ") || "None listed"}`,
    `Interests: ${context.interests.join(", ") || "None listed"}`,
    `Reason for joining Web3: ${context.reason || "Not provided"}`,
    `Primary goal: ${context.goalLabel}`,
  ].join("\n");
}
