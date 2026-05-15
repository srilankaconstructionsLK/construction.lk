import { auth } from "@/lib/firebase/firebase";
import type { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client that automatically bridges Firebase Auth with Supabase RLS.
 * The accessToken callback is called automatically before every Supabase request.
 * Firebase caches the token for 1 hour — no unnecessary network requests.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      accessToken: async () => {
        try {
          if (!auth.currentUser) return null;
          // false = use cached token (faster), auto-refreshes only when expired
          return await auth.currentUser.getIdToken(false);
        } catch (error) {
          console.error("[Supabase] Failed to get Firebase ID token:", error);
          return null;
        }
      },
    },
  );
}

/**
 * Singleton Supabase client for use across the app.
 * Always use this — never create a new client in components or services.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase/client';
 *   const { data } = await supabase.from('profiles').select('*');
 */
export const supabase = createClient();
