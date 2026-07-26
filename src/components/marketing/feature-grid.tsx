"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { MessageSquareText, Wallet, TrendingUp, ShieldCheck, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/marketing/reveal";

interface Feature {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  span: string;
  accent?: boolean;
}

const features: Feature[] = [
  {
    icon: MessageSquareText,
    label: "AI Onboarding",
    title: "A guide that talks you through it",
    description:
      "Skip the documentation. Tell the AI what you're trying to do, and it walks you through wallets, gas, and signatures in plain language — no jargon.",
    span: "sm:col-span-3 sm:row-span-2",
    accent: true,
  },
  {
    icon: Wallet,
    label: "Arc Wallet",
    title: "A wallet in seconds",
    description: "Self-custody on Arc, created without a browser extension or a seed phrase to lose.",
    span: "sm:col-span-3 sm:row-span-1",
  },
  {
    icon: TrendingUp,
    label: "AI Portfolio",
    title: "A profile that builds itself",
    description: "Your skills and on-chain activity become a living Web3 identity that updates as you work.",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    icon: ShieldCheck,
    label: "Smart Vault",
    title: "Savings on autopilot",
    description: "Programmable rules route your funds toward the goals you set, automatically.",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    icon: Compass,
    label: "Opportunity Feed",
    title: "Work that finds you",
    description: "Gigs, grants, and collabs on Arc, matched to your profile as it grows.",
    span: "sm:col-span-2 sm:row-span-1",
  },
];

export function FeatureGrid() {
  return (
    <section id="product" className="border-b py-24 sm:py-32">
      <div className="container">
        <Reveal className="mb-14 max-w-lg">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            The platform
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need, none of the friction
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:grid-rows-2">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06} className={feature.span}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 glow-card",
        feature.accent && "sm:p-8"
      )}
    >
      {feature.accent && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,hsl(var(--arc-from)/0.25),transparent_70%)] transition-opacity duration-300 group-hover:opacity-80" />
      )}

      <div className="relative">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary/60">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {feature.label}
        </p>
        <h3 className={cn("mt-2 font-heading font-semibold tracking-tight", feature.accent ? "text-2xl" : "text-lg")}>
          {feature.title}
        </h3>
        <p className={cn("mt-2 text-sm text-muted-foreground", feature.accent && "max-w-md text-base")}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
