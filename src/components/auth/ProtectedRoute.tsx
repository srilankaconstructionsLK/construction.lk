"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const ROLE_HIERARCHY: Record<string, number> = {
  customer: 0,
  business_owner: 1,
  agent: 2,
  moderator: 3,
  admin: 4,
  super_admin: 5,
};

interface ProtectedRouteProps {
  requiredRole?: string;
  children: React.ReactNode;
}

export default function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const { user, appRole, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (requiredRole && appRole) {
        const userLevel = ROLE_HIERARCHY[appRole] || 0;
        const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

        if (userLevel < requiredLevel) {
          router.push("/unauthorized");
        }
      }
    }
  }, [isAuthenticated, appRole, loading, requiredRole, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If unauthenticated or insufficient role, show nothing while redirecting
  if (!isAuthenticated || (requiredRole && appRole && ROLE_HIERARCHY[appRole] < ROLE_HIERARCHY[requiredRole])) {
    return null;
  }

  return <>{children}</>;
}
