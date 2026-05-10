"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Structural Steel', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200' },
  { name: 'Heavy Machinery', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=200' },
  { name: 'Electrical Systems', image: 'https://images.unsplash.com/photo-1621905235285-645395697330?auto=format&fit=crop&q=80&w=200' },
  { name: 'HVAC Solutions', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200' },
  { name: 'Civil Engineering', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=200' },
  { name: 'Interior & Fit-out', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200' },
];

export function CategoriesArea() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4">
          <div className="w-12 h-1 bg-primary-container"></div>
          <h2 className="text-4xl font-extrabold font-display text-secondary tracking-tight">Industrial Ecosystem</h2>
          <p className="text-secondary/50 text-sm max-w-md">Comprehensive sourcing categories for heavy industrial and commercial development.</p>
        </div>
        <Link href="/search" className="text-xs font-bold uppercase tracking-widest text-primary-container hover:underline flex items-center gap-2 group">
          Explore All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group relative aspect-square overflow-hidden cursor-pointer border-none shadow-sm hover:shadow-xl transition-all">
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest leading-snug">
                  {cat.name}
                </h3>
                <div className="w-0 group-hover:w-8 h-0.5 bg-primary-container mt-3 transition-all duration-300"></div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
