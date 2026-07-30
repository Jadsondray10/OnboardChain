import { NotImplementedError } from "../errors";
import type { ArcServiceConfig } from "../config";
import type { BridgeAssetsInput, BridgeAssetsResult, GatewayRoute } from "./types";

/**
 * Arc Gateway — the entry point for moving assets from other chains
 * onto Arc. This interface is what the rest of the app depends on;
 * `ArcGatewayServiceImpl` below is a stub today and becomes a thin
 * wrapper around the real Arc Gateway SDK later without callers changing.
 */
export interface ArcGatewayService {
  /** Lists the chains/assets that can currently bridge into Arc. */
  getSupportedRoutes(): Promise<GatewayRoute[]>;
  /** Initiates a bridge of `amount` from `fromChain` into an Arc wallet. */
  bridgeAssets(input: BridgeAssetsInput): Promise<BridgeAssetsResult>;
  /** Polls the status of a previously-initiated bridge transaction. */
  getBridgeStatus(transactionHash: string): Promise<BridgeAssetsResult>;
}

export class ArcGatewayServiceImpl implements ArcGatewayService {
  constructor(private readonly config: ArcServiceConfig) {}

  async getSupportedRoutes(): Promise<GatewayRoute[]> {
    throw new NotImplementedError("ArcGatewayService.getSupportedRoutes");
  }

  async bridgeAssets(_input: BridgeAssetsInput): Promise<BridgeAssetsResult> {
    throw new NotImplementedError("ArcGatewayService.bridgeAssets");
  }

  async getBridgeStatus(_transactionHash: string): Promise<BridgeAssetsResult> {
    throw new NotImplementedError("ArcGatewayService.getBridgeStatus");
  }
}
