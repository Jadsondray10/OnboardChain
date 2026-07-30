import type { OnboardingQuestion } from "./types";

/**
 * The conversation script. Order here drives the whole flow — the chat
 * walks through these one at a time, sequentially.
 */
export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "name",
    kind: "text",
    prompt: "Hey — welcome to OnboardChain. What's your name?",
    placeholder: "Type your name...",
  },
  {
    id: "role",
    kind: "text",
    prompt: "Nice to meet you. What do you currently do?",
    placeholder: "e.g. Freelance designer, CS student, marketer...",
  },
  {
    id: "skills",
    kind: "text",
    prompt: "What skills do you have? List a few, separated by commas.",
    placeholder: "e.g. Figma, copywriting, Solidity, video editing...",
  },
  {
    id: "interests",
    kind: "text",
    prompt: "What are you interested in? Also fine as a comma-separated list.",
    placeholder: "e.g. DeFi, generative art, gaming, music...",
  },
  {
    id: "reason",
    kind: "text",
    prompt: "Why are you joining Web3?",
    placeholder: "Tell me a bit about what brought you here...",
  },
  {
    id: "goal",
    kind: "choice",
    prompt: "Last one — what's your biggest goal right now?",
    choices: [
      { value: "learn-crypto", label: "Learn crypto" },
      { value: "web3-job", label: "Get a Web3 job" },
      { value: "build-startup", label: "Build a startup" },
      { value: "become-founder", label: "Become a founder" },
      { value: "invest", label: "Invest" },
      { value: "trade", label: "Trade" },
    ],
  },
];

const goalQuestion = onboardingQuestions.find((q) => q.id === "goal");

/** Look up the human-readable label for a stored goal value. */
export function getGoalLabel(value: string): string {
  return goalQuestion?.choices?.find((c) => c.value === value)?.label ?? value;
}

/** Split a comma-separated free-text answer into a clean list. */
export function splitList(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}
