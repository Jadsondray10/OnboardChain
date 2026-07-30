"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { vaultGoalPresets, getGoalPreset } from "@/features/vault/goal-presets";
import { useVaultStore } from "@/features/vault/use-vault-store";
import type { VaultGoalType } from "@/types/vault";

const LOCK_DURATIONS = [3, 6, 12, 24, 36];

export function CreateVaultForm() {
  const { createVault } = useVaultStore();
  const [open, setOpen] = React.useState(false);

  const [goalType, setGoalType] = React.useState<VaultGoalType>("bitcoin");
  const [targetAmount, setTargetAmount] = React.useState(String(getGoalPreset("bitcoin").suggestedTarget));
  const [monthlySavings, setMonthlySavings] = React.useState("200");
  const [lockDurationMonths, setLockDurationMonths] = React.useState(12);
  const [savingsPercentage, setSavingsPercentage] = React.useState([10]);

  function handleGoalChange(value: VaultGoalType) {
    setGoalType(value);
    setTargetAmount(String(getGoalPreset(value).suggestedTarget));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const target = Number(targetAmount);
    const monthly = Number(monthlySavings);
    if (!target || !monthly || target <= 0 || monthly <= 0) return;

    createVault({
      goalType,
      goalLabel: getGoalPreset(goalType).label,
      targetAmount: target,
      monthlySavings: monthly,
      lockDurationMonths,
      savingsPercentage: savingsPercentage[0],
    });

    setOpen(false);
    setTargetAmount(String(getGoalPreset("bitcoin").suggestedTarget));
    setMonthlySavings("200");
    setLockDurationMonths(12);
    setSavingsPercentage([10]);
    setGoalType("bitcoin");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient">
          <Plus className="h-4 w-4" />
          New Vault
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Smart Vault</DialogTitle>
          <DialogDescription>
            Set a goal and OnboardChain will project your path to it.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={goalType} onValueChange={(v) => handleGoalChange(v as VaultGoalType)}>
              <SelectTrigger id="goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vaultGoalPresets.map((preset) => (
                  <SelectItem key={preset.type} value={preset.type}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">Target amount ($)</Label>
              <Input
                id="target"
                type="number"
                min={1}
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly savings ($)</Label>
              <Input
                id="monthly"
                type="number"
                min={1}
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lock">Lock duration</Label>
            <Select
              value={String(lockDurationMonths)}
              onValueChange={(v) => setLockDurationMonths(Number(v))}
            >
              <SelectTrigger id="lock">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCK_DURATIONS.map((months) => (
                  <SelectItem key={months} value={String(months)}>
                    {months < 12 ? `${months} months` : `${months / 12} year${months > 12 ? "s" : ""}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="percentage">Savings percentage</Label>
              <span className="font-mono text-xs text-muted-foreground">{savingsPercentage[0]}%</span>
            </div>
            <Slider
              id="percentage"
              value={savingsPercentage}
              onValueChange={setSavingsPercentage}
              min={1}
              max={50}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Share of incoming payments automatically routed to this vault.
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" variant="gradient" className="w-full">
              Create Vault
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
