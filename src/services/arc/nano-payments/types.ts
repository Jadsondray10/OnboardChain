import type { Money, WalletAddress, TransactionHash } from "../types";

export interface SendNanoPaymentInput {
  from: WalletAddress;
  to: WalletAddress;
  amount: Money;
  /** Free-form reference, e.g. an invoice or content ID being paid for. */
  memo?: string;
}

export interface NanoPaymentReceipt {
  transactionHash: TransactionHash;
  settledAt: string; // ISO timestamp
}

export interface PaymentStreamInput {
  from: WalletAddress;
  to: WalletAddress;
  ratePerSecond: Money;
  durationSeconds: number;
}

export interface PaymentStreamHandle {
  streamId: string;
  status: "active" | "stopped" | "completed";
}
