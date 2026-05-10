"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  PieChart
} from "lucide-react";
import React from "react";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Daily Active Users", value: "2,840", change: "+14%", trend: "up" },
    { label: "Listing Conversion", value: "4.2%", change: "+0.8%", trend: "up" },
    { label: "Bounce Rate", value: "32%", change: "-2.4%", trend: "down" },
    { label: "Avg. Session", value: "4m 12s", change: "+12s", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <div>
          <h1 className="text-lg font-black text-secondary uppercase tracking-tight">System Analytics</h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Real-time performance metrics and traffic monitoring</p>
        </div>
        <div className="flex gap-2">
           <button className="px-3 py-1.5 bg-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-sm">Export Data</button>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white border border-surface-variant p-4 rounded-md">
            <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest">{m.label}</p>
            <div className="flex items-center justify-between mt-2">
               <h3 className="text-xl font-black text-secondary">{m.value}</h3>
               <div className={`flex items-center gap-0.5 text-[9px] font-black uppercase tracking-tight ${m.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {m.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {m.change}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Traffic Source Placeholder */}
         <div className="bg-white border border-surface-variant rounded-md p-6 h-80 flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Traffic Distribution</h2>
               <Globe className="w-4 h-4 text-secondary/20" />
            </div>
            <div className="flex-1 border-2 border-dashed border-surface-variant rounded-md flex items-center justify-center">
               <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest">Global Heatmap Rendering...</p>
            </div>
         </div>

         {/* Sector Distribution Placeholder */}
         <div className="bg-white border border-surface-variant rounded-md p-6 h-80 flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Listing Density by Sector</h2>
               <PieChart className="w-4 h-4 text-secondary/20" />
            </div>
            <div className="flex-1 border-2 border-dashed border-surface-variant rounded-md flex items-center justify-center">
               <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest">Sector Charting Algorithm Active</p>
            </div>
         </div>
      </div>
    </div>
  );
}
