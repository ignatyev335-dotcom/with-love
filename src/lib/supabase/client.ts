/**
 * Supabase browser client stub.
 * When env vars are set, replace with:
 *   import { createBrowserClient } from "@supabase/ssr"
 *   return createBrowserClient(url, anonKey)
 */

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  // Lazy real client when package is installed:
  // return createBrowserClient(url, key);
  return { url, key, configured: true as const };
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
