import { z } from "@builder.io/qwik-city";
import { serverSupabase$ } from "~/lib/qwik-supabase";
import { paths } from "~/utils/paths";
export const {
  getSupabaseInstance,
  getSupabaseSession,
  onRequest,
  useSupabaseSignInWithOAuth,
  useSupabaseSignInWithOtp,
  useSupabaseSignInWithPassword,
  useSupabaseSignOut,
  useSupabaseSignUp,
} = serverSupabase$(async (event) => {

  const requestUrl = new URL(event.request.url);
  const parsed = await z
    .object({ supabaseKey: z.string(), supabaseUrl: z.string() })
    .parseAsync({
      supabaseKey: event.env.get("PUBLIC_SUPABASE_ANON_KEY"),
      supabaseUrl: event.env.get("PUBLIC_SUPABASE_URL"),
    });

  return {
    emailRedirectTo: `${requestUrl.protocol}//${requestUrl.host}/auth/callback`,
    signInPath: paths.login,
    signInRedirectTo: paths.dashboard,
    supabaseKey: parsed.supabaseKey,
    supabaseUrl: parsed.supabaseUrl,
  };
});
