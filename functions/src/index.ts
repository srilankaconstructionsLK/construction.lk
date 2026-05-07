import * as admin from "firebase-admin";
import { beforeUserCreated } from "firebase-functions/v2/identity";

admin.initializeApp();

/**
 * Sync Firebase Auth with Supabase Auth (RLS)
 * Adds the 'role: authenticated' custom claim to new users.
 * 
 * NOTE: We are using a 2nd Gen Blocking Function (beforeUserCreated) here.
 * This is BETTER than the background trigger because:
 * 1. It bypasses the "Missing Default Service Account" error in your GCP project.
 * 2. The custom claim is added BEFORE the user gets their first token.
 * 3. You don't need to refresh the token on the client side.
 */
export const syncUserToSupabase = beforeUserCreated({
  region: "us-east1",
}, (event) => {
  const user = event.data;
  if (!user) return;
  
  console.log(`Setting custom claims for user: ${user.uid}`);
  
  return {
    customClaims: {
      role: "authenticated", // Required by Supabase RLS policies
    },
  };
});
