/**
 * Global app-wide constants.
 * Keep environment-specific values in config/, not here.
 */
export const APP_NAME = "OnboardChain";
export const APP_DESCRIPTION =
  "The AI-powered onboarding platform for the Arc ecosystem.";

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  onboarding: "/onboarding",
  identity: "/identity",
  academy: "/academy",
  dashboard: "/dashboard",
  profile: "/profile",
  roadmap: "/roadmap",
  vault: "/vault",
  payments: "/payments",
  settings: "/settings",
} as const;
