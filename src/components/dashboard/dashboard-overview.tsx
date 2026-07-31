"use client";

import {
  UserCircle,
  Wallet,
  Target,
  Compass,
  GraduationCap,
  Gift,
} from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressStatCard } from "@/components/dashboard/progress-stat-card";
import { ListStatCard } from "@/components/dashboard/list-stat-card";
import { useOnboardingStore } from "@/features/onboarding/use-onboarding-store";
import { getGoalLabel, splitList } from "@/features/onboarding/questions";
import { emptyOnboardingAnswers } from "@/features/onboarding/types";

export function DashboardOverview() {
  const { answers, hydrated } = useOnboardingStore();
  const source = hydrated ? answers : emptyOnboardingAnswers;

  const fieldCount = Object.values(emptyOnboardingAnswers).length;
  const filledCount = Object.values(source).filter((v) => v.trim().length > 0).length;
  const completion = Math.round((filledCount / fieldCount) * 100);

  const firstName = source.name.trim().split(" ")[0] || "there";
  const goalLabel = source.goal ? getGoalLabel(source.goal) : "Not set yet";
  const interests = splitList(source.interests);
  const skills = splitList(source.skills);

  const opportunities = buildOpportunities(interests, skills);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal className="sm:col-span-2 lg:col-span-3">
        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="text-foreground">{firstName}</span> — here&apos;s where things stand.
        </p>
      </Reveal>

      <Reveal delay={0.02}>
        <ProgressStatCard
          icon={UserCircle}
          label="Profile Completion"
          value={`${filledCount}/${fieldCount} sections`}
          percent={completion}
          hint={completion === 100 ? "Your profile is complete." : "Finish onboarding to unlock more."}
        />
      </Reveal>

      <Reveal delay={0.06}>
        <StatCard
          icon={Wallet}
          label="Wallet Balance"
          value="1,250.00 USDC"
          hint="Arc Testnet · mock balance"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <StatCard
          icon={Target}
          label="Current Goal"
          value={goalLabel}
          hint={source.reason ? truncate(source.reason, 64) : "Complete onboarding to set a goal."}
        />
      </Reveal>

      <Reveal delay={0.14} className="lg:col-span-2">
        <ListStatCard icon={Compass} label="Recommended Opportunities" rows={opportunities} />
      </Reveal>

      <Reveal delay={0.18}>
        <ProgressStatCard
          icon={GraduationCap}
          label="Learning Progress"
          value="3 / 12 modules"
          percent={25}
          hint="Web3 Fundamentals track"
        />
      </Reveal>

      <Reveal delay={0.22} className="sm:col-span-2 lg:col-span-3">
        <ListStatCard
          icon={Gift}
          label="Upcoming Rewards"
          rows={[
            { title: "Complete your profile", meta: "One-time bonus", badge: "+50 XP" },
            { title: "Finish your first lesson", meta: "Web3 Fundamentals", badge: "+20 XP" },
            { title: "Create your Arc wallet", meta: "One-time bonus", badge: "+30 XP" },
          ]}
        />
      </Reveal>
    </div>
  );
}

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function buildOpportunities(interests: string[], skills: string[]) {
  const tag = interests[0] ?? skills[0] ?? "Web3";
  return [
    { title: `${tag} community grant`, meta: "Arc Ecosystem Fund", badge: "Grant" },
    { title: `Freelance gig in ${skills[0] ?? "your field"}`, meta: "Matched to your skills", badge: "Gig" },
    { title: "Founder collab — early team", meta: "2 openings", badge: "Collab" },
  ];
}
