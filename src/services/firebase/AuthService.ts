import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  IdTokenResult
} from 'firebase/auth';

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
   * Wait for custom claims to be populated by Cloud Functions
   * This is critical for Supabase RLS to recognize the 'authenticated' role.
   */
  static async waitForClaims(user: User, maxAttempts = 10): Promise<IdTokenResult> {
    let attempts = 0;
    while (attempts < maxAttempts) {
      // Force refresh the token to get new claims
      const tokenResult = await user.getIdTokenResult(true);
      if (tokenResult.claims.role === 'authenticated') {
        console.log(`[AuthService] Custom claims found: role=${tokenResult.claims.role}, app_role=${tokenResult.claims.app_role}`);
        return tokenResult;
      }
      // Wait 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    console.warn("Timeout waiting for 'authenticated' claim. RLS might fail.");
    return await user.getIdTokenResult();
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
   * Sign up with Firebase
   */
  static async register(email: string, password: string, fullName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Profile
      await updateProfile(user, { displayName: fullName });

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
      return userCredential.user;
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
      case 'auth/popup-closed-by-user':
        return 'Login cancelled.';
      default:
        return 'Authentication failed. Please try again.';
    }
  }
}
