"use client";

import React, { useState, useEffect } from "react";
import {
  Activity, 
  AlertTriangle, 
  ChevronRight, 
  Clock, 
  Cpu,
  Globe, 
  Shield, 
  Store,
  TrendingUp,
  Users
} from "lucide-react";

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  // Mock data
  const stats = {
    verified_live: 124,
    active: 145,
    action_required: 12,
    unpaid: 8,
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isSynced = stats.verified_live >= stats.active;

  return (
    <div className="-m-4 md:-m-6 lg:-m-8">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center shadow-sm">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitor system performance and administrative governance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 uppercase">
                System Status: Operational
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-12 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
              title="Verified Suppliers"
              value={stats.verified_live}
              description={isSynced ? "Fully synced with directory" : "Sync discrepancy detected"}
              icon={<Globe className="w-5 h-5 text-gray-600" />}
              statusColor={isSynced ? "text-emerald-500" : "text-rose-500"}
          />
          <StatsCard 
              title="Active Ads"
              value={stats.active}
              description="Total active listings"
              icon={<Store className="w-5 h-5 text-gray-600" />}
          />
          <StatsCard 
              title="Awaiting Review"
              value={stats.action_required}
              description="Ads needing approval"
              icon={<Shield className="w-5 h-5 text-gray-600" />}
              statusColor={stats.action_required > 0 ? "text-amber-500" : "text-emerald-500"}
          />
          <StatsCard 
              title="Pending Payments"
              value={stats.unpaid}
              description="Invoices awaiting clearance"
              icon={<AlertTriangle className="w-5 h-5 text-gray-600" />}
              statusColor={stats.unpaid > 0 ? "text-primary" : "text-emerald-500"}
          />
        </div>

        {/* Admin Activity Log */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Governance Audit Log</h3>
            </div>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline transition-colors">
              Full Audit Trail
            </button>
          </div>
          
          <div className="divide-y divide-gray-50">
            <ActivityItem 
              action="Admin modified permissions for 'Apex Construction'"
              time="12m ago"
            />
            <ActivityItem 
              action="New category 'Smart Lighting' initialized"
              time="58m ago"
            />
            <ActivityItem 
              action="System-wide cache flushing sequence completed"
              time="2h ago"
            />
            <ActivityItem 
              action="Verified 'Global Build Corp' business profile"
              time="5h ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function StatsCard({ title, value, description, icon, statusColor = "text-secondary" }: any) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-primary/20 transition-colors group">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">{title}</p>
              <h3 className={`text-xl font-black tracking-tight ${statusColor}`}>{value}</h3>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                {icon}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{description}</p>
          </div>
        </div>
    )
}

function ActivityItem({ action, time }: any) {
  return (
    <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50/50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{action}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3 text-gray-300" />
        <span className="text-[10px] font-mono font-bold text-gray-400">{time}</span>
        <ChevronRight className="w-3 h-3 text-gray-200 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  )
}
