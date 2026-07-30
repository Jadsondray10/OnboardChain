export function PortfolioScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(hsl(var(--arc-from)) ${score * 3.6}deg, hsl(var(--secondary)) ${score * 3.6}deg)`,
        }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card font-heading text-lg font-semibold">
          {score}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Based on profile completeness, skills, and interests on file.
      </p>
    </div>
  );
}
