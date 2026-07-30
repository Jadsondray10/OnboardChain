import { NotImplementedError } from "../errors";
import type { ArcServiceConfig } from "../config";
import type {
  NanoPaymentReceipt,
  PaymentStreamHandle,
  PaymentStreamInput,
  SendNanoPaymentInput,
} from "./types";

/**
 * Programmable micro-payments — the primitive behind "opportunity" gigs
 * getting paid instantly, and behind Smart Vault auto-routing a
 * percentage of each incoming payment. Supports both one-off nano
 * payments and continuous streaming payments.
 */
export interface NanoPaymentsService {
  /** Sends a single, typically sub-dollar, payment. */
  sendNanoPayment(input: SendNanoPaymentInput): Promise<NanoPaymentReceipt>;
  /** Starts a continuous per-second payment stream. */
  startStream(input: PaymentStreamInput): Promise<PaymentStreamHandle>;
  /** Stops an active payment stream early. */
  stopStream(streamId: string): Promise<PaymentStreamHandle>;
}

export class NanoPaymentsServiceImpl implements NanoPaymentsService {
  constructor(private readonly config: ArcServiceConfig) {}

  async sendNanoPayment(_input: SendNanoPaymentInput): Promise<NanoPaymentReceipt> {
    throw new NotImplementedError("NanoPaymentsService.sendNanoPayment");
  }

  async startStream(_input: PaymentStreamInput): Promise<PaymentStreamHandle> {
    throw new NotImplementedError("NanoPaymentsService.startStream");
  }

  async stopStream(_streamId: string): Promise<PaymentStreamHandle> {
    throw new NotImplementedError("NanoPaymentsService.stopStream");
  }
}
