"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function ActionBannerArea() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
      <div className="bg-secondary rounded-sm overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center border border-surface-variant shadow-2xl">
        <Image 
          src="/images/hero.png" 
          alt="Structural Engineering" 
          fill
          className="absolute inset-0 object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-transparent"></div>
        <div className="relative z-10 space-y-10 max-w-3xl">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-1 bg-primary-container"></div>
             <span className="text-primary-container font-black uppercase tracking-[0.4em] text-[10px]">Future-Proof Your Supply Chain</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white font-display leading-[1.1] uppercase tracking-tight">
            Ready to streamline your <span className="text-primary-container">procurement?</span>
          </h2>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] max-w-xl mx-auto">Join thousands of verified construction professionals in Sri Lanka's most advanced B2B network.</p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Button className="bg-primary-container hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] px-12 h-14 rounded-sm shadow-xl shadow-primary-container/20 transition-all active:scale-[0.98]">
              Register as Buyer
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] px-12 h-14 rounded-sm backdrop-blur-md">
              Partner with Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
