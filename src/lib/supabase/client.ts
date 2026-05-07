import { createBrowserClient } from '@supabase/ssr';
import { auth } from '@/lib/firebase';

/**
 * Creates a Supabase client that automatically uses the Firebase ID Token for authentication.
 * This bridges Firebase Auth with Supabase RLS.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (...args) => fetch(...args),
      },
      accessToken: async () => {
        // Automatically fetch the latest Firebase ID token for every Supabase request
        if (auth.currentUser) {
          try {
            return await auth.currentUser.getIdToken();
          } catch (error) {
            console.error("Error getting Firebase ID token for Supabase:", error);
            return null;
          }
        }
        return null;
      },
    }
  );
}

// Default singleton instance
export const supabase = createClient();
