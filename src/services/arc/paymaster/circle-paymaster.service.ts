import { NotImplementedError } from "../errors";
import type { ArcServiceConfig } from "../config";
import type {
  PaymasterPolicy,
  SponsorUserOperationInput,
  SponsorUserOperationResult,
} from "./types";

/**
 * Circle Paymaster — sponsors gas so users can transact without holding
 * ETH/ARC for fees. Central to the "no seed-phrase anxiety" onboarding
 * promise: a brand-new wallet can still transact on day one.
 */
export interface CirclePaymasterService {
  /** Wraps a user operation with paymaster sponsorship, if eligible. */
  sponsorUserOperation(input: SponsorUserOperationInput): Promise<SponsorUserOperationResult>;
  /** Returns the current sponsorship limits in effect. */
  getSponsorshipPolicy(): Promise<PaymasterPolicy>;
}

export class CirclePaymasterServiceImpl implements CirclePaymasterService {
  constructor(private readonly config: ArcServiceConfig) {}

  async sponsorUserOperation(
    _input: SponsorUserOperationInput
  ): Promise<SponsorUserOperationResult> {
    throw new NotImplementedError("CirclePaymasterService.sponsorUserOperation");
  }

  async getSponsorshipPolicy(): Promise<PaymasterPolicy> {
    throw new NotImplementedError("CirclePaymasterService.getSponsorshipPolicy");
  }
}
