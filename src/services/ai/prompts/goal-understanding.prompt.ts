import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export function buildGoalUnderstandingPrompt(context: UserContext): string {
  return `Given this user context:
${formatUserContextBlock(context)}

Return a JSON object matching this shape:
{
  "primaryGoal": string,
  "motivations": string[],   // 2-4 short phrases inferred from their stated reason
  "recommendedFocusAreas": string[], // 2-4 concrete areas to focus on first
  "summary": string          // one encouraging sentence tying it together
}`;
}
