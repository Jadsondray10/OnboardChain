"use client";

import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VaultProgressRing } from "@/components/vault/vault-progress-ring";
import { VaultProjectionChart } from "@/components/vault/vault-projection-chart";
import { getGoalPreset } from "@/features/vault/goal-presets";
import { projectVault, formatCurrency, formatMonthsAsDuration } from "@/features/vault/calculations";
import { useVaultStore } from "@/features/vault/use-vault-store";
import type { SavingsVault } from "@/types/vault";

export function VaultCard({ vault }: { vault: SavingsVault }) {
  const { removeVault } = useVaultStore();
  const preset = getGoalPreset(vault.goalType);
  const Icon = preset.icon;
  const projection = projectVault(vault);

  return (
    <Card className="glow-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary/60">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-heading font-semibold">{vault.goalLabel}</p>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(vault.monthlySavings)}/mo · {vault.savingsPercentage}% auto-routed
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Delete ${vault.goalLabel} vault`}
          onClick={() => removeVault(vault.id)}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <VaultProgressRing percent={projection.progressPercent} />
        <div className="grid flex-1 grid-cols-2 gap-3">
          <Stat label="Target" value={formatCurrency(vault.targetAmount)} />
          <Stat label="Time remaining" value={formatMonthsAsDuration(projection.monthsRemaining)} />
          <Stat
            label="Projected completion"
            value={projection.projectedCompletionDate.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          />
          <Stat label="Projected value" value={formatCurrency(projection.projectedValue)} />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Projected growth
          </p>
          <Badge variant="secondary" className="font-mono text-[10px]">
            {vault.lockDurationMonths}mo lock
          </Badge>
        </div>
        <VaultProjectionChart trajectory={projection.trajectory} />
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
