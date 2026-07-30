"use client";

import * as React from "react";
import type { CreateVaultInput, SavingsVault } from "@/types/vault";

const STORAGE_KEY = "onboardchain-vaults";

interface VaultStore {
  vaults: SavingsVault[];
  hydrated: boolean;
  createVault: (input: CreateVaultInput) => SavingsVault;
  removeVault: (id: string) => void;
}

const VaultContext = React.createContext<VaultStore | null>(null);

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [vaults, setVaults] = React.useState<SavingsVault[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setVaults(JSON.parse(stored));
    } catch {
      // localStorage unavailable — start empty, in-memory only
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = React.useCallback((next: SavingsVault[]) => {
    setVaults(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore write failures — state still updates in-memory
    }
  }, []);

  const createVault = React.useCallback(
    (input: CreateVaultInput): SavingsVault => {
      const vault: SavingsVault = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      persist([vault, ...vaults]);
      return vault;
    },
    [vaults, persist]
  );

  const removeVault = React.useCallback(
    (id: string) => {
      persist(vaults.filter((v) => v.id !== id));
    },
    [vaults, persist]
  );

  const value = React.useMemo(
    () => ({ vaults, hydrated, createVault, removeVault }),
    [vaults, hydrated, createVault, removeVault]
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVaultStore() {
  const ctx = React.useContext(VaultContext);
  if (!ctx) throw new Error("useVaultStore must be used within VaultProvider");
  return ctx;
}
