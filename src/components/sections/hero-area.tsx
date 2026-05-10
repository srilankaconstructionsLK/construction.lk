"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const stats = [
  { label: 'Verified Suppliers', value: '2,500+' },
  { label: 'Active Projects', value: '450+' },
  { label: 'Materials Listed', value: '15,000+' },
  { label: 'Industry Support', value: '24/7' },
];

export function HeroArea() {
  return (
    <section className="relative h-[700px] overflow-hidden bg-secondary">
      <Image 
        src="/images/hero.png" 
        alt="Construction Site" 
        fill
        className="absolute inset-0 object-cover opacity-40 mix-blend-overlay"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1.5 bg-primary-container"></div>
            <span className="text-primary-container font-bold uppercase tracking-[0.2em] text-[10px]">Industrial Integrity Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] font-display">
            Building the Future with <span className="text-primary-container">Verified Precision.</span>
          </h1>
          <p className="text-on-secondary/70 text-xl mb-10 max-w-xl leading-relaxed">
            Connect with CIDA-graded suppliers, manage large-scale procurement, and execute projects with confidence on Sri Lanka's premier construction B2B network.
          </p>
          <div className="flex flex-wrap gap-5">
            <Button className="bg-primary-container hover:bg-primary text-white text-sm font-bold uppercase tracking-widest px-10 h-16 rounded-md shadow-xl transition-all hover:-translate-y-1">
              Start Sourcing Now
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm font-bold uppercase tracking-widest px-10 h-16 rounded-md backdrop-blur-sm">
              <Play className="w-4 h-4 mr-3 fill-white" /> View Platform Tour
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Quick Stats Overlay */}
      <div className="absolute bottom-0 right-0 left-0 bg-white/5 backdrop-blur-xl border-t border-white/10 py-8 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="border-r border-white/10 last:border-none px-4">
              <p className="text-primary-container font-extrabold text-2xl mb-1">{stat.value}</p>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
