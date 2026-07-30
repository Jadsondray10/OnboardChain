import type { Money, WalletAddress, TransactionHash, TransactionStatus } from "../types";

export interface GatewayRoute {
  fromChain: string;
  toChain: "arc-mainnet" | "arc-testnet";
  asset: Money["currency"];
  estimatedFee: Money;
  estimatedSeconds: number;
}

export interface BridgeAssetsInput {
  fromChain: string;
  toAddress: WalletAddress;
  amount: Money;
}

export interface BridgeAssetsResult {
  transactionHash: TransactionHash;
  status: TransactionStatus;
}
