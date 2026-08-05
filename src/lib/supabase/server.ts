import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for use in Server Components, Server Actions, and
 * Route Handlers. Reads/writes the session via Next.js's cookie store.
 *
 * Server Components can't write cookies (Next.js restriction), so the
 * `setAll` write is wrapped in try/catch — safe to ignore there as long
 * as middleware.ts is refreshing the session on every request.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- cookie option shapes vary across next/@supabase/ssr versions
              cookieStore.set(name, value, options as any)
            );
          } catch {
            // Called from a Server Component — middleware.ts handles
            // the actual refresh, so this is safe to ignore here.
          }
        },
      },
    }
  );
}
