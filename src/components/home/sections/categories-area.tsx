"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, 
  Megaphone, 
  UserCheck, 
  Sprout, 
  Car, 
  Baby, 
  Landmark, 
  Sparkles, 
  Wrench, 
  Monitor, 
  HardHat, 
  BarChart, 
  Globe, 
  ShoppingCart,
  Menu
} from 'lucide-react';

const categories = [
  { name: 'Advertising', icon: Megaphone, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Agent', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Agriculture', icon: Sprout, color: 'text-green-500', bg: 'bg-green-50' },
  { name: 'Automotive', icon: Car, color: 'text-red-500', bg: 'bg-red-50' },
  { name: 'Baby Goods', icon: Baby, color: 'text-pink-500', bg: 'bg-pink-50' },
  { name: 'Banking', icon: Landmark, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { name: 'Beauty', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: 'Cleaning', icon: Wrench, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { name: 'Computers', icon: Monitor, color: 'text-slate-700', bg: 'bg-slate-50' },
  { name: 'Construction', icon: HardHat, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Consultancy', icon: BarChart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Digital Marketing', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'E-commerce', icon: ShoppingCart, color: 'text-rose-500', bg: 'bg-rose-50' },
];

export function CategoriesArea() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-6">
        {categories.map((cat, i) => (
          <Link key={cat.name} href={`/search?category=${cat.name}`} className="group flex flex-col items-center text-center gap-4">
            <div className="w-full aspect-square bg-white border border-surface-variant rounded-md shadow-sm flex items-center justify-center p-6 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 ${cat.bg} rounded-full flex items-center justify-center`}>
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
              </div>
            </div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider leading-tight px-2 group-hover:text-primary-container transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
        
        {/* All Categories Button */}
        <Link href="/categories" className="group flex flex-col items-center text-center gap-4">
          <div className="w-full aspect-square bg-white border border-surface-variant rounded-md shadow-sm flex items-center justify-center p-6 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-[#336791] rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Menu className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider leading-tight px-2 group-hover:text-[#336791] transition-colors">
            All Categories
          </span>
        </Link>
      </div>
    </section>
  );
}
