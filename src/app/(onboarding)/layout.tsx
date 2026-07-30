import { Logo } from "@/components/shared/logo";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-grid">
      <header className="flex h-16 items-center border-b px-6">
        <Logo />
      </header>
      {children}
    </div>
  );
}
