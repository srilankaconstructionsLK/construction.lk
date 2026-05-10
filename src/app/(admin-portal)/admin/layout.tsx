"use client";

import AdminLayout from "@/components/admin/components/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { appRole, loading } = useAuth();
  const router = useRouter();

  // Route Protection Logic
  useEffect(() => {
    if (!loading && appRole !== "admin" && appRole !== "super_admin") {
      router.push("/unauthorized");
    }
  }, [appRole, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-container-low">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em]">Verifying Clearance...</p>
        </div>
      </div>
    );
  }

  // If unauthorized, the useEffect will handle redirection. 
  // We return null here to prevent flashing unauthorized content.
  if (appRole !== "admin" && appRole !== "super_admin") {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
