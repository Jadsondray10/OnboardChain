import type { SavingsVault } from "@/types/vault";

export interface VaultProjection {
  /** Months elapsed since the vault was created, based on the current date. */
  monthsElapsed: number;
  /** Naive current balance: monthly savings × months elapsed, capped at target. */
  currentBalance: number;
  /** 0–100 progress toward the target amount. */
  progressPercent: number;
  /** Months remaining until the lock period ends. */
  monthsRemaining: number;
  /** Calendar date the lock period completes. */
  projectedCompletionDate: Date;
  /** Total balance projected by the end of the lock duration. */
  projectedValue: number;
  /** Month-by-month projected balance for charting, index 0 = creation. */
  trajectory: { month: number; balance: number }[];
}

/**
 * Pure projection math for a vault. No side effects, no I/O — safe to
 * call on every render and easy to unit test in isolation.
 */
export function projectVault(vault: SavingsVault, now: Date = new Date()): VaultProjection {
  const created = new Date(vault.createdAt);
  const msElapsed = Math.max(0, now.getTime() - created.getTime());
  const monthsElapsed = Math.min(
    vault.lockDurationMonths,
    Math.floor(msElapsed / (1000 * 60 * 60 * 24 * 30.44))
  );

  const currentBalance = Math.min(vault.targetAmount, monthsElapsed * vault.monthlySavings);
  const progressPercent = vault.targetAmount > 0 ? Math.round((currentBalance / vault.targetAmount) * 100) : 0;

  const monthsRemaining = Math.max(0, vault.lockDurationMonths - monthsElapsed);
  const projectedCompletionDate = addMonths(created, vault.lockDurationMonths);
  const projectedValue = vault.monthlySavings * vault.lockDurationMonths;

  const trajectory = Array.from({ length: vault.lockDurationMonths + 1 }, (_, month) => ({
    month,
    balance: Math.min(projectedValue, month * vault.monthlySavings),
  }));

  return {
    monthsElapsed,
    currentBalance,
    progressPercent,
    monthsRemaining,
    projectedCompletionDate,
    projectedValue,
    trajectory,
  };
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function formatMonthsAsDuration(months: number): string {
  if (months <= 0) return "Complete";
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest === 0 ? `${years} yr` : `${years} yr ${rest} mo`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
