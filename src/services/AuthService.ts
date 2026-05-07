import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { createClient } from '@/lib/supabase/client';

export class AuthService {
  /**
   * Initialize a listener for auth changes
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Get current Firebase user
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Sign in with Firebase
   */
  static async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(this.formatError(error.code));
    }
  }

  /**
   * Sign up with Firebase and create Supabase profile
   */
  static async register(email: string, password: string, fullName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Profile
      await updateProfile(user, { displayName: fullName });

      // Get ID Token for Supabase
      const idToken = await user.getIdToken();
      const supabase = createClient(idToken);

      // Create entry in Supabase 'profiles' table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.uid,
        email: email,
        name: fullName,
      });

      if (profileError) {
        console.error("Supabase Profile Sync Error:", profileError);
        // We don't throw here to avoid blocking registration if Supabase fails, 
        // but in production, we might want a retry logic or strict failure.
      }

      return user;
    } catch (error: any) {
      throw new Error(this.formatError(error.code));
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Ensure profile exists in Supabase
      const idToken = await user.getIdToken();
      const supabase = createClient(idToken);

      // We use upsert here because the user might already exist
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.uid,
        email: user.email,
        name: user.displayName,
      });

      if (profileError) {
        console.error("Supabase Profile Sync Error (Google):", profileError);
      }

      return user;
    } catch (error: any) {
      throw new Error(this.formatError(error.code));
    }
  }

  /**
   * Sign out from Firebase
   */
  static async logout() {
    await firebaseSignOut(auth);
  }

  /**
   * Format Firebase error codes into user-friendly messages
   */
  private static formatError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or security key.';
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/weak-password':
        return 'Security key is too weak.';
      default:
        return 'Authentication failed. Please try again.';
    }
  }
}
