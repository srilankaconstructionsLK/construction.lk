"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Megaphone, 
  Plus, 
  BarChart3, 
  Target, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Play, 
  Pause,
  Trash2
} from "lucide-react";
import React from "react";

export default function AdOperationsPage() {
  const ads = [
    { id: "AD-7721", title: "Premium Steel Banner", type: "Hero Slider", status: "Active", impressions: "45.2K", clicks: "1.2K" },
    { id: "AD-7722", title: "CEMENT-CO Search Promo", type: "Search Result", status: "Paused", impressions: "12.8K", clicks: "450" },
    { id: "AD-7723", title: "Heavy Machinery Video", type: "Sidebar Video", status: "Active", impressions: "8.1K", clicks: "92" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-variant pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-md flex items-center justify-center border border-amber-100">
                <Megaphone className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-secondary uppercase tracking-tight">Ad Operations</h1>
                <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest mt-1">Campaign management and placement logistics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="outline" className="h-10 border-surface-variant font-black text-secondary text-[10px] uppercase tracking-widest rounded-sm">
                  Placement Map
               </Button>
               <Button className="h-10 px-6 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-secondary/10 transition-all active:scale-[0.98] rounded-sm flex items-center gap-2">
                 <Plus className="w-4 h-4" />
                 New Campaign
               </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <MetricCard label="Active Campaigns" value="12" icon={Target} color="text-blue-600" />
             <MetricCard label="Total Impressions" value="1.2M" icon={BarChart3} color="text-emerald-600" />
             <MetricCard label="Avg. CTR" value="3.4%" icon={Layers} color="text-amber-600" />
             <MetricCard label="Remaining Credit" value="LKR 12.5K" icon={Clock} color="text-slate-600" />
          </div>

          {/* Ad Campaigns Table */}
          <div className="bg-white border border-surface-variant rounded-md overflow-hidden">
             <div className="px-6 py-4 bg-surface-container-lowest border-b border-surface-variant flex items-center justify-between">
                <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Live Placements</h2>
                <div className="flex gap-2">
                   <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest">Global Filter</Badge>
                </div>
             </div>
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-surface-container-lowest border-b border-surface-variant">
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Campaign ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Creative Title</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Placement Type</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Stats</th>
                      <th className="px-6 py-4"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant">
                   {ads.map((ad) => (
                      <tr key={ad.id} className="hover:bg-surface-container-lowest transition-colors group">
                         <td className="px-6 py-5">
                            <span className="text-[10px] font-black text-secondary tracking-widest">{ad.id}</span>
                         </td>
                         <td className="px-6 py-5">
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-tight">{ad.title}</h3>
                         </td>
                         <td className="px-6 py-5">
                            <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest">{ad.type}</span>
                         </td>
                         <td className="px-6 py-5">
                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-[8px] font-black uppercase tracking-widest ${ad.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                               {ad.status === 'Active' ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
                               {ad.status}
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <div className="flex flex-col gap-1">
                               <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{ad.impressions} Views</span>
                               <span className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest">{ad.clicks} Clicks</span>
                            </div>
                         </td>
                         <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="p-2 hover:bg-surface-variant rounded-sm transition-colors text-secondary/40 hover:text-secondary">
                                  <BarChart3 className="w-4 h-4" />
                               </button>
                               <button className="p-2 hover:bg-red-50 rounded-sm transition-colors text-red-300 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </motion.div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
       <div>
          <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-[0.2em]">{label}</p>
          <h3 className="text-xl font-black text-secondary mt-1 tracking-tight">{value}</h3>
       </div>
       <Icon className={`w-8 h-8 ${color} opacity-20`} />
    </div>
  );
}
