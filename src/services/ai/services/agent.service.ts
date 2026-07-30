import type { AiModelClient } from "../model-client";
import { AGENT_SYSTEM_PROMPT } from "../prompts/system-prompt";
import { buildGoalUnderstandingPrompt } from "../prompts/goal-understanding.prompt";
import { buildLearningPathPrompt } from "../prompts/learning-path.prompt";
import { buildFounderRecommendationsPrompt } from "../prompts/founder-recommendations.prompt";
import { buildCommunityRecommendationsPrompt } from "../prompts/community-recommendations.prompt";
import { buildHackathonRecommendationsPrompt } from "../prompts/hackathon-recommendations.prompt";
import { buildSavingsPlanPrompt, type SavingsPlanPromptInput } from "../prompts/savings-plan.prompt";
import { buildPortfolioSummaryPrompt } from "../prompts/portfolio-summary.prompt";
import { parseJsonResponse } from "../utils/json-parser";
import type {
  CommunityRecommendation,
  FounderRecommendation,
  HackathonRecommendation,
  LearningPath,
  PortfolioSummary,
  SavingsPlan,
  UserContext,
  UserGoalUnderstanding,
} from "../types";

export interface SavingsPlanInput {
  context: UserContext;
  goalLabel: string;
  targetAmount: number;
  monthsAvailable?: number;
}

/**
 * The AI Agent's public surface. One method per capability, each
 * returning a typed, structured result — never raw model text. UI code
 * depends on this interface only, never on prompt strings or the model
 * client directly.
 */
export interface AiAgentService {
  understandGoals(context: UserContext): Promise<UserGoalUnderstanding>;
  generateLearningPath(context: UserContext): Promise<LearningPath>;
  recommendFounders(context: UserContext): Promise<FounderRecommendation[]>;
  recommendCommunities(context: UserContext): Promise<CommunityRecommendation[]>;
  recommendHackathons(context: UserContext): Promise<HackathonRecommendation[]>;
  generateSavingsPlan(input: SavingsPlanInput): Promise<SavingsPlan>;
  generatePortfolioSummary(context: UserContext): Promise<PortfolioSummary>;
}

export class AiAgentServiceImpl implements AiAgentService {
  constructor(private readonly modelClient: AiModelClient) {}

  async understandGoals(context: UserContext): Promise<UserGoalUnderstanding> {
    return this.run(buildGoalUnderstandingPrompt(context));
  }

  async generateLearningPath(context: UserContext): Promise<LearningPath> {
    return this.run(buildLearningPathPrompt(context));
  }

  async recommendFounders(context: UserContext): Promise<FounderRecommendation[]> {
    return this.run(buildFounderRecommendationsPrompt(context));
  }

  async recommendCommunities(context: UserContext): Promise<CommunityRecommendation[]> {
    return this.run(buildCommunityRecommendationsPrompt(context));
  }

  async recommendHackathons(context: UserContext): Promise<HackathonRecommendation[]> {
    return this.run(buildHackathonRecommendationsPrompt(context));
  }

  async generateSavingsPlan(input: SavingsPlanPromptInput): Promise<SavingsPlan> {
    return this.run(buildSavingsPlanPrompt(input));
  }

  async generatePortfolioSummary(context: UserContext): Promise<PortfolioSummary> {
    return this.run(buildPortfolioSummaryPrompt(context));
  }

  /** Shared call → parse pipeline every capability method funnels through. */
  private async run<T>(prompt: string): Promise<T> {
    const raw = await this.modelClient.complete({ system: AGENT_SYSTEM_PROMPT, prompt });
    return parseJsonResponse<T>(raw);
  }
}

export function createAiAgentService(modelClient: AiModelClient): AiAgentService {
  return new AiAgentServiceImpl(modelClient);
}
