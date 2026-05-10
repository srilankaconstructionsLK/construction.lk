"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Search, 
  User, 
  Clock, 
  MessageSquare, 
  MoreVertical,
  Reply,
  Star
} from "lucide-react";
import React from "react";

export default function MessagesPage() {
  const inbox = [
    { id: 1, sender: "Amal Perera", subject: "Inquiry regarding steel supply", preview: "I am looking for a reliable supplier for 500 tons of rebars...", time: "10m ago", read: false },
    { id: 2, sender: "Construction Co.", subject: "Tender update for Port City", preview: "The tender deadline has been extended by two weeks...", time: "2h ago", read: true },
    { id: 3, sender: "Senu Logistics", subject: "Booking confirmation", preview: "Your booking for the heavy crane has been confirmed...", time: "1d ago", read: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <div>
          <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Communications Hub</h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Manage user inquiries and system notifications</p>
        </div>
        <div className="flex gap-2">
           <button className="px-3 py-1.5 bg-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-sm">Archive All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)]">
         {/* Inbox Sidebar */}
         <div className="lg:col-span-4 bg-white border border-surface-variant rounded-md flex flex-col overflow-hidden">
            <div className="p-4 border-b border-surface-variant bg-surface-container-low">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary/30" />
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    className="w-full h-9 pl-10 pr-4 bg-white border border-surface-variant rounded-sm text-[10px] font-bold uppercase tracking-wider outline-none"
                  />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-surface-variant">
               {inbox.map((msg) => (
                  <div key={msg.id} className={`p-4 hover:bg-surface-container-low cursor-pointer transition-colors ${!msg.read ? 'bg-primary/5' : ''}`}>
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-[11px] font-black text-secondary uppercase tracking-tight">{msg.sender}</span>
                        <span className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest">{msg.time}</span>
                     </div>
                     <h3 className={`text-[10px] uppercase tracking-tight mb-1 ${!msg.read ? 'font-black text-secondary' : 'font-bold text-secondary/60'}`}>{msg.subject}</h3>
                     <p className="text-[9px] text-secondary/40 font-medium line-clamp-1">{msg.preview}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Message View Placeholder */}
         <div className="lg:col-span-8 bg-white border border-surface-variant rounded-md flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
               <MessageSquare className="w-8 h-8 text-secondary/20" />
            </div>
            <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Select a Message</h2>
            <p className="text-[9px] text-secondary/40 font-bold uppercase tracking-widest mt-2">Choose a communication thread from the left to view details</p>
         </div>
      </div>
    </div>
  );
}
