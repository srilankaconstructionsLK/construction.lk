"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Building2, HardHat, Drill, Zap, Truck, Warehouse } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Structural Steel', icon: Building2, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600' },
  { name: 'Heavy Machinery', icon: HardHat, image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600' },
  { name: 'Power Tools', icon: Drill, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600' },
  { name: 'Electrical Systems', icon: Zap, image: 'https://images.unsplash.com/photo-1621905235285-645395697330?auto=format&fit=crop&q=80&w=600' },
  { name: 'Logistics & Transport', icon: Truck, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Storage & Warehousing', icon: Warehouse, image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=600' },
];

export function CategoriesArea() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-1 bg-primary-container"></div>
            <span className="text-primary-container font-black uppercase tracking-[0.3em] text-[9px]">Industrial Ecosystem</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-display text-secondary uppercase tracking-tight">Supply Chain Sectors</h2>
          <p className="text-secondary/40 text-[11px] font-bold uppercase tracking-widest mt-2">Specialized procurement categories for high-scale development</p>
        </div>
        <Link 
          href="/search" 
          className="group flex items-center gap-3 bg-white border border-surface-variant px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:border-primary-container hover:text-primary-container transition-all shadow-sm"
        >
          Explore Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/search?category=${cat.name}`}>
              <Card className="group relative aspect-[4/5] overflow-hidden cursor-pointer border-surface-variant rounded-sm hover:border-primary-container transition-all duration-500">
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-sm flex items-center justify-center border border-white/10 group-hover:bg-primary-container group-hover:border-primary-container transition-colors">
                    <cat.icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <p className="text-[9px] font-black text-primary-container uppercase tracking-[0.2em] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Sourcing Now</p>
                  <h3 className="text-white font-black text-[11px] uppercase tracking-[0.15em] leading-tight">
                    {cat.name}
                  </h3>
                  <div className="w-6 h-0.5 bg-primary-container mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
