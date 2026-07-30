import {
  Rocket,
  Blocks,
  Bitcoin,
  DollarSign,
  Wallet,
  Key,
  FileCode2,
  Landmark,
  Users,
  Image as ImageIcon,
  Layers,
  Zap,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  { id: "intro-to-web3", title: "Introduction to Web3", icon: Rocket, level: "beginner", estimatedMinutes: 5 },
  { id: "blockchain-basics", title: "Blockchain Basics", icon: Blocks, level: "beginner", estimatedMinutes: 8 },
  { id: "bitcoin", title: "Bitcoin", icon: Bitcoin, level: "beginner", estimatedMinutes: 10 },
  { id: "stablecoins", title: "Stablecoins", icon: DollarSign, level: "beginner", estimatedMinutes: 6 },
  { id: "wallets", title: "Wallets", icon: Wallet, level: "beginner", estimatedMinutes: 5 },
  { id: "keys", title: "Public & Private Keys", icon: Key, level: "intermediate", estimatedMinutes: 7 },
  { id: "smart-contracts", title: "Smart Contracts", icon: FileCode2, level: "intermediate", estimatedMinutes: 10 },
  { id: "defi", title: "DeFi", icon: Landmark, level: "intermediate", estimatedMinutes: 12 },
  { id: "daos", title: "DAOs", icon: Users, level: "intermediate", estimatedMinutes: 8 },
  { id: "nfts", title: "NFTs", icon: ImageIcon, level: "beginner", estimatedMinutes: 6 },
  { id: "l1-vs-l2", title: "Layer 1 vs Layer 2", icon: Layers, level: "advanced", estimatedMinutes: 9 },
  { id: "why-arc", title: "Why Arc?", icon: Zap, level: "beginner", estimatedMinutes: 4 },
  { id: "programmable-money", title: "Programmable Money", icon: Sparkles, level: "intermediate", estimatedMinutes: 7 },
  { id: "usdc-and-circle", title: "USDC & Circle", icon: CircleDollarSign, level: "beginner", estimatedMinutes: 5 },
];
