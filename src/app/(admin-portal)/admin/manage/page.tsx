"use client";

import { UserManagement } from "@/components/admin/UserManagement";
import { useAuth } from "@/context/AuthContext";

export default function AdminManagePage() {
  const { appRole } = useAuth();
  
  return (
    <div className="p-4 md:p-8">
      <UserManagement mode={(appRole === "super_admin" ? "super_admin" : "admin")} />
    </div>
  );
}
