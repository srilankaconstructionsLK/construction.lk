"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { 
  Search, 
  UserCog, 
  ShieldCheck, 
  Loader2, 
  UserPlus, 
  Trash2, 
  ChevronRight,
  ChevronDown,
  Filter,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Copy,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserProfile, UserService } from "@/services/supabase/UserService";
import { setUserRole } from "@/lib/setUserRole";
import { useAuth } from "@/context/AuthContext";

const VALID_ROLES = [
  "customer",
  "business_owner",
  "agent",
  "moderator",
  "admin",
  "super_admin",
];

interface UserManagementProps {
  mode: "admin" | "super_admin";
}

export function UserManagement({ mode }: UserManagementProps) {
  const { user: authUser, appRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [viewMode, setViewMode] = useState<"privileged" | "all">("privileged");
  
  // Form State
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 10;
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const MANAGED_ROLES = useMemo(() => {
    if (appRole === "super_admin") return VALID_ROLES;
    return VALID_ROLES.filter(r => r !== "super_admin");
  }, [appRole]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      if (viewMode === "privileged") {
        // Fetch users for each privileged role
        const privilegedRoles = MANAGED_ROLES.filter(r => r !== "customer");
        const promises = privilegedRoles.map(r => UserService.getUsersByRole(r));
        const results = await Promise.all(promises);
        
        const allUsers = results.flat();
        const uniqueUsersMap = new Map();
        allUsers.forEach((u: any) => {
          if (u) uniqueUsersMap.set(u.id, u);
        });
        
        const finalUsers = Array.from(uniqueUsersMap.values()) as UserProfile[];
        setUsers(finalUsers);
        setTotalItems(finalUsers.length);
        setTotalPages(1);
      } else {
        const { data, count } = await UserService.getUsersPaginated(currentPage, ITEMS_PER_PAGE, debouncedSearchQuery);
        setUsers(data || []);
        setTotalItems(count || 0);
        setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [viewMode, MANAGED_ROLES, currentPage, debouncedSearchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleRoleChange = async (uid: string, newRole: string) => {
    setActionLoading(uid);
    try {
      await setUserRole(uid, newRole);
      await fetchUsers();
      alert(`Role updated successfully!`);
    } catch (error: any) {
      console.error("Error updating role:", error);
      alert(`Failed to update role: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssignRole = async () => {
    if (!email || !selectedRole) return;
    setLoading(true);
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        alert("No user found with this email");
        return;
      }
      await setUserRole(user.id, selectedRole);
      alert("Role assigned successfully!");
      setEmail("");
      fetchUsers();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col -m-4 md:-m-6 lg:-m-8">
      {/* Page Header */}
      <div className="bg-white border-b border-surface-variant px-6 py-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center shadow-sm">
              <UserCog className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-black text-secondary uppercase tracking-tight">
                Personnel Management
              </h1>
              <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mt-0.5">
                Access Governance & Role Assignments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant">
             <div className="flex flex-col items-end">
                <p className="text-[8px] font-black text-secondary/30 uppercase tracking-[0.2em]">Context</p>
                <p className="text-[10px] font-black text-primary uppercase tracking-wider">{appRole || 'Loading...'}</p>
             </div>
             <div className="w-px h-6 bg-surface-variant"></div>
             <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 w-full space-y-8">
        
        {/* Quick Assignment Bar */}
        <div className="bg-white rounded-xl shadow-xl shadow-primary/5 p-5 border border-surface-variant flex flex-col md:flex-row gap-5 items-end">
          <div className="flex-1 space-y-1.5 w-full">
            <Label className="text-[9px] font-black text-secondary/40 uppercase tracking-widest ml-1">Target User Email</Label>
            <div className="relative">
              <Input 
                placeholder="engineering@firm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-surface-container-low border-surface-variant focus:ring-primary pl-10 text-xs font-medium rounded-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary/30" />
            </div>
          </div>
          <div className="w-full md:w-48 space-y-1.5">
            <Label className="text-[9px] font-black text-secondary/40 uppercase tracking-widest ml-1">Assigned Role</Label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full h-10 bg-surface-container-low border border-surface-variant rounded-sm px-3 text-[11px] font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              {MANAGED_ROLES.map(r => (
                <option key={r} value={r}>{r.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <Button 
            onClick={handleAssignRole}
            disabled={loading || !email}
            className="h-10 px-6 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 transition-all disabled:opacity-50 w-full md:w-auto rounded-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
            Assign Role
          </Button>
        </div>

        {/* User Inventory Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-surface-variant overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-variant bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-3.5 h-3.5 text-secondary/40" />
              <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">
                {viewMode === "privileged" ? "Security-Cleared Personnel" : `Complete User Registry (${totalItems})`}
              </h3>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-sm border border-surface-variant">
              <button 
                onClick={() => setViewMode("privileged")}
                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all ${viewMode === "privileged" ? "bg-white text-primary shadow-sm" : "text-secondary/40 hover:text-secondary"}`}
              >
                Privileged
              </button>
              <button 
                onClick={() => setViewMode("all")}
                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all ${viewMode === "all" ? "bg-white text-primary shadow-sm" : "text-secondary/40 hover:text-secondary"}`}
              >
                All Users
              </button>
            </div>
          </div>

          {viewMode === "all" && (
            <div className="p-3 border-b border-surface-variant bg-white">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary/30" />
                <Input
                  placeholder="Filter by name or secure ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 border-surface-variant text-xs"
                />
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-surface-container-low">
                <TableRow className="hover:bg-transparent border-b border-surface-variant">
                  <TableHead className="px-6 h-10 text-[9px] font-black text-secondary/50 uppercase tracking-widest">Identification</TableHead>
                  <TableHead className="px-6 h-10 text-[9px] font-black text-secondary/50 uppercase tracking-widest">Clearance Level</TableHead>
                  <TableHead className="px-6 h-10 text-[9px] font-black text-secondary/50 uppercase tracking-widest">Account Status</TableHead>
                  <TableHead className="px-6 h-10 text-[9px] font-black text-secondary/50 uppercase tracking-widest text-right">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Retrieving Data...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">No matching records found</p>
                    </TableCell>
                  </TableRow>
                ) : users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-primary/[0.02] border-b border-surface-variant last:border-0 transition-colors group">
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary font-black text-sm border border-surface-variant group-hover:border-primary/20 transition-all">
                          {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="text-[11px] font-bold text-secondary uppercase tracking-tight">
                            {user.name || "Unidentified"}
                          </p>
                          <p className="text-[10px] text-secondary/40 font-medium lowercase tracking-tight">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border transition-all ${
                        user.role === 'super_admin' ? 'bg-red-50 text-red-600 border-red-100' :
                        user.role === 'admin' ? 'bg-primary/5 text-primary border-primary/20' :
                        'bg-surface-container-high text-secondary/60 border-surface-variant'
                      }`}>
                        {user.role?.replace('_', ' ') || 'Standard Access'}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      {user.verified ? (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-secondary/30">
                          <XCircle className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Unverified</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-5 text-right">
                      <div className="flex justify-end items-center gap-4">
                        <div className="relative group/select">
                          <select 
                            className="appearance-none bg-surface-container-low hover:bg-surface-container-high text-[9px] font-black text-primary uppercase tracking-[0.1em] pl-3 pr-8 py-1.5 rounded-sm border border-primary/10 hover:border-primary/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={user.role || 'customer'}
                            disabled={actionLoading === user.id}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          >
                            {MANAGED_ROLES.map(r => (
                              <option key={r} value={r} className="bg-white text-secondary font-bold uppercase text-[10px]">{r.replace('_', ' ')}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-primary pointer-events-none transition-transform group-hover/select:translate-y-[-40%]" />
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8 text-secondary/20 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all"
                          onClick={() => {
                            if(confirm(`Are you sure you want to revoke all access for ${user.email}?`)) {
                              handleRoleChange(user.id, 'customer');
                            }
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      {actionLoading === user.id && (
                        <div className="flex items-center justify-end gap-2 text-primary animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Syncing...</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="py-6 border-t border-surface-variant bg-surface-container-lowest px-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
