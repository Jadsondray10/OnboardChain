import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Placeholder middleware. Wire up auth/session checks here once
 * the auth provider is implemented — e.g. redirecting unauthenticated
 * users away from the (dashboard) route group.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/wallet/:path*", "/opportunities/:path*", "/settings/:path*"],
};
