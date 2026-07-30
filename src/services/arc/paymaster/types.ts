import type { Money, WalletAddress } from "../types";

export interface SponsorUserOperationInput {
  sender: WalletAddress;
  /** ABI-encoded call data for the user operation being sponsored. */
  callData: string;
}

export interface SponsorUserOperationResult {
  sponsored: boolean;
  sponsoredFee: Money;
  /** Signed paymaster data to attach to the user operation. */
  paymasterAndData: string;
}

export interface PaymasterPolicy {
  maxSponsoredFeePerTx: Money;
  dailySponsorshipCap: Money;
}
