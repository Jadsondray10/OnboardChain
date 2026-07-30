"use client";

import * as React from "react";

const STORAGE_KEY = "onboardchain-profile-photo";
const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2MB — keeps localStorage usage sane

interface ProfilePhotoStore {
  photoUrl: string | null;
  hydrated: boolean;
  error: string | null;
  setPhotoFromFile: (file: File) => Promise<void>;
  clearPhoto: () => void;
}

const ProfilePhotoContext = React.createContext<ProfilePhotoStore | null>(null);

export function ProfilePhotoProvider({ children }: { children: React.ReactNode }) {
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);
  const [hydrated, setHydrated] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setPhotoUrl(stored);
    } catch {
      // localStorage unavailable — ignore, feature degrades gracefully
    } finally {
      setHydrated(true);
    }
  }, []);

  const setPhotoFromFile = React.useCallback(async (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError("Image is too large — please choose one under 2MB.");
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setPhotoUrl(dataUrl);
    try {
      window.localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch {
      setError("Couldn't save the photo locally — it may be too large for this browser.");
    }
  }, []);

  const clearPhoto = React.useCallback(() => {
    setPhotoUrl(null);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo(
    () => ({ photoUrl, hydrated, error, setPhotoFromFile, clearPhoto }),
    [photoUrl, hydrated, error, setPhotoFromFile, clearPhoto]
  );

  return <ProfilePhotoContext.Provider value={value}>{children}</ProfilePhotoContext.Provider>;
}

export function useProfilePhoto() {
  const ctx = React.useContext(ProfilePhotoContext);
  if (!ctx) throw new Error("useProfilePhoto must be used within ProfilePhotoProvider");
  return ctx;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
