/**
 * Structured JSON contracts for every AI Agent capability. These are the
 * types the model is instructed to return (see prompts/) and what
 * `services/agent.service.ts` resolves to. Keeping them here — separate
 * from prompts and orchestration — means the contract can be reused by
 * UI components, API routes, and tests without importing prompt text.
 */

export interface UserGoalUnderstanding {
  primaryGoal: string;
  motivations: string[];
  recommendedFocusAreas: string[];
  summary: string;
}

export interface LearningPathStep {
  title: string;
  description: string;
  resourceType: "article" | "video" | "course" | "project" | "community";
  estimatedMinutes: number;
}

export interface LearningPath {
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  steps: LearningPathStep[];
}

export interface FounderRecommendation {
  name: string;
  focusArea: string;
  reason: string;
  profileUrl?: string;
}

export interface CommunityRecommendation {
  name: string;
  platform: "discord" | "telegram" | "farcaster" | "forum" | "other";
  reason: string;
  url?: string;
}

export interface HackathonRecommendation {
  name: string;
  focusArea: string;
  reason: string;
  url?: string;
  startDate?: string;
}

export interface SavingsPlanMilestone {
  month: number;
  projectedAmount: number;
}

export interface SavingsPlan {
  goalLabel: string;
  recommendedMonthlyContribution: number;
  projectedCompletionMonths: number;
  milestones: SavingsPlanMilestone[];
  rationale: string;
}

export interface PortfolioSummary {
  headline: string;
  strengths: string[];
  gaps: string[];
  suggestedNextSteps: string[];
}

/** Shared input: every capability reasons from the same onboarding context. */
export interface UserContext {
  name: string;
  role: string;
  skills: string[];
  interests: string[];
  reason: string;
  goalLabel: string;
}
