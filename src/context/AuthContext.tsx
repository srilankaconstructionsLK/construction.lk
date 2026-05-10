"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserService, UserProfile } from "@/services/supabase/UserService";

interface AuthContextType {
  user: User | null;
  appRole: string | null;
  profile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [appRole, setAppRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  
  // ✅ Store signal unsubscribe ref so we can clean it up properly
  const unsubscribeSignalRef = useRef<(() => void) | null>(null);

  const fetchProfile = useCallback(async (uid: string) => {
    setProfileLoading(true);
    try {
      const data = await UserService.getProfileById(uid);
      setProfile(data);
    } catch (error) {
      console.warn("[Auth] Profile not found or error fetching:", error);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const refreshAuthToken = useCallback(async (firebaseUser: User) => {
    try {
      await firebaseUser.getIdToken(true);
      const decodedToken = await firebaseUser.getIdTokenResult();
      const role = (decodedToken.claims.app_role as string) || "customer";
      
      console.log("[Auth] Custom Claims:", decodedToken.claims);
      setAppRole(role);
      
      // Also trigger profile refresh when token changes (might mean role changed)
      await fetchProfile(firebaseUser.uid);
    } catch (error) {
      console.error("[Auth] Error refreshing token:", error);
    }
  }, [fetchProfile]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(`[Auth] State Change: ${firebaseUser ? "Login" : "Logout"}`);
      
      // ✅ Always clean up previous signal listener first
      if (unsubscribeSignalRef.current) {
        unsubscribeSignalRef.current();
        unsubscribeSignalRef.current = null;
      }

      if (firebaseUser) {
        setUser(firebaseUser);
        await refreshAuthToken(firebaseUser);
        setLoading(false);

        // ✅ Store unsubscribe in ref so it persists across renders
        unsubscribeSignalRef.current = onSnapshot(
          doc(db, "user_signals", firebaseUser.uid),
          async (snapshot) => {
            if (snapshot.exists() && snapshot.data().needsTokenRefresh) {
              console.log("[Auth] Role change detected, refreshing token...");
              await refreshAuthToken(firebaseUser);
              try {
                await deleteDoc(snapshot.ref);
              } catch (error) {
                console.error("[Auth] Error deleting user signal:", error);
              }
            }
          }
        );

      } else {
        setUser(null);
        setProfile(null);
        setAppRole(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      // ✅ Clean up signal listener on unmount
      if (unsubscribeSignalRef.current) {
        unsubscribeSignalRef.current();
      }
    };
  }, [refreshAuthToken]);

  const signOut = async () => {
    // ✅ Clean up signal listener before signing out
    if (unsubscribeSignalRef.current) {
      unsubscribeSignalRef.current();
      unsubscribeSignalRef.current = null;
    }
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        appRole,
        profile,
        loading,
        profileLoading,
        isAuthenticated: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};