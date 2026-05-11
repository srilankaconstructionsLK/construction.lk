"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const suppliers = [
  { 
    name: 'Apex Construction Solutions', 
    logo: 'A', 
    desc: 'CIDA Grade CS2 verified leader in heavy machinery and structural materials sourcing.', 
    color: 'bg-primary-container' 
  },
  { 
    name: 'Global Build Corp', 
    logo: 'G', 
    desc: 'International standards for construction management and industrial logistics.', 
    color: 'bg-secondary' 
  },
  { 
    name: 'Master Concrete Pvt Ltd', 
    logo: 'M', 
    desc: 'Premium concrete solutions and prefabricated structures for large scale developments.', 
    color: 'bg-on-surface' 
  },
  { 
    name: 'Steel Dynamics SL', 
    logo: 'S', 
    desc: 'Leading supplier of high-tensile structural steel and fabrication services.', 
    color: 'bg-outline' 
  },
];

export function SuppliersArea() {
  return (
    <section className="bg-white mt-24 py-24 border-y border-surface-variant relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-1 bg-primary-container"></div>
              <span className="text-primary-container font-black uppercase tracking-[0.3em] text-[9px]">Verified Network</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-display text-secondary uppercase tracking-tight">Strategic Partners</h2>
            <p className="text-secondary/40 text-[11px] font-bold uppercase tracking-widest">Premium industrial suppliers with certified capabilities</p>
          </div>
          <Button variant="outline" className="border-surface-variant text-secondary font-black uppercase tracking-widest text-[9px] h-12 rounded-sm hover:border-primary-container hover:text-primary-container">
            Become a Partner
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.map((supplier, i) => (
            <Card key={i} className="bg-white border border-surface-variant rounded-sm p-8 group hover:border-primary-container transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 ${supplier.color} rounded-sm flex items-center justify-center text-white text-xl font-black shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-110`}>
                  {supplier.logo}
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
                </div>
              </div>
              <h3 className="font-black mb-3 text-secondary text-[13px] uppercase tracking-tight leading-tight group-hover:text-primary-container transition-colors">{supplier.name}</h3>
              <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-10 line-clamp-3 leading-relaxed">
                {supplier.desc}
              </p>
              <Link href="/profile" className="block mt-auto">
                <Button variant="ghost" className="w-full justify-between px-0 text-secondary hover:text-primary-container hover:bg-transparent group/btn transition-all">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Capability Profile</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
