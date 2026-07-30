"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingProvider } from "@/features/onboarding/use-onboarding-store";
import { ProfilePhotoProvider } from "@/features/profile/use-profile-photo";
import { VaultProvider } from "@/features/vault/use-vault-store";
import { ConnectionsProvider } from "@/features/identity/use-connections-store";
import { AcademyProvider } from "@/features/academy/use-academy-store";

/**
 * Single composition point for all client-side providers.
 * Wrap the root layout with this instead of nesting providers directly.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="onboardchain-theme">
      <TooltipProvider delayDuration={150}>
        <OnboardingProvider>
          <ProfilePhotoProvider>
            <VaultProvider>
              <ConnectionsProvider>
                <AcademyProvider>{children}</AcademyProvider>
              </ConnectionsProvider>
            </VaultProvider>
          </ProfilePhotoProvider>
        </OnboardingProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
