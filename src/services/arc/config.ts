/**
 * Centralized, typed access to Arc-related environment configuration.
 *
 * Nothing in this module is hardcoded — every value is sourced from the
 * environment so the same service code runs unmodified across local,
 * staging, and production, and against testnet or mainnet.
 *
 * Add the corresponding keys to `.env.local` (see `.env.example`).
 */

export type ArcNetwork = "arc-mainnet" | "arc-testnet";

export interface ArcServiceConfig {
  network: ArcNetwork;
  rpcUrl: string;
  chainId: number;
  usdcContractAddress: string;
  gatewayApiUrl: string;
  circlePaymasterApiKey: string;
  cctpApiUrl: string;
}

class MissingArcEnvError extends Error {
  constructor(key: string) {
    super(
      `Missing required environment variable "${key}". Arc services cannot be initialized without it — see .env.example.`
    );
    this.name = "MissingArcEnvError";
  }
}

function readEnv(key: string, { required = true }: { required?: boolean } = {}): string {
  const value = process.env[key];
  if (!value && required) throw new MissingArcEnvError(key);
  return value ?? "";
}

let cachedConfig: ArcServiceConfig | null = null;

/**
 * Reads and validates Arc service configuration from the environment.
 * Cached after the first successful read within a process.
 */
export function getArcConfig(): ArcServiceConfig {
  if (cachedConfig) return cachedConfig;

  const network = readEnv("NEXT_PUBLIC_ARC_NETWORK") as ArcNetwork;

  cachedConfig = {
    network,
    rpcUrl: readEnv("NEXT_PUBLIC_ARC_RPC_URL"),
    chainId: Number(readEnv("NEXT_PUBLIC_ARC_CHAIN_ID")),
    usdcContractAddress: readEnv("NEXT_PUBLIC_ARC_USDC_ADDRESS"),
    gatewayApiUrl: readEnv("ARC_GATEWAY_API_URL", { required: false }),
    circlePaymasterApiKey: readEnv("CIRCLE_PAYMASTER_API_KEY", { required: false }),
    cctpApiUrl: readEnv("CCTP_API_URL", { required: false }),
  };

  return cachedConfig;
}

/** Test/dev escape hatch — clears the cached config so it re-reads env. */
export function resetArcConfigCache(): void {
  cachedConfig = null;
}
