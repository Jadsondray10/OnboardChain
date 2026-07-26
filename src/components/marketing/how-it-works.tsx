import { MessageSquareText, Wallet, Sparkles, PiggyBank, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: MessageSquareText,
    title: "Talk with AI",
    description: "Tell the AI what you're trying to do. It figures out the path so you don't have to.",
  },
  {
    icon: Wallet,
    title: "Create Wallet",
    description: "Your Arc wallet is generated in the background — no extensions, no seed phrase to write down.",
  },
  {
    icon: Sparkles,
    title: "Generate Profile",
    description: "Your skills and work become a Web3 profile the AI keeps up to date for you.",
  },
  {
    icon: PiggyBank,
    title: "Start Saving",
    description: "Turn on a Smart Vault and set the rules — the rest runs automatically.",
  },
  {
    icon: Compass,
    title: "Discover Opportunities",
    description: "Gigs, grants, and collabs on Arc start showing up, matched to your profile.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b py-24 sm:py-32">
      <div className="container">
        <Reveal className="mb-16 max-w-lg">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Five steps. No detours.
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-2xl">
          <div
            aria-hidden
            className="absolute bottom-6 left-6 top-6 w-px bg-[linear-gradient(180deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))] opacity-40 sm:left-7"
          />

          <ol className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="relative flex gap-5 sm:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-card sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="pt-1.5">
                      <span className="font-mono text-xs text-muted-foreground">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
