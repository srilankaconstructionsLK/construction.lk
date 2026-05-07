"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { AuthService } from '@/services/AuthService';
import { UserService, UserProfile } from '@/services/UserService';
import { useDispatch } from 'react-redux';
import { setUser as setReduxUser, clearUser, setLoading as setReduxLoading } from '@/redux/slices/authSlice';

interface AuthContextType {
  user: User | null;
  currentUser: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isAgent: boolean;
  isModerator: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  currentUser: null,
  profile: null,
  isAdmin: false,
  isAgent: false,
  isModerator: false,
  loading: true,
  logout: async () => {},
});

// Module-level variable to persist initialization state across client-side navigations
let authWasInitialized = false;
let lastKnownUser: User | null = null;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(lastKnownUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(!authWasInitialized);
  const dispatch = useDispatch();

  // Derived role booleans
  const isAdmin = profile?.roles?.includes('admin') || false;
  const isAgent = profile?.roles?.includes('agent') || false;
  const isModerator = profile?.roles?.includes('moderator') || false;

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      lastKnownUser = firebaseUser;
      
      // Stop initial UI blocking IMMEDIATELY
      setLoading(false);
      authWasInitialized = true;
      
      if (firebaseUser) {
        console.log("Auth State Changed : Logged in", firebaseUser.uid);
        
        try {
          // Initial Redux sync
          dispatch(setReduxUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          }));

          // 1. Wait for custom claims (blocking functions)
          await AuthService.waitForClaims(firebaseUser);

          // 2. Sync with Supabase Profile
          let userData: UserProfile | null = null;
          try {
            userData = await UserService.getProfileById(firebaseUser.uid);
            console.log("Fetched Supabase Profile:", userData);
          } catch (e: any) {
            console.log("User profile not found, creating new one...");
            try {
              userData = await UserService.createProfile({
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
                roles: ["user"],
              });
              console.log("Created new profile:", userData);
            } catch (createError) {
              console.error("Failed to create user profile:", createError);
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
          console.error("Unexpected error during auth sync:", error);
        }
      } else {
        console.log("Auth State Changed : Logged Out");
        setProfile(null);
        dispatch(clearUser());
      }
      
      dispatch(setReduxLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      currentUser: user,
      profile, 
      isAdmin, 
      isAgent,
      isModerator,
      loading, 
      logout 
    }}>
      {/* 
        We show children even during loading to prevent the "white screen" or "empty header" 
        on navigation, but SiteFrame handles the loading UI for auth-specific elements.
      */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
