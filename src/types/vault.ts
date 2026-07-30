export type VaultGoalType =
  | "bitcoin"
  | "emergency-fund"
  | "house"
  | "startup"
  | "travel"
  | "laptop"
  | "custom";

export interface SavingsVault {
  id: string;
  goalType: VaultGoalType;
  goalLabel: string;
  targetAmount: number;
  monthlySavings: number;
  lockDurationMonths: number;
  savingsPercentage: number;
  createdAt: string; // ISO date
}

export interface CreateVaultInput {
  goalType: VaultGoalType;
  goalLabel: string;
  targetAmount: number;
  monthlySavings: number;
  lockDurationMonths: number;
  savingsPercentage: number;
}
