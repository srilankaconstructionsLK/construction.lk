"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function ActionBannerArea() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
      <div className="bg-secondary rounded-xl overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center">
        <Image 
          src="/images/hero.png" 
          alt="Structural Engineering" 
          fill
          className="absolute inset-0 object-cover opacity-20"
        />
        <div className="relative z-10 space-y-8 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white font-display leading-tight">Ready to streamline your <span className="text-primary-container">procurement?</span></h2>
          <p className="text-white/60 text-lg">Join thousands of verified construction professionals in Sri Lanka's most advanced B2B network.</p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Button className="bg-primary-container hover:bg-primary text-white font-bold uppercase tracking-widest px-12 h-16 rounded-md">Register as Buyer</Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest px-12 h-16 rounded-md">Partner with Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
