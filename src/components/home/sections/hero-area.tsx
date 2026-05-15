"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLocationPickerOpen } from '@/redux/slices/uiSlice';
import { setQuery } from '@/redux/slices/searchSlice';
import { useRouter } from 'next/navigation';

const popularSearches = [
  "Structural Steel", "Ready-Mix Concrete", "Excavators", "Electrical Cables", "CIDA Contractors"
];

export function HeroArea() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedLocation: location } = useAppSelector((state) => state.location);
  const { query } = useAppSelector((state) => state.search);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location && location !== 'All Sri Lanka') params.set('location', location);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative h-[650px] md:h-[750px] overflow-hidden bg-secondary">
      {/* Background Image with Dark Overlay */}
      <Image 
        src="/images/hero.png" 
        alt="Construction Site" 
        fill
        className="absolute inset-0 object-cover opacity-30 mix-blend-overlay scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/80 to-secondary" />
      
      {/* Centered Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Tagline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-primary-container/50"></div>
            <span className="text-primary-container font-black uppercase tracking-[0.4em] text-[10px]">Industrial Sourcing Engine</span>
            <div className="w-8 h-px bg-primary-container/50"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.05] font-display uppercase tracking-tighter">
            Source with <span className="text-primary-container underline decoration-primary-container/30 underline-offset-8">Precision</span>. Build with Confidence.
          </h1>
          
          {/* Subtext */}
          <p className="text-on-secondary/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Access Sri Lanka's largest network of verified industrial suppliers and construction materials.
          </p>

          {/* Middle Search Area */}
          <div className="relative w-full max-w-4xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container/20 to-primary/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-2xl">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="bg-white rounded-lg flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-surface-variant overflow-hidden"
              >
                
                {/* Search Input */}
                <div className="flex-1 flex items-center px-6 py-4 md:py-0 min-h-[64px]">
                  <Search className="w-5 h-5 text-outline mr-4 flex-shrink-0" />
                  <Input 
                    type="text"
                    value={query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                    placeholder="Search materials, machinery, suppliers..." 
                    className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm font-semibold text-secondary placeholder:text-secondary/40 h-full p-0"
                  />
                </div>

                {/* Location Selector */}
                <div 
                  onClick={() => dispatch(setLocationPickerOpen(true))}
                  className="w-full md:w-64 flex items-center px-6 py-4 md:py-0 cursor-pointer hover:bg-surface-variant/30 transition-colors min-h-[64px]"
                >
                  <MapPin className="w-5 h-5 text-outline mr-4 flex-shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Location</span>
                    <span className="text-xs font-bold text-secondary flex items-center truncate max-w-[140px]">
                      {location} <ChevronDown className="w-3 h-3 ml-2 text-primary-container shrink-0" />
                    </span>
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  type="submit"
                  className="w-full md:w-auto px-12 h-[64px] rounded-none bg-primary-container hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-none transition-all active:scale-[0.98]"
                >
                  Find Now
                </Button>
              </form>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Trending:</span>
            {popularSearches.map((tag) => (
              <button 
                key={tag}
                className="text-[11px] font-bold text-on-secondary/50 hover:text-primary-container transition-colors uppercase tracking-widest"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />

    </section>
  );
}
