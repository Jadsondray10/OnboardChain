import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export function buildCommunityRecommendationsPrompt(context: UserContext): string {
  return `Given this user context:
${formatUserContextBlock(context)}

Recommend Web3 communities (Discord/Telegram/Farcaster/forums) this person should join, relevant to their goal and interests.

Return a JSON array matching this shape:
[
  {
    "name": string,
    "platform": "discord" | "telegram" | "farcaster" | "forum" | "other",
    "reason": string,
    "url": string // optional
  }
] // 3-5 entries`;
}
