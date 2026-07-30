import type { Money, WalletAddress, TransactionHash } from "../types";

export type CctpChain = "ethereum" | "base" | "avalanche" | "arc-mainnet" | "arc-testnet";

export interface InitiateCctpTransferInput {
  sourceChain: CctpChain;
  destinationChain: CctpChain;
  destinationAddress: WalletAddress;
  amount: Money;
}

export type CctpTransferStage = "burned" | "attested" | "minted";

export interface CctpTransferState {
  id: string;
  stage: CctpTransferStage;
  sourceTxHash: TransactionHash;
  destinationTxHash?: TransactionHash;
}
