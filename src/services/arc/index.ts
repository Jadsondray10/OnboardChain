import { getArcConfig, type ArcServiceConfig } from "./config";
import { ArcGatewayServiceImpl, type ArcGatewayService } from "./gateway/arc-gateway.service";
import {
  CirclePaymasterServiceImpl,
  type CirclePaymasterService,
} from "./paymaster/circle-paymaster.service";
import { CctpServiceImpl, type CctpService } from "./cctp/cctp.service";
import {
  NanoPaymentsServiceImpl,
  type NanoPaymentsService,
} from "./nano-payments/nano-payments.service";
import { ArcWalletServiceImpl, type ArcWalletService } from "./wallet/arc-wallet.service";
import {
  SmartContractServiceImpl,
  type SmartContractService,
} from "./smart-contracts/contract.service";

export interface ArcServices {
  gateway: ArcGatewayService;
  paymaster: CirclePaymasterService;
  cctp: CctpService;
  nanoPayments: NanoPaymentsService;
  wallet: ArcWalletService;
  contracts: SmartContractService;
}

/**
 * Builds every Arc service module from a single config object.
 *
 * This is the one place that wires concrete implementations to their
 * interfaces — swapping a stub for a real SDK-backed class later means
 * changing one line here, not touching any calling code. Accepting
 * config as a parameter (rather than importing `getArcConfig()`
 * internally) keeps this pure and easy to unit test with fake config.
 */
export function createArcServices(config: ArcServiceConfig): ArcServices {
  return {
    gateway: new ArcGatewayServiceImpl(config),
    paymaster: new CirclePaymasterServiceImpl(config),
    cctp: new CctpServiceImpl(config),
    nanoPayments: new NanoPaymentsServiceImpl(config),
    wallet: new ArcWalletServiceImpl(config),
    contracts: new SmartContractServiceImpl(config),
  };
}

/** Convenience singleton for server-side call sites that just need the default env config. */
let defaultServices: ArcServices | null = null;

export function getArcServices(): ArcServices {
  if (!defaultServices) defaultServices = createArcServices(getArcConfig());
  return defaultServices;
}

export type { ArcServiceConfig, ArcNetwork } from "./config";
export * from "./types";
export * from "./errors";
export type { ArcGatewayService } from "./gateway/arc-gateway.service";
export type { CirclePaymasterService } from "./paymaster/circle-paymaster.service";
export type { CctpService } from "./cctp/cctp.service";
export type { NanoPaymentsService } from "./nano-payments/nano-payments.service";
export type { ArcWalletService } from "./wallet/arc-wallet.service";
export type { SmartContractService } from "./smart-contracts/contract.service";
