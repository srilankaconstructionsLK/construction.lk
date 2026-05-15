"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Store as StoreIcon } from "lucide-react";

export type TabValue = "all" | "my_created" | "action_required";

interface BusinessListHeaderProps {
  activeTab: TabValue;
  onTabChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  planFilter: string;
  onPlanChange: (value: string) => void;
  onStatusFetch: (status: string) => void;
  createHref: string;
}

const PLANS = ["free", "starter", "pro", "enterprise"];

export function BusinessListHeader({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  planFilter,
  onPlanChange,
  onStatusFetch,
  createHref,
}: BusinessListHeaderProps) {
  return (
    <>
      <div className="bg-white border-b border-surface-variant px-6 py-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center shadow-sm">
              <StoreIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Business Management</h1>
              <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mt-0.5">Oversee listings and profile statuses</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-white border border-surface-variant rounded-sm text-[10px] font-bold text-secondary/60 uppercase tracking-widest">
            Admin Inventory
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md border border-surface-variant p-4 md:p-6 shadow-sm space-y-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="inline-grid grid-cols-3 bg-gray-100 p-1 rounded-sm border border-gray-200 w-auto min-w-[320px] md:min-w-[680px] max-w-full">
            <TabsTrigger value="all" className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-secondary data-[state=active]:shadow-sm">All Businesses</TabsTrigger>
            <TabsTrigger value="my_created" className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-secondary data-[state=active]:shadow-sm">Created by Me</TabsTrigger>
            <TabsTrigger value="action_required" className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-secondary data-[state=active]:shadow-sm">Action Required</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search business profiles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-surface-variant focus:ring-primary/10 focus:border-primary rounded-sm w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-surface-variant text-secondary w-full sm:w-auto rounded-sm">
                  {statusFilter === "all" ? "All Statuses" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] bg-white">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { onStatusChange("all"); onStatusFetch("all"); }}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onStatusChange("active"); onStatusFetch("active"); }}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onStatusChange("pending"); onStatusFetch("pending"); }}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { onStatusChange("suspended"); onStatusFetch("suspended"); }}>Suspended</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-surface-variant text-secondary w-full sm:w-auto capitalize rounded-sm">
                  {planFilter === "all" ? "All Plans" : planFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] bg-white">
                <DropdownMenuLabel>Filter by Plan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onPlanChange("all")}>All Plans</DropdownMenuItem>
                {PLANS.map((plan) => (
                  <DropdownMenuItem key={plan} onClick={() => onPlanChange(plan)} className="capitalize">
                    {plan}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={createHref} className="w-full sm:w-auto">
              <Button className="bg-primary-container hover:bg-primary text-white font-black uppercase tracking-widest text-[10px] w-full sm:w-auto rounded-sm">Create New Business Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
