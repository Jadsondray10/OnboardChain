/**
 * Primitive types shared across every Arc service module.
 */

/** A chain-agnostic monetary amount. Always paired with a currency code. */
export interface Money {
  amount: string; // string to avoid float precision issues with on-chain values
  currency: "USDC" | "ETH" | "ARC";
}

export type WalletAddress = `0x${string}`;
export type TransactionHash = `0x${string}`;

export type TransactionStatus = "pending" | "confirmed" | "failed";

export interface ServiceResult<T> {
  data: T;
  network: string;
}
