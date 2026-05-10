"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe,
  Settings as SettingsIcon,
  Save
} from "lucide-react";
import React from "react";

export default function SettingsPage() {
  const { user, profile } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-surface-variant pb-6">
            <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-primary-container" />
            </div>
            <div>
              <h1 className="text-lg font-black text-secondary uppercase tracking-tight">Account Settings</h1>
              <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest mt-1">Manage your industrial profile and security</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1 space-y-1">
              <SidebarItem icon={User} label="General" active />
              <SidebarItem icon={Shield} label="Security" />
              <SidebarItem icon={Bell} label="Notifications" />
              <SidebarItem icon={CreditCard} label="Billing" />
              <SidebarItem icon={Globe} label="Language" />
            </div>

            {/* Form Section */}
            <div className="md:col-span-3 space-y-6">
              <section className="bg-white border border-surface-variant rounded-md overflow-hidden">
                <div className="px-6 py-4 bg-surface-container-lowest border-b border-surface-variant">
                  <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Personal Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Full Name</label>
                      <Input defaultValue={profile?.name || user?.displayName || ""} className="h-10 text-xs font-bold uppercase tracking-wider" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Email Address</label>
                      <Input defaultValue={user?.email || ""} disabled className="h-10 text-xs font-bold uppercase tracking-wider bg-surface-container-lowest" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Bio / Professional Summary</label>
                    <textarea 
                      className="w-full min-h-[100px] bg-white border border-surface-variant rounded-md p-3 text-xs font-medium focus:ring-1 focus:ring-primary-container outline-none transition-all"
                      placeholder="Enter a brief summary about your professional background..."
                    ></textarea>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-surface-variant rounded-md overflow-hidden">
                <div className="px-6 py-4 bg-surface-container-lowest border-b border-surface-variant">
                  <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Security Protocol</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-md border border-surface-variant">
                    <div>
                      <h3 className="text-xs font-bold text-secondary uppercase tracking-wider">Two-Factor Authentication</h3>
                      <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mt-1">Level 2 security active</p>
                    </div>
                    <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest">Configure</Button>
                  </div>
                </div>
              </section>

              <div className="flex justify-end">
                <Button className="h-10 px-6 bg-primary-container hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary-container/20 transition-all active:scale-[0.98] rounded-sm flex items-center gap-2">
                  <Save className="w-3 h-3" />
                  Synchronize Updates
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all group ${active ? 'bg-secondary text-white shadow-lg' : 'hover:bg-surface-container-low text-secondary/60 hover:text-secondary'}`}>
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-secondary/40 group-hover:text-secondary'}`} />
      <span className="text-[10px] font-black uppercase tracking-[0.15em]">{label}</span>
    </button>
  );
}
