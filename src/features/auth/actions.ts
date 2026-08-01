"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "./get-site-url";
import { ROUTES } from "@/lib/constants";
import { initialAuthActionState, type AuthActionState } from "./types";

export async function signUp(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ...initialAuthActionState, error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { ...initialAuthActionState, error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const siteUrl = await getSiteUrl();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${siteUrl}/auth/callback` },
  });

  if (error) {
    return { ...initialAuthActionState, error: error.message };
  }

  // If email confirmation is off in the Supabase project, signUp already
  // returns a live session — skip straight in. Otherwise a confirmation
  // email was just sent and there's no session yet.
  if (data.session) {
    redirect(ROUTES.onboarding);
  }

  return {
    ...initialAuthActionState,
    info: "Check your email to confirm your account before logging in.",
  };
}

export async function signIn(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "") || ROUTES.dashboard;

  if (!email || !password) {
    return { ...initialAuthActionState, error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ...initialAuthActionState, error: error.message };
  }

  redirect(next);
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(ROUTES.home);
}
