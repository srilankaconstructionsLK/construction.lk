"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Plus, 
  Search, 
  Globe, 
  MoreVertical,
  Navigation,
  ShieldCheck
} from "lucide-react";
import React from "react";

export default function ManageCityPage() {
  const regions = [
    { name: "Colombo District", cities: 42, coverage: "High" },
    { name: "Kandy District", cities: 18, coverage: "Medium" },
    { name: "Galle District", cities: 12, coverage: "Medium" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <div>
          <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Geospatial Logistics</h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Manage regional coverage and district-level location nodes</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
           <Plus className="w-3.5 h-3.5" />
           Add Regional Node
        </button>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
            <div>
               <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest leading-none mb-2">Total Locations</p>
               <h3 className="text-xl font-black text-secondary tracking-tight">2,452</h3>
            </div>
            <Globe className="w-8 h-8 text-secondary/10" />
         </div>
         <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
            <div>
               <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest leading-none mb-2">Active Districts</p>
               <h3 className="text-xl font-black text-secondary tracking-tight">25</h3>
            </div>
            <Navigation className="w-8 h-8 text-secondary/10" />
         </div>
         <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
            <div>
               <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest leading-none mb-2">Verified Coverage</p>
               <h3 className="text-xl font-black text-emerald-500 tracking-tight">98.2%</h3>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-500/10" />
         </div>
      </div>

      <div className="bg-white border border-surface-variant rounded-md overflow-hidden">
         <div className="p-4 bg-surface-container-lowest border-b border-surface-variant flex justify-between items-center">
            <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Regional Inventory</h2>
            <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-secondary/30" />
               <input 
                  type="text" 
                  placeholder="Filter by district or city..." 
                  className="w-full h-8 pl-9 pr-4 bg-white border border-surface-variant rounded-sm text-[9px] font-bold uppercase tracking-wider outline-none"
               />
            </div>
         </div>
         <div className="divide-y divide-surface-variant">
            {regions.map((region, i) => (
               <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-lowest transition-colors group">
                  <div className="flex items-center gap-5">
                     <div className="w-2 h-2 rounded-full bg-secondary/20 group-hover:bg-primary transition-colors"></div>
                     <div>
                        <h3 className="text-[11px] font-black text-secondary uppercase tracking-tight">{region.name}</h3>
                        <p className="text-[9px] text-secondary/40 font-bold uppercase tracking-widest mt-0.5">{region.cities} City Nodes Initialized</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8">
                     <div className="text-right">
                        <p className="text-[8px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-1">Density</p>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${region.coverage === 'High' ? 'text-emerald-500' : 'text-amber-500'}`}>{region.coverage}</span>
                     </div>
                     <button className="p-2 hover:bg-surface-container-low rounded-sm text-secondary/20 hover:text-secondary">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
