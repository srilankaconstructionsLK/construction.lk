"use client";

import { useAuth } from "@/context/AuthContext";
import { ROLE_HIERARCHY } from "./ProtectedRoute";

interface RoleGuardProps {
  requiredRole: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Inline conditional rendering based on user role.
 * Uses ROLE_HIERARCHY to allow higher roles to see content intended for lower roles.
 */
export default function RoleGuard({ requiredRole, children, fallback = null }: RoleGuardProps) {
  const { appRole, isAuthenticated } = useAuth();

  if (!isAuthenticated || !appRole) return <>{fallback}</>;

  const userLevel = ROLE_HIERARCHY[appRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

  if (userLevel >= requiredLevel) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
