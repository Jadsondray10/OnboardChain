"use client";

import * as React from "react";
import { Github, Linkedin } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";
import { DiscordIcon } from "@/components/icons/discord-icon";
import { PlatformCard } from "@/components/identity/platform-card";
import { XSignupModal } from "@/components/identity/x-signup-modal";
import { IdentityProgress } from "@/components/identity/identity-progress";
import { Reveal } from "@/components/marketing/reveal";
import { useConnectionsStore } from "@/features/identity/use-connections-store";
import { platforms } from "@/features/identity/platforms";
import type { PlatformKey } from "@/features/identity/types";

const platformIcons: Record<PlatformKey, React.ReactNode> = {
  x: <XIcon className="h-5 w-5" />,
  discord: <DiscordIcon className="h-5 w-5" />,
  github: <Github className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
};

export function IdentityView() {
  const { connections, connectingPlatform, connect } = useConnectionsStore();
  const [xModalOpen, setXModalOpen] = React.useState(false);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-12 sm:py-16">
      <Reveal className="text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Complete Your Web3 Identity
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Your profile is ready. Let&apos;s connect you to the Web3 ecosystem before you begin.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {platforms.map((platform, i) => (
          <Reveal key={platform.key} delay={i * 0.05}>
            <PlatformCard
              platform={platform}
              icon={platformIcons[platform.key]}
              connected={connections[platform.key]}
              isConnecting={connectingPlatform === platform.key}
              onConnect={() => connect(platform.key)}
              secondaryAction={
                platform.key === "x" ? (
                  <button
                    type="button"
                    onClick={() => setXModalOpen(true)}
                    className="w-full text-center text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Don&apos;t have an X account?
                  </button>
                ) : undefined
              }
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <IdentityProgress />
      </Reveal>

      <XSignupModal
        open={xModalOpen}
        onOpenChange={setXModalOpen}
        onConnect={() => connect("x")}
        isConnecting={connectingPlatform === "x"}
      />
    </div>
  );
}
