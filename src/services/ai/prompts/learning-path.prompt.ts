import { formatUserContextBlock } from "../utils/user-context";
import type { UserContext } from "../types";

export function buildLearningPathPrompt(context: UserContext): string {
  return `Given this user context:
${formatUserContextBlock(context)}

Generate a beginner-friendly Web3 learning path tailored to their goal and existing skills.

Return a JSON object matching this shape:
{
  "title": string,
  "level": "beginner" | "intermediate" | "advanced",
  "steps": [
    {
      "title": string,
      "description": string,
      "resourceType": "article" | "video" | "course" | "project" | "community",
      "estimatedMinutes": number
    }
  ] // 4-7 steps, ordered
}`;
}
