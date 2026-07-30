import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export function buildHackathonRecommendationsPrompt(context: UserContext): string {
  return `Given this user context:
${formatUserContextBlock(context)}

Recommend hackathons or builder programs this person should consider, relevant to their goal and skills.

Return a JSON array matching this shape:
[
  {
    "name": string,
    "focusArea": string,
    "reason": string,
    "url": string,       // optional
    "startDate": string  // optional, ISO date
  }
] // 2-4 entries`;
}
