"use client";

import { useAuth as useAuthContext } from "@/context/AuthContext";

/**
 * Hook to access the authentication state.
 * Exposes: user, appRole, loading, isAuthenticated, signOut
 */
export const useAuth = () => {
  return useAuthContext();
};
