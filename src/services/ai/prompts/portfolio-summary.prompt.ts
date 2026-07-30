import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export function buildPortfolioSummaryPrompt(context: UserContext): string {
  return `Given this user context:
${formatUserContextBlock(context)}

Write a professional portfolio summary as if reviewing this person's Web3 profile.

Return a JSON object matching this shape:
{
  "headline": string,        // one-line professional headline
  "strengths": string[],     // 2-4 items, grounded in their stated skills/interests
  "gaps": string[],          // 1-3 areas to develop, framed constructively
  "suggestedNextSteps": string[] // 2-4 concrete actions
}`;
}
