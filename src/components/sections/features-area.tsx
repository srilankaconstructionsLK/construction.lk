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
    <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="bg-white border-none shadow-2xl shadow-secondary/10 p-8 hover:-translate-y-2 transition-transform duration-500">
            <div className="w-14 h-14 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
              <feature.icon className="w-7 h-7 text-primary-container" />
            </div>
            <h3 className="font-display font-bold text-lg mb-4 text-secondary uppercase tracking-wider">{feature.title}</h3>
            <p className="text-secondary/60 text-sm leading-relaxed">{feature.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
