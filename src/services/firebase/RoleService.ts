import { app, auth } from "@/lib/firebase/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

/**
 * Service to manage user roles via Firebase Cloud Functions.
 */
export class RoleService {
  /**
   * Sets a user's role.
   * Updates both Firebase Custom Claims and the Supabase profiles table.
   *
   * @param uid - The Firebase UID of the target user.
   * @param role - The role to assign (e.g., 'admin', 'editor', 'viewer').
   */
  static async setUserRole(uid: string, role: string) {
    const functions = getFunctions(app, "us-central1");
    const setUserRoleFn = httpsCallable<
      { uid: string; role: string },
      { success: boolean }
    >(functions, "setUserRole");

    try {
      const result = await setUserRoleFn({ uid, role });

      // If the updated user is the currently logged-in user, force refresh their token
      // to ensure the new custom claim is active immediately.
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.uid === uid) {
        await currentUser.getIdToken(true);
        console.log(
          "Custom claims updated and token refreshed for current user.",
        );
      }

      return result.data;
    } catch (error) {
      console.error("Error setting user role:", error);
      throw error;
    }
  }
}
