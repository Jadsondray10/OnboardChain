"use client";

import * as React from "react";
import { Camera, X, Loader2 } from "lucide-react";
import { useProfilePhoto } from "@/features/profile/use-profile-photo";
import { cn } from "@/lib/utils";

export function AvatarUpload({ initials }: { initials: string }) {
  const { photoUrl, error, setPhotoFromFile, clearPhoto } = useProfilePhoto();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    setIsUploading(true);
    await setPhotoFromFile(file);
    setIsUploading(false);
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="group relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label={photoUrl ? "Change profile photo" : "Upload profile photo"}
          className={cn(
            "flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-card font-heading text-2xl font-semibold text-white transition-opacity",
            !photoUrl && "bg-[linear-gradient(135deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))]"
          )}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- local base64 preview, not an optimizable remote asset
            <img src={photoUrl} alt="Profile photo" className="h-full w-full object-cover" />
          ) : (
            initials
          )}

          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Camera className="h-5 w-5 text-white" />
            )}
          </span>
        </button>

        {photoUrl && (
          <button
            type="button"
            onClick={clearPhoto}
            aria-label="Remove profile photo"
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
