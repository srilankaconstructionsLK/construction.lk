import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";

/**
 * Calls the setUserRole Firebase Cloud Function.
 * This function updates the user's custom claims and their role in Supabase.
 */
export async function setUserRole(uid: string, role: string) {
  const functions = getFunctions(app, "us-central1");
  const fn = httpsCallable(functions, "setUserRole");
  return fn({ uid, role });
}
