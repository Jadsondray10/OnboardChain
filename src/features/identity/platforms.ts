import type { PlatformKey } from "./types";

export interface PlatformMeta {
  key: PlatformKey;
  name: string;
  description: string;
  connectLabel: string;
}

export const platforms: PlatformMeta[] = [
  {
    key: "x",
    name: "X (Twitter)",
    description: "Build your public Web3 identity and connect with the crypto community.",
    connectLabel: "Connect X",
  },
  {
    key: "discord",
    name: "Discord",
    description: "Join communities, hackathons and developer servers.",
    connectLabel: "Connect Discord",
  },
  {
    key: "github",
    name: "GitHub",
    description: "Recommended for developers.",
    connectLabel: "Connect GitHub",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    description: "Recommended for professionals and job seekers.",
    connectLabel: "Connect LinkedIn",
  },
];
