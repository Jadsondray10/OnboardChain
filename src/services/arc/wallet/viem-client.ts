import { createPublicClient, http, type Chain } from "viem";
import type { ArcServiceConfig } from "../config";

/**
 * Minimal ERC-20 read ABI — just what balance reads need. Kept local to
 * the wallet module rather than pulled from a full ABI package, since
 * that's all this module touches on-chain today.
 */
export const erc20ReadAbi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

/**
 * Builds an Arc chain descriptor from config rather than importing a
 * hardcoded chain object — keeps this correct whether `config` points
 * at Arc mainnet or testnet, and whether the RPC endpoint changes.
 */
export function getArcChain(config: ArcServiceConfig): Chain {
  return {
    id: config.chainId,
    name: config.network,
    nativeCurrency: { name: "Arc", symbol: "ARC", decimals: 18 },
    rpcUrls: { default: { http: [config.rpcUrl] } },
  };
}

export function getArcPublicClient(config: ArcServiceConfig) {
  return createPublicClient({
    chain: getArcChain(config),
    transport: http(config.rpcUrl),
  });
}
