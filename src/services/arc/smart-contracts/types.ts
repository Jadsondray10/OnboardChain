import type { WalletAddress, TransactionHash } from "../types";

/** Minimal ABI fragment shape — intentionally permissive until a real ABI type lib is wired in. */
export type AbiFragment = Record<string, unknown>;

export interface ContractReadInput<TArgs extends unknown[] = unknown[]> {
  address: WalletAddress;
  abi: AbiFragment[];
  functionName: string;
  args?: TArgs;
}

export interface ContractWriteInput<TArgs extends unknown[] = unknown[]> {
  address: WalletAddress;
  abi: AbiFragment[];
  functionName: string;
  args?: TArgs;
}

export interface DeployContractInput {
  abi: AbiFragment[];
  bytecode: string;
  constructorArgs?: unknown[];
}

export interface DeployContractResult {
  address: WalletAddress;
  transactionHash: TransactionHash;
}
