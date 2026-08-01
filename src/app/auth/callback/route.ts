import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/constants";

/**
 * Where Supabase redirects the user after they click the confirmation
 * link in the sign-up email. Exchanges the one-time code for a real
 * session, then sends them into onboarding.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${ROUTES.onboarding}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=confirmation_failed`);
}
