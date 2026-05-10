"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Lock, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#516169_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Header / Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Link href="/">
          <div className="relative w-48 h-12 bg-white/10 rounded flex items-center justify-center overflow-hidden">
            <Image
              src="/logo.webp"
              alt="Construction.lk Logo"
              fill
              className="object-contain opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </Link>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md text-center space-y-8"
        >
          {/* Icon Composition */}
          <div className="relative flex justify-center">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-red-50 rounded-2xl rotate-12 transition-transform hover:rotate-6 duration-700"></div>
                <div className="absolute inset-0 bg-red-100/50 rounded-2xl -rotate-6 transition-transform hover:rotate-0 duration-700"></div>
                <div className="relative w-20 h-20 bg-white rounded-xl shadow-2xl shadow-red-500/20 flex items-center justify-center border border-red-100">
                   <ShieldAlert className="w-10 h-10 text-red-600" />
                   <div className="absolute -top-1.5 -right-1.5">
                      <div className="bg-red-600 rounded-sm p-1 shadow-lg">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-3xl font-extrabold text-secondary tracking-tight uppercase">
              Access Restricted
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-surface-variant"></div>
              <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.3em]">
                Insufficient Clearance
              </p>
              <div className="h-px w-8 bg-surface-variant"></div>
            </div>
            <p className="text-secondary/50 font-medium text-sm max-w-[280px] mx-auto">
              You've encountered a secure area. Your current account profile does not have the required administrative permissions.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link href="/" className="w-full">
              <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-secondary/10 transition-all active:scale-[0.98] rounded-sm flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Return to Surface
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
               <Link href="/login" className="flex-1">
                 <Button variant="outline" className="w-full h-12 border-surface-variant hover:bg-surface-container-low font-black text-secondary text-[10px] uppercase tracking-widest rounded-sm flex items-center justify-center gap-2">
                   Switch Profile
                 </Button>
               </Link>
               <button 
                 onClick={() => window.history.back()}
                 className="h-12 px-6 border border-surface-variant hover:bg-surface-container-low font-black text-secondary text-[10px] uppercase tracking-widest rounded-sm transition-all"
               >
                 <ArrowLeft className="w-4 h-4" />
               </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-8 mt-auto relative z-10">
        <div className="flex flex-wrap gap-6 justify-center text-[8px] text-secondary/30 font-black uppercase tracking-[0.2em]">
          <span>© 2024 CONSTRUCTION.LK SECURITY PROTOCOL</span>
          <div className="flex gap-6">
            <Link href="/support" className="hover:text-secondary transition-all">Support Desk</Link>
            <Link href="/terms" className="hover:text-secondary transition-all">Compliance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
