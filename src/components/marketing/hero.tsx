"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArcPath } from "@/components/marketing/arc-path";
import { ROUTES } from "@/lib/constants";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-grid">
      <ArcPath className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_0%,hsl(var(--background))_75%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative flex flex-col items-center gap-7 py-32 text-center sm:py-40"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground backdrop-blur"
        >
          Built for the Arc ecosystem
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
        >
          Your AI-powered gateway from{" "}
          <span className="text-muted-foreground">Web2</span> to{" "}
          <span className="text-gradient-arc">Web3.</span>
        </motion.h1>

        <motion.p variants={item} className="max-w-xl text-balance text-lg text-muted-foreground">
          Create your wallet, build your Web3 identity, discover opportunities,
          and automate your financial future with programmable money.
        </motion.p>

        <motion.div variants={item} className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" variant="gradient" asChild>
            <Link href={ROUTES.signup}>
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border bg-transparent" asChild>
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
