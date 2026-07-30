import type { OnboardingAnswers } from "@/features/onboarding/types";
import { getGoalLabel, splitList } from "@/features/onboarding/questions";

export interface ExperienceEntry {
  title: string;
  meta: string;
}

export interface GeneratedProfile {
  name: string;
  initials: string;
  headline: string;
  bio: string;
  skills: string[];
  interests: string[];
  experience: ExperienceEntry[];
  services: string[];
  goalLabel: string;
  portfolioScore: number;
}

/**
 * Turns raw onboarding answers into profile content.
 * This is a deterministic mock — it stands in for what an AI generation
 * step would produce later, so the shape mirrors what that step would return.
 */
export function generateProfile(answers: OnboardingAnswers): GeneratedProfile {
  const name = answers.name.trim() || "New member";
  const role = answers.role.trim() || "Exploring Web3";
  const skills = splitList(answers.skills);
  const interests = splitList(answers.interests);
  const goalLabel = answers.goal ? getGoalLabel(answers.goal) : "Getting started";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "OC";

  const headline = skills.length
    ? `${role} · building toward ${goalLabel.toLowerCase()}`
    : `${role} · new to Web3`;

  const bio = buildBio(name, role, answers.reason, goalLabel, interests);

  const experience: ExperienceEntry[] = [
    { title: role, meta: "Current focus" },
  ];

  const services = skills.slice(0, 4).map((skill) => `${skill} — available for work`);

  const filledFields = Object.values(answers).filter((v) => v.trim().length > 0).length;
  const portfolioScore = Math.min(
    99,
    40 + filledFields * 5 + skills.length * 3 + interests.length * 2
  );

  return {
    name,
    initials,
    headline,
    bio,
    skills,
    interests,
    experience,
    services,
    goalLabel,
    portfolioScore,
  };
}

function buildBio(
  name: string,
  role: string,
  reason: string,
  goalLabel: string,
  interests: string[]
): string {
  const interestClause = interests.length
    ? ` with a particular interest in ${interests.slice(0, 3).join(", ")}`
    : "";
  const reasonClause = reason.trim() ? ` ${reason.trim()}` : " Still figuring out exactly why, and that's fine.";

  return `${name} is ${role.toLowerCase().startsWith("a") ? "" : "a "}${role}${interestClause}, now onboarding onto Arc.${reasonClause} Currently working toward: ${goalLabel.toLowerCase()}.`;
}
