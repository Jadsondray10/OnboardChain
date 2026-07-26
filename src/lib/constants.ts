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
  dashboard: "/dashboard",
  profile: "/profile",
  wallet: "/wallet",
  opportunities: "/opportunities",
  settings: "/settings",
} as const;
