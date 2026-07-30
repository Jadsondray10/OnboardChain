import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { formatUnits } from "viem";
import { createViemAdapterFromPrivateKey } from "@circle-fin/adapter-viem-v2";
import { NotImplementedError } from "../errors";
import type { ArcServiceConfig } from "../config";
import type { ArcWalletAccount, CreateWalletInput, SignMessageInput } from "./types";
import type { Money } from "../types";
import { erc20ReadAbi, getArcPublicClient } from "./viem-client";

/**
 * Wallet lifecycle — creation, balance reads, and message signing.
 *
 * Custody model, explicitly: `createWallet` generates a local key via
 * viem and wraps it in a Circle App Kit adapter. That's the right call
 * for local development and testnet flows (it mirrors Arc's own
 * quickstart examples), but it is NOT production-grade custody — the
 * private key only exists in this function's memory and is returned to
 * the caller, who becomes responsible for it. A production deployment
 * should replace this implementation with Circle's Developer-Controlled
 * Wallets (or another KMS-backed signer) behind this same interface;
 * nothing outside this file would need to change.
 */
export interface ArcWalletService {
  createWallet(input: CreateWalletInput): Promise<ArcWalletAccount>;
  getBalance(address: string): Promise<Money>;
  signMessage(input: SignMessageInput): Promise<string>;
}

export class ArcWalletServiceImpl implements ArcWalletService {
  constructor(private readonly config: ArcServiceConfig) {}

  async createWallet(input: CreateWalletInput): Promise<ArcWalletAccount> {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    // Constructing the adapter here validates that the generated key is
    // usable with App Kit's bridge/swap/send calls — it isn't retained
    // by this method (see custody note above).
    createViemAdapterFromPrivateKey({ privateKey });

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[ArcWalletService] Generated a dev/testnet wallet for user "${input.userId}". ` +
          "This private key is NOT persisted by this service — the caller must " +
          "handle secure storage, or this wallet is unrecoverable after this call returns."
      );
    }

    return {
      address: account.address,
      network: this.config.network,
      createdAt: new Date().toISOString(),
    };
  }

  async getBalance(address: string): Promise<Money> {
    const client = getArcPublicClient(this.config);

    const [balance, decimals] = await Promise.all([
      client.readContract({
        address: this.config.usdcContractAddress as `0x${string}`,
        abi: erc20ReadAbi,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      }),
      client.readContract({
        address: this.config.usdcContractAddress as `0x${string}`,
        abi: erc20ReadAbi,
        functionName: "decimals",
      }),
    ]);

    return {
      amount: formatUnits(balance, decimals),
      currency: "USDC",
    };
  }

  async signMessage(_input: SignMessageInput): Promise<string> {
    // Deliberately not implemented: real message signing needs either a
    // browser wallet (the user signs client-side, this service never
    // sees the key) or a managed custody provider exposing a signing
    // API. Neither exists in this stack yet — see the class doc above.
    throw new NotImplementedError("ArcWalletService.signMessage");
  }
}
