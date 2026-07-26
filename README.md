# OnboardChain

AI-powered onboarding platform helping Web2 users enter Web3 through the Arc ecosystem.

## Stack

- Next.js 15 (App Router) + TypeScript
- TailwindCSS + shadcn/ui
- Framer Motion, Lucide Icons

## Structure

```
src/
├── app/                    # Routes (App Router)
│   ├── (marketing)/        # Public landing site
│   ├── (auth)/             # Login / signup
│   └── (dashboard)/        # Authenticated app shell
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/              # Navbar, sidebar, headers, mobile nav
│   ├── shared/              # Cross-feature reusable components
│   └── providers/           # App-wide client providers
├── features/                # Domain modules (wallet, profile, opportunities, onboarding, ai-assistant)
├── lib/                     # Utilities, constants, fonts
├── hooks/                   # Shared hooks
├── types/                   # Shared TypeScript types
└── config/                  # Site metadata and nav config
```

## Conventions

- Route groups keep the marketing, auth, and dashboard shells isolated with their own layouts.
- `features/*` holds domain logic; keep it decoupled from `app/*`, which should stay thin (routing + composition only).
- All UI primitives live in `components/ui` (shadcn pattern) — never hand-roll one-off buttons/cards elsewhere.
- Path aliases (`@/components`, `@/lib`, `@/features`, etc.) are configured in `tsconfig.json`.

## Getting started

```bash
npm install
npm run dev
```

No features are implemented yet — this is the architecture and UI foundation only.
