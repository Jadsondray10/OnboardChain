import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import type { GeneratedProfile } from "@/features/profile/generate-profile";

export function ProfileHeader({ profile }: { profile: GeneratedProfile }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card glow-card">
      <div className="h-28 bg-[linear-gradient(95deg,hsl(var(--arc-from)/0.35),hsl(var(--arc-via)/0.35),hsl(var(--arc-to)/0.35))] bg-grid sm:h-32" />

      <div className="px-6 pb-6">
        <div className="-mt-10 flex flex-col items-start gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <AvatarUpload initials={profile.initials} />
            <div className="pb-1">
              <h1 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                {profile.name}
              </h1>
              <p className="text-sm text-muted-foreground">{profile.headline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono">
              Score {profile.portfolioScore}
            </Badge>
            <Button size="sm" variant="outline">
              Edit profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
