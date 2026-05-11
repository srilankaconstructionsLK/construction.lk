"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  Users,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BusinessDashboardPage() {
  const stats = [
    { label: "Profile Views", value: "12.4K", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Leads", value: "48", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Partner Network", value: "156", icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-xl font-black text-secondary uppercase tracking-tight">Business Intelligence</h1>
              <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest mt-1">Strategic oversight for industrial partners</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-10 border-surface-variant font-black text-secondary text-[10px] uppercase tracking-widest rounded-sm">
                Analytics Report
              </Button>
              <Button className="h-10 px-6 bg-primary-container hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary-container/20 transition-all active:scale-[0.98] rounded-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Business Unit
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white border border-surface-variant p-6 rounded-md shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 ${stat.bg} rounded-sm flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-sm">+12%</div>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-xl font-black text-secondary mt-1">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business Profiles List */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Your Industrial Profiles</h2>
                  <Link href="/admin/business/manage" className="text-[9px] font-bold text-primary-container uppercase tracking-widest hover:underline">View All</Link>
               </div>
               
               <div className="space-y-4">
                  <BusinessEntry 
                    name="Apex Steel Construction" 
                    location="Colombo 10, Sri Lanka"
                    verified
                    status="Active"
                    rating={4.8}
                  />
                  <BusinessEntry 
                    name="Senu Logistics & Supply" 
                    location="Gampaha, Sri Lanka"
                    status="Pending"
                    rating={0.0}
                  />
               </div>
            </div>

            {/* Notifications / Sidebar */}
            <div className="space-y-6">
               <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Operational Alerts</h2>
               <div className="bg-white border border-surface-variant rounded-md divide-y divide-surface-variant">
                  <AlertItem title="Subscription Expiring" desc="Your Pro plan expires in 3 days." type="warning" />
                  <AlertItem title="New RFQ Match" desc="Steel reinforcement bars requested in Colombo." type="info" />
                  <AlertItem title="Identity Verified" desc="Business BR documentation approved." type="success" />
               </div>
            </div>
          </div>
        </motion.div>
    </div>
  );
}

function BusinessEntry({ name, location, verified = false, status, rating }: any) {
  return (
    <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between group hover:border-primary-container transition-all">
       <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 bg-surface-container-low rounded flex items-center justify-center overflow-hidden border border-surface-variant">
             <Building2 className="w-8 h-8 text-secondary/20" />
          </div>
          <div>
             <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-tight">{name}</h3>
                {verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
             </div>
             <div className="flex items-center gap-2 mt-1 text-secondary/40">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{location}</span>
             </div>
             <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                   <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                   <span className="text-[10px] font-black text-secondary">{rating.toFixed(1)}</span>
                </div>
                <div className="h-3 w-px bg-surface-variant"></div>
                <div className="text-[9px] font-black text-secondary/50 uppercase tracking-widest">{status}</div>
             </div>
          </div>
       </div>
       <button className="w-10 h-10 rounded-sm border border-surface-variant flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
          <ArrowUpRight className="w-4 h-4" />
       </button>
    </div>
  );
}

function AlertItem({ title, desc, type }: any) {
  const colorMap: Record<string, string> = {
    warning: "border-amber-500",
    info: "border-blue-500",
    success: "border-emerald-500",
  };
  const colors = colorMap[type] || "border-surface-variant";

  return (
    <div className={`p-4 border-l-4 ${colors}`}>
       <h4 className="text-[10px] font-black text-secondary uppercase tracking-widest">{title}</h4>
       <p className="text-[9px] text-secondary/50 font-bold uppercase tracking-widest mt-1">{desc}</p>
    </div>
  );
}
