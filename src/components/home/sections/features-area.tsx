"use client";

import React from 'react';
import { ShieldCheck, Zap, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  { icon: ShieldCheck, title: "Verified Suppliers", desc: "Every business profile is manually vetted for CIDA grading and registration." },
  { icon: Zap, title: "Direct RFQ System", desc: "Request quotes directly from multiple suppliers in a single click." },
  { icon: Globe, title: "Island-wide Network", desc: "Sourcing capabilities spanning across all 9 provinces of Sri Lanka." },
];

export function FeaturesArea() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="bg-white border border-surface-variant rounded-sm p-10 hover:border-primary-container transition-all duration-500 shadow-xl shadow-secondary/5 group">
            <div className="w-12 h-12 bg-secondary/5 rounded-sm flex items-center justify-center mb-8 group-hover:bg-primary-container transition-colors">
              <feature.icon className="w-6 h-6 text-primary-container group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-display font-black text-xs mb-4 text-secondary uppercase tracking-[0.2em]">{feature.title}</h3>
            <p className="text-secondary/50 text-[11px] leading-relaxed font-bold uppercase tracking-widest">{feature.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
