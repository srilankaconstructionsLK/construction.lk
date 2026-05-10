"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <section className="bg-surface-container-low mt-32 py-32 border-y border-surface-variant">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-20">
          <span className="text-primary-container font-bold uppercase tracking-[0.3em] text-[10px]">Verified Network</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-secondary tracking-tight">Premier Industrial Partners</h2>
          <div className="w-16 h-1 bg-primary-container mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {suppliers.map((supplier, i) => (
            <Card key={i} className="bg-white border border-surface-variant p-10 group hover:border-primary-container transition-all">
              <div className="flex justify-center mb-10">
                <div className={`w-20 h-20 ${supplier.color} rounded-md flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-black/10 group-hover:-translate-y-2 transition-transform`}>
                  {supplier.logo}
                </div>
              </div>
              <h3 className="font-bold text-center mb-4 text-secondary text-lg uppercase tracking-tight">{supplier.name}</h3>
              <p className="text-xs text-secondary/50 text-center mb-10 line-clamp-3 leading-relaxed">
                {supplier.desc}
              </p>
              <Link href="/profile">
                <Button variant="outline" className="w-full border-surface-variant text-secondary font-bold uppercase tracking-widest text-[10px] h-12 group-hover:bg-primary-container group-hover:border-primary-container group-hover:text-white transition-all">
                  View Capability Profile
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
