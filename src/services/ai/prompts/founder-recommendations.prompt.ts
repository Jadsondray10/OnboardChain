import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export function buildFounderRecommendationsPrompt(context: UserContext): string {
  return `Given this user context:
${formatUserContextBlock(context)}

Recommend founders/builders in the Arc/Web3 ecosystem this person could learn from or connect with, relevant to their goal and interests.

Return a JSON array matching this shape:
[
  {
    "name": string,
    "focusArea": string,
    "reason": string,     // why this founder is relevant to THIS user specifically
    "profileUrl": string  // optional
  }
] // 3-5 entries`;
}
