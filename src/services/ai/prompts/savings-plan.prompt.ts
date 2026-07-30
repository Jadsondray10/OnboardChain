import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export interface SavingsPlanPromptInput {
  context: UserContext;
  goalLabel: string;
  targetAmount: number;
  monthsAvailable?: number;
}

export function buildSavingsPlanPrompt(input: SavingsPlanPromptInput): string {
  const { context, goalLabel, targetAmount, monthsAvailable } = input;

  return `Given this user context:
${formatUserContextBlock(context)}

They want to save toward: ${goalLabel}, target amount: $${targetAmount}${
    monthsAvailable ? `, within ${monthsAvailable} months` : ""
  }.

Return a JSON object matching this shape:
{
  "goalLabel": string,
  "recommendedMonthlyContribution": number,
  "projectedCompletionMonths": number,
  "milestones": [ { "month": number, "projectedAmount": number } ], // 4-6 checkpoints
  "rationale": string // one paragraph explaining the plan
}`;
}
