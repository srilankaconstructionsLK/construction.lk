// src/lib/supabase/static.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Creates a static, anonymous Supabase client for Server Components.
 * This client does NOT use cookies or headers, meaning Next.js can fully
 * statically optimize or cache (ISR) any page or layout that uses it.
 * 
 * Suitable for public data fetching (e.g., categories, locations).
 */
export function createStaticClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
