"use client";

import Link from "next/link";
import { BusinessProfile } from "@/services/supabase/BusinessService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  ExternalLink,
  LayoutDashboard,
  MoreHorizontal,
  Trash2,
  XCircle,
} from "lucide-react";

interface BusinessListTableProps {
  stores: BusinessProfile[];
  loading: boolean;
  currentPage: number;
  hasMore: boolean;
  isSuperAdmin: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGotoPage: (page: number) => void;
  onView: (store: BusinessProfile) => void;
  onToggleStatus: (store: BusinessProfile) => void;
  onToggleVerification: (store: BusinessProfile) => void;
  onRequestDelete: (store: BusinessProfile) => void;
}

function getStatusBadge(status: string | null) {
  if (status === "active") {
    return <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full px-3 pointer-events-none">Active</Badge>;
  }
  if (status === "pending" || status === "pending_payment") {
    return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 rounded-full px-3 pointer-events-none">Pending</Badge>;
  }
  return (
    <Badge className="bg-red-50 text-red-600 border-red-100 rounded-full px-3 pointer-events-none">
      {status || "Inactive"}
    </Badge>
  );
}

function getPlanBadge(plan: string | null) {
  const label = (plan || "free").toLowerCase();
  if (label === "enterprise") {
    return <Badge className="bg-slate-100 text-slate-700 border-slate-200 capitalize pointer-events-none">{label}</Badge>;
  }
  if (label === "pro") {
    return <Badge className="bg-purple-100 text-purple-700 border-purple-200 capitalize pointer-events-none">{label}</Badge>;
  }
  if (label === "starter") {
    return <Badge className="bg-blue-100 text-blue-700 border-blue-200 capitalize pointer-events-none">{label}</Badge>;
  }
  return <Badge className="bg-gray-100 text-gray-600 border-gray-200 capitalize pointer-events-none">free</Badge>;
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString() : "N/A";
}

export function BusinessListTable({
  stores,
  loading,
  currentPage,
  hasMore,
  isSuperAdmin,
  onPrevPage,
  onNextPage,
  onGotoPage,
  onView,
  onToggleStatus,
  onToggleVerification,
  onRequestDelete,
}: BusinessListTableProps) {
  return (
    <div className="bg-white rounded-md border border-surface-variant shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-container-low/50 hover:bg-surface-container-low/50 border-b border-surface-variant">
            <TableHead className="font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Business Name</TableHead>
            <TableHead className="font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Location</TableHead>
            <TableHead className="text-center font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Status</TableHead>
            <TableHead className="text-center font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Plan</TableHead>
            <TableHead className="text-center font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Verified</TableHead>
            <TableHead className="font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Created</TableHead>
            <TableHead className="text-center font-medium text-secondary/50 uppercase tracking-widest text-[10px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-500">Loading business profiles...</TableCell>
            </TableRow>
          ) : stores.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-500">No business profiles found.</TableCell>
            </TableRow>
          ) : (
            stores.map((store) => (
              <TableRow key={store.id} className="hover:bg-surface-container-low/40 border-surface-variant">
                <TableCell className="font-medium text-secondary py-2">{store.title || "Untitled"}</TableCell>
                <TableCell className="font-medium text-secondary/70 py-2">{store.city || store.district || "N/A"}</TableCell>
                <TableCell className="text-center py-2">{getStatusBadge(store.status)}</TableCell>
                <TableCell className="text-center py-2">{getPlanBadge(store.subscription_plan)}</TableCell>
                <TableCell className="text-center py-2">
                  <div className="flex justify-center">
                    {store.verified ? (
                      <div className="p-0.5 rounded-full bg-green-50 text-green-600 border border-green-100"><CheckCircle className="w-3 h-3" /></div>
                    ) : (
                      <div className="p-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100"><XCircle className="w-3 h-3" /></div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-secondary/70 py-2">{formatDate(store.created_at)}</TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-secondary/60 hover:text-secondary hover:bg-surface-container-low rounded-full"
                      onClick={() => onView(store)}
                      title="Details"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                    </Button>
                    <Link href={`/business/${store.id}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-secondary/60 hover:text-primary hover:bg-primary/10 rounded-full" title="View Public Profile">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onToggleStatus(store)}>
                          {store.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToggleVerification(store)}>
                          {store.verified ? "Unverify" : "Verify Business"}
                        </DropdownMenuItem>
                        {isSuperAdmin && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onRequestDelete(store)} className="text-red-600 focus:text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Business
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="py-4 border-t border-gray-100 bg-gray-50 rounded-b-md">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPrevPage();
                }}
                className={currentPage === 1 || loading ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); onGotoPage(currentPage - 1); }}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {hasMore && (
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); onGotoPage(currentPage + 1); }}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNextPage();
                }}
                className={!hasMore || loading ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
