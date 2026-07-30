"use client";

import { useOnboardingStore } from "@/features/onboarding/use-onboarding-store";
import { generateProfile } from "@/features/profile/generate-profile";
import { emptyOnboardingAnswers } from "@/features/onboarding/types";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SectionCard } from "@/components/profile/section-card";
import { PillList } from "@/components/profile/pill-list";
import { PortfolioScore } from "@/components/profile/portfolio-score";
import { Reveal } from "@/components/marketing/reveal";

export function ProfileView() {
  const { answers, hydrated } = useOnboardingStore();
  const profile = generateProfile(hydrated ? answers : emptyOnboardingAnswers);

  return (
    <div className="space-y-4">
      <Reveal>
        <ProfileHeader profile={profile} />
      </Reveal>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Reveal delay={0.04}>
            <SectionCard title="Biography">
              <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionCard title="Experience">
              <ul className="space-y-3">
                {profile.experience.map((entry) => (
                  <li key={entry.title} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-medium">{entry.title}</span>
                    <span className="text-xs text-muted-foreground">{entry.meta}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionCard title="Services">
              {profile.services.length ? (
                <ul className="space-y-2">
                  {profile.services.map((service) => (
                    <li key={service} className="text-sm text-muted-foreground">
                      {service}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add skills during onboarding to list services here.
                </p>
              )}
            </SectionCard>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal delay={0.06}>
            <SectionCard title="Portfolio score">
              <PortfolioScore score={profile.portfolioScore} />
            </SectionCard>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionCard title="Skills">
              <PillList items={profile.skills} emptyLabel="No skills added yet." />
            </SectionCard>
          </Reveal>

          <Reveal delay={0.14}>
            <SectionCard title="Interests">
              <PillList items={profile.interests} emptyLabel="No interests added yet." />
            </SectionCard>
          </Reveal>

          <Reveal delay={0.18}>
            <SectionCard title="Goal">
              <p className="text-sm font-medium">{profile.goalLabel}</p>
            </SectionCard>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
