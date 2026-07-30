import { NotImplementedError } from "../errors";
import type { ArcServiceConfig } from "../config";
import type { CctpTransferState, InitiateCctpTransferInput } from "./types";

/**
 * Circle's Cross-Chain Transfer Protocol — native USDC burn-and-mint
 * transfers between chains (no wrapped-asset bridging risk). This is
 * how a user's existing USDC elsewhere becomes native USDC on Arc.
 */
export interface CctpService {
  /** Burns USDC on the source chain and starts the mint flow on Arc. */
  initiateTransfer(input: InitiateCctpTransferInput): Promise<CctpTransferState>;
  /** Polls burn → attestation → mint progress for a transfer. */
  getTransferStatus(transferId: string): Promise<CctpTransferState>;
  /** Fetches the Circle attestation once available, for manual minting. */
  getAttestation(sourceTxHash: string): Promise<string>;
}

export class CctpServiceImpl implements CctpService {
  constructor(private readonly config: ArcServiceConfig) {}

  async initiateTransfer(_input: InitiateCctpTransferInput): Promise<CctpTransferState> {
    throw new NotImplementedError("CctpService.initiateTransfer");
  }

  async getTransferStatus(_transferId: string): Promise<CctpTransferState> {
    throw new NotImplementedError("CctpService.getTransferStatus");
  }

  async getAttestation(_sourceTxHash: string): Promise<string> {
    throw new NotImplementedError("CctpService.getAttestation");
  }
}
