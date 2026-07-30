"use client";

import { Vault as VaultIcon } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { CreateVaultForm } from "@/components/vault/create-vault-form";
import { VaultCard } from "@/components/vault/vault-card";
import { Reveal } from "@/components/marketing/reveal";
import { useVaultStore } from "@/features/vault/use-vault-store";

export function VaultView() {
  const { vaults, hydrated } = useVaultStore();

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <CreateVaultForm />
      </div>

      {vaults.length === 0 ? (
        <EmptyState
          icon={VaultIcon}
          title="No vaults yet"
          description="Create a Smart Vault to start automating your savings toward a goal."
          action={<CreateVaultForm />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {vaults.map((vault, i) => (
            <Reveal key={vault.id} delay={i * 0.05}>
              <VaultCard vault={vault} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
