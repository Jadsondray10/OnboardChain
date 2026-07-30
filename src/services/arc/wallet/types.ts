import type { Money, WalletAddress } from "../types";

export interface CreateWalletInput {
  /** Internal user identifier — never the wallet's private key material. */
  userId: string;
}

export interface ArcWalletAccount {
  address: WalletAddress;
  network: "arc-mainnet" | "arc-testnet";
  createdAt: string;
}

export interface SignMessageInput {
  address: WalletAddress;
  message: string;
}
