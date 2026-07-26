import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/lib/constants";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "AI Onboarding", href: "#product" },
      { label: "Arc Wallet", href: "#product" },
      { label: "AI Portfolio", href: "#product" },
      { label: "Smart Vault", href: "#product" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Twitter", href: siteConfig.links.twitter },
      { label: "GitHub", href: siteConfig.links.github },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container border-b border-border/60 py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-lg font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to make the jump?
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Your Arc wallet is a couple of minutes away.
          </p>
          <Button size="lg" variant="gradient" asChild>
            <Link href={ROUTES.signup}>
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Logo />
          <p className="mt-3 max-w-[22ch] text-sm text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {col.heading}
            </p>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted-foreground">Built on Arc</p>
      </div>
    </footer>
  );
}
