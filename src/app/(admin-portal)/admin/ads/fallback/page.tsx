"use client";

import { motion } from "framer-motion";
import { 
  Megaphone, 
  Plus, 
  Settings, 
  RefreshCw, 
  MoreVertical,
  Image as ImageIcon,
  ShieldAlert
} from "lucide-react";
import React from "react";

export default function FallbackAdsPage() {
  const fallbacks = [
    { id: "FB-001", title: "Construction.lk Branding", category: "Global", type: "Standard Banner" },
    { id: "FB-002", title: "Machinery Marketplace", category: "Heavy Equipment", type: "Sidebar Promo" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <div>
          <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Fallback Inventory</h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Manage system-level default advertisements for empty placements</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
           <Plus className="w-3.5 h-3.5" />
           Configure Fallback
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex gap-4">
         <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
         <div>
            <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Revenue Warning</h4>
            <p className="text-[9px] text-amber-800/70 font-bold uppercase tracking-widest mt-1">Fallback ads are currently active on 12% of live placements due to inventory exhaustion.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {fallbacks.map((ad, i) => (
            <div key={i} className="bg-white border border-surface-variant rounded-md overflow-hidden flex flex-col group hover:border-primary/30 transition-all">
               <div className="h-40 bg-surface-container-low flex items-center justify-center relative">
                  <ImageIcon className="w-12 h-12 text-secondary/10" />
                  <div className="absolute top-3 right-3 flex gap-1">
                     <button className="p-1.5 bg-white/80 rounded-sm hover:bg-white shadow-sm transition-all"><Settings className="w-3.5 h-3.5 text-secondary" /></button>
                     <button className="p-1.5 bg-white/80 rounded-sm hover:bg-white shadow-sm transition-all"><RefreshCw className="w-3.5 h-3.5 text-secondary" /></button>
                  </div>
               </div>
               <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                     <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-black text-secondary/30 tracking-widest uppercase">{ad.id}</span>
                        <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">{ad.category}</span>
                     </div>
                     <h3 className="text-[11px] font-black text-secondary uppercase tracking-tight">{ad.title}</h3>
                     <p className="text-[9px] text-secondary/40 font-bold uppercase tracking-widest mt-1">{ad.type}</p>
                  </div>
                  <div className="mt-6 flex justify-between items-center pt-4 border-t border-surface-variant/50">
                     <div className="flex items-center gap-1.5 text-emerald-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-widest">Active System Default</span>
                     </div>
                     <button className="text-[9px] font-bold text-secondary/40 hover:text-secondary uppercase tracking-widest">Manage Creative</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
