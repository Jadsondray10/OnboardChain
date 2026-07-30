"use client";

import { Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PlatformMeta } from "@/features/identity/platforms";

interface PlatformCardProps {
  platform: PlatformMeta;
  icon: React.ReactNode;
  connected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  secondaryAction?: React.ReactNode;
}

export function PlatformCard({
  platform,
  icon,
  connected,
  isConnecting,
  onConnect,
  secondaryAction,
}: PlatformCardProps) {
  return (
    <Card className="glow-card flex flex-col justify-between p-6">
      <div>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border bg-secondary/60">
          <span className="h-5 w-5">{icon}</span>
        </div>
        <h3 className="font-heading text-lg font-semibold tracking-tight">{platform.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{platform.description}</p>
      </div>

      <div className="mt-6 space-y-2">
        <Button
          onClick={onConnect}
          disabled={connected || isConnecting}
          variant={connected ? "secondary" : "gradient"}
          className="w-full"
        >
          {connected ? (
            <>
              <Check className="h-4 w-4" /> Connected
            </>
          ) : isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Connecting...
            </>
          ) : (
            platform.connectLabel
          )}
        </Button>
        {!connected && secondaryAction}
      </div>
    </Card>
  );
}
