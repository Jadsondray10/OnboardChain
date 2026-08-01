import { headers } from "next/headers";

/**
 * Resolves the current deployment's origin from request headers rather
 * than a hardcoded env var — this way email confirmation links work
 * correctly on localhost, every Vercel preview URL, and production
 * without per-environment configuration.
 */
export async function getSiteUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "https";
  return `${protocol}://${host}`;
}
