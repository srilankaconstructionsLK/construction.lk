"use client";

import { motion } from "framer-motion";
import { 
  Grid, 
  Plus, 
  Layers, 
  Folder, 
  MoreVertical,
  Settings,
  Shield
} from "lucide-react";
import React from "react";

export default function CreateCategoryPage() {
  const categories = [
    { name: "Building Materials", sub: 24, status: "Active" },
    { name: "Heavy Machinery", sub: 12, status: "Active" },
    { name: "Consultancy Services", sub: 8, status: "Draft" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <div>
          <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Taxonomy & Categories</h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Configure industry classification and directory hierarchy</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg shadow-primary/20">
           <Plus className="w-3.5 h-3.5" />
           New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Tree View Placeholder */}
         <div className="lg:col-span-2 space-y-4">
            <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-4">Directory Hierarchy</h2>
            {categories.map((cat, i) => (
               <div key={i} className="bg-white border border-surface-variant p-4 rounded-md flex items-center justify-between hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-surface-container-low rounded-sm flex items-center justify-center border border-surface-variant">
                        <Folder className="w-5 h-5 text-secondary/30" />
                     </div>
                     <div>
                        <h3 className="text-[11px] font-black text-secondary uppercase tracking-tight">{cat.name}</h3>
                        <p className="text-[9px] text-secondary/40 font-bold uppercase tracking-widest mt-0.5">{cat.sub} Sub-categories</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={`px-2 py-0.5 rounded-sm border text-[8px] font-black uppercase tracking-widest ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        {cat.status}
                     </span>
                     <button className="p-1.5 hover:bg-surface-container-low rounded-sm text-secondary/20 hover:text-secondary transition-all">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Configuration Sidebar */}
         <div className="space-y-6">
            <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-4">Governance</h2>
            <div className="bg-white border border-surface-variant rounded-md p-6 space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 bg-amber-50 rounded-sm flex items-center justify-center shrink-0 border border-amber-100">
                     <Shield className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                     <h4 className="text-[9px] font-black text-secondary uppercase tracking-widest">Metadata Locking</h4>
                     <p className="text-[8px] text-secondary/40 font-bold uppercase tracking-widest mt-1">Prevent unauthorized taxonomy changes.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-sm flex items-center justify-center shrink-0 border border-blue-100">
                     <Layers className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                     <h4 className="text-[9px] font-black text-secondary uppercase tracking-widest">Global Sync</h4>
                     <p className="text-[8px] text-secondary/40 font-bold uppercase tracking-widest mt-1">Sync taxonomy with Algolia and Supabase.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
