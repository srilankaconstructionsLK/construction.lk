"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  Download, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import React from "react";

export default function PaymentsPage() {
  const transactions = [
    { id: "TXN-99812", client: "Apex Steel Ltd", plan: "Pro Directory", date: "2024-05-10", amount: "LKR 45,000", status: "Paid" },
    { id: "TXN-99813", client: "Senu Logistics", plan: "Standard Ad", date: "2024-05-09", amount: "LKR 12,500", status: "Pending" },
    { id: "TXN-99814", client: "Global Build Corp", plan: "Verified Badge", date: "2024-05-08", amount: "LKR 5,000", status: "Failed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <div>
          <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Financial Operations</h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Transaction history and revenue reconciliation</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
           <Download className="w-3.5 h-3.5" />
           Financial Report
        </button>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-surface-variant rounded-md overflow-hidden">
         <div className="p-4 bg-surface-container-low border-b border-surface-variant flex justify-between items-center">
            <h2 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Live Transaction Ledger</h2>
            <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-secondary/30" />
               <input 
                  type="text" 
                  placeholder="Search by ID or client..." 
                  className="w-full h-8 pl-9 pr-4 bg-white border border-surface-variant rounded-sm text-[9px] font-bold uppercase tracking-wider outline-none focus:ring-1 focus:ring-secondary transition-all"
               />
            </div>
         </div>
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-surface-container-lowest border-b border-surface-variant">
                  <th className="px-6 py-3 text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Transaction ID</th>
                  <th className="px-6 py-3 text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Client Account</th>
                  <th className="px-6 py-3 text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Product / Plan</th>
                  <th className="px-6 py-3 text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Settlement Date</th>
                  <th className="px-6 py-3 text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Amount</th>
                  <th className="px-6 py-3 text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant">
               {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-container-low/50 transition-colors">
                     <td className="px-6 py-4">
                        <span className="text-[9px] font-black text-secondary tracking-widest">{t.id}</span>
                     </td>
                     <td className="px-6 py-4">
                        <h3 className="text-[10px] font-bold text-secondary uppercase tracking-tight">{t.client}</h3>
                     </td>
                     <td className="px-6 py-4">
                        <span className="text-[9px] font-bold text-secondary/50 uppercase tracking-widest">{t.plan}</span>
                     </td>
                     <td className="px-6 py-4">
                        <span className="text-[9px] font-mono font-bold text-secondary/40">{t.date}</span>
                     </td>
                     <td className="px-6 py-4">
                        <span className="text-[10px] font-black text-secondary tracking-widest">{t.amount}</span>
                     </td>
                     <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-[8px] font-black uppercase tracking-widest ${
                           t.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                           t.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                           'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                           {t.status === 'Paid' ? <CheckCircle2 className="w-2.5 h-2.5" /> : t.status === 'Pending' ? <Clock className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
                           {t.status}
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
