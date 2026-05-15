"use client";

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';

export const BusinessProfileSideAd = () => {
  const { ads } = useAppSelector((state) => state.ads);
  
  // Find a relevant side ad for the business profile page
  const sideAd = ads.find(ad => ad.placement === 'business_profile_side_ad');

  if (!sideAd) return null;

  return (
    <div className="w-full bg-white border border-surface-variant rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-surface-variant/50 flex justify-between items-center bg-surface/30">
        <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Sponsored Ad</span>
        <div className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
      </div>
      <Link href={sideAd.link} className="block relative aspect-[3/4] w-full group">
        <Image 
          src={sideAd.imageUrl} 
          alt="Sponsored Advertisement" 
          fill 
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>
    </div>
  );
};
