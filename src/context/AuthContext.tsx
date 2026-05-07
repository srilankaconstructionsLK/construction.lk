"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { AuthService } from '@/services/AuthService';
import { UserService, UserProfile } from '@/services/UserService';
import { useDispatch } from 'react-redux';
import { setUser as setReduxUser, clearUser, setLoading as setReduxLoading } from '@/redux/slices/authSlice';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  profileLoading: false,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const dispatch = useDispatch();

  const isAdmin = profile?.roles?.includes('admin') || false;

  useEffect(() => {
    // Initial loading state for Firebase Auth
    const unsubscribe = AuthService.onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      // Immediately stop auth loading so UI can show something
      if (!firebaseUser) {
        setLoading(false);
        setProfile(null);
        dispatch(clearUser());
        dispatch(setReduxLoading(false));
        return;
      }

      // If we have a user, start profile sync in background
      setProfileLoading(true);
      // We set loading to false here so the header is visible while profile syncs
      setLoading(false); 
      
      try {
        // Sync Redux immediately with available info
        dispatch(setReduxUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }));

        // 1. Wait for custom claims (blocking functions to finish)
        await AuthService.waitForClaims(firebaseUser);

        // 2. Sync with Supabase Profile
        let userData: UserProfile | null = null;
        try {
          userData = await UserService.getProfileById(firebaseUser.uid);
        } catch (e: any) {
          console.log("Supabase profile not found, creating one...");
          try {
            userData = await UserService.createProfile({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
              roles: ["user"],
            });
          } catch (createError) {
            console.error("Failed to create Supabase profile:", createError);
          }
        }

        if (userData) {
          setProfile(userData);
          dispatch(setReduxUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.name,
            photoURL: firebaseUser.photoURL || userData.profile_picture_url || null,
          }));
        }
      } catch (error) {
        console.error("Profile sync error:", error);
      } finally {
        setProfileLoading(false);
        dispatch(setReduxLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, profileLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
