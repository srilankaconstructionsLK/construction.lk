// src/components/AppBootstrap.tsx
"use client";

import { useEffect, ReactNode } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { hydrateLocation, startLocationSync } from "@/redux/slices/locationSlice";
import { useAuth } from "@/context/AuthContext";

/**
 * AppBootstrap handles the global initialization logic for the application.
 * This component ensures that essential global state (like location and 
 * auth-dependent subscriptions) is initialized once and kept in sync.
 */
export function AppBootstrap({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  // ─── One-time global inits (no dependencies) ────────────────────────────
  useEffect(() => {
    console.log("[AppBootstrap] Initializing global state...");
    
    // Location: restore from localStorage + open realtime channel
    dispatch(hydrateLocation());
    const unsubscribe = dispatch(startLocationSync());

    return () => {
      console.log("[AppBootstrap] Cleaning up global state subscriptions...");
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [dispatch]);

  // ─── Auth-dependent inits (re-run when user changes) ────────────────────
  useEffect(() => {
    if (!user) {
      console.log("[AppBootstrap] No user session found.");
      return;
    }

    console.log(`[AppBootstrap] User session detected: ${user.uid}. Initializing user-specific services...`);

    // TODO: Add auth-dependent initializations here in the future
    // e.g., startNotificationSync(user.uid), identifyAnalyticsUser(user), etc.

    return () => {
      console.log(`[AppBootstrap] Cleaning up user-specific services for: ${user.uid}`);
      // Clean up auth-dependent subscriptions
    };
  }, [dispatch, user]);

  return <>{children}</>;
}
