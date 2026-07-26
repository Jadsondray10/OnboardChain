import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-heading font-semibold", className)}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[linear-gradient(135deg,hsl(var(--arc-from)),hsl(var(--arc-via)),hsl(var(--arc-to)))] text-sm font-semibold text-white">
        O
      </span>
      <span className="text-base">OnboardChain</span>
    </Link>
  );
}
