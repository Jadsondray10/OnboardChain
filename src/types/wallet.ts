export type WalletStatus = "not_created" | "creating" | "active" | "error";

export interface Wallet {
  id: string;
  address: string;
  status: WalletStatus;
  network: "arc-mainnet" | "arc-testnet";
  balance?: string;
}
