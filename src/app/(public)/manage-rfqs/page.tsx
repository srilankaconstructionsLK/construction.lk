"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  FileText
} from "lucide-react";
import React from "react";

export default function ManageRFQsPage() {
  const rfqs = [
    { id: "RFQ-2024-001", title: "Reinforcement Steel Bars - 500 Tons", date: "2024-05-10", status: "Active", bids: 12, value: "LKR 4.2M" },
    { id: "RFQ-2024-002", title: "Ready-Mix Concrete Grade 30", date: "2024-05-08", status: "Pending", bids: 4, value: "LKR 1.8M" },
    { id: "RFQ-2024-003", title: "Cabling and Electrical Fixtures", date: "2024-05-05", status: "Closed", bids: 28, value: "LKR 0.9M" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-variant pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/5 rounded-md flex items-center justify-center border border-secondary/10">
                <Briefcase className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Request for Quotations</h1>
                <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest mt-1">Manage industrial procurement and active bids</p>
              </div>
            </div>
            <Button className="h-10 px-6 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-secondary/10 transition-all active:scale-[0.98] rounded-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Procurement
            </Button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-md border border-surface-variant">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/30" />
                <input 
                  type="text" 
                  placeholder="Search RFQs by ID or Title..." 
                  className="w-full h-10 pl-10 pr-4 bg-white border border-surface-variant rounded-sm text-[10px] font-bold uppercase tracking-wider outline-none focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>
              <Button variant="outline" className="h-10 px-4 border-surface-variant flex items-center gap-2">
                <Filter className="w-4 h-4 text-secondary/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Filters</span>
              </Button>
            </div>
            <div className="flex gap-2">
               <StatusFilter label="All" count={42} active />
               <StatusFilter label="Active" count={12} />
               <StatusFilter label="Pending" count={4} />
               <StatusFilter label="Closed" count={26} />
            </div>
          </div>

          {/* Table / List */}
          <div className="bg-white border border-surface-variant rounded-md overflow-hidden">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-surface-container-lowest border-b border-surface-variant">
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Procurement ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Project / Title</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Timeline</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Bids</th>
                      <th className="px-6 py-4 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Est. Value</th>
                      <th className="px-6 py-4"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant">
                   {rfqs.map((rfq) => (
                      <tr key={rfq.id} className="hover:bg-surface-container-lowest transition-colors group">
                         <td className="px-6 py-5">
                            <span className="text-[10px] font-black text-secondary tracking-widest">{rfq.id}</span>
                         </td>
                         <td className="px-6 py-5">
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-tight">{rfq.title}</h3>
                         </td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-secondary/50">
                               <Clock className="w-3 h-3" />
                               <span>{rfq.date}</span>
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <StatusBadge status={rfq.status} />
                         </td>
                         <td className="px-6 py-5">
                            <span className="text-[10px] font-black text-secondary tracking-widest">{rfq.bids}</span>
                         </td>
                         <td className="px-6 py-5">
                            <span className="text-[10px] font-black text-secondary tracking-widest">{rfq.value}</span>
                         </td>
                         <td className="px-6 py-5 text-right">
                            <button className="p-2 hover:bg-surface-variant rounded-sm transition-colors">
                               <MoreVertical className="w-4 h-4 text-secondary/40" />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          {/* Empty State / Bottom Info */}
          <div className="flex items-center justify-between p-6 bg-secondary/5 rounded-md border border-secondary/10">
             <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-secondary/20" />
                <div>
                   <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Generating Weekly Report...</p>
                   <p className="text-[9px] text-secondary/40 font-bold uppercase tracking-widest mt-1">Next synchronization in 4 hours</p>
                </div>
             </div>
             <Button variant="outline" className="h-9 px-4 border-secondary/20 text-secondary text-[9px] font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                Download Inventory PDF
             </Button>
          </div>
        </motion.div>
    </div>
  );
}

function StatusFilter({ label, count, active = false }: { label: string; count: number; active?: boolean }) {
  return (
    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all ${active ? 'bg-secondary text-white' : 'bg-white border border-surface-variant text-secondary/60 hover:border-secondary'}`}>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-surface-container-low text-secondary/40'}`}>{count}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    "Active": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Pending": "bg-amber-50 text-amber-600 border-amber-100",
    "Closed": "bg-slate-50 text-slate-400 border-slate-200",
  }[status] || "bg-slate-50 text-slate-400 border-slate-200";

  const Icon = {
    "Active": CheckCircle2,
    "Pending": AlertCircle,
    "Closed": Clock,
  }[status] || Clock;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border text-[9px] font-black uppercase tracking-widest ${styles}`}>
      <Icon className="w-3 h-3" />
      {status}
    </div>
  );
}
