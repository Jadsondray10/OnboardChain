import type { LucideIcon } from "lucide-react";
import { Bitcoin, LifeBuoy, Home, Rocket, Plane, Laptop, Sparkles } from "lucide-react";
import type { VaultGoalType } from "@/types/vault";

export interface VaultGoalPreset {
  type: VaultGoalType;
  label: string;
  icon: LucideIcon;
  /** Sensible default so the form isn't empty when a preset is picked. */
  suggestedTarget: number;
}

export const vaultGoalPresets: VaultGoalPreset[] = [
  { type: "bitcoin", label: "Bitcoin", icon: Bitcoin, suggestedTarget: 5000 },
  { type: "emergency-fund", label: "Emergency Fund", icon: LifeBuoy, suggestedTarget: 3000 },
  { type: "house", label: "House", icon: Home, suggestedTarget: 40000 },
  { type: "startup", label: "Startup", icon: Rocket, suggestedTarget: 15000 },
  { type: "travel", label: "Travel", icon: Plane, suggestedTarget: 2500 },
  { type: "laptop", label: "Laptop", icon: Laptop, suggestedTarget: 1800 },
  { type: "custom", label: "Custom Goal", icon: Sparkles, suggestedTarget: 1000 },
];

export function getGoalPreset(type: VaultGoalType): VaultGoalPreset {
  return vaultGoalPresets.find((g) => g.type === type) ?? vaultGoalPresets[vaultGoalPresets.length - 1];
}
