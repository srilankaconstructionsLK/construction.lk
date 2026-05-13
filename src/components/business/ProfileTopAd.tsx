"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';

export const ProfileTopAd = () => {
  const { ads } = useSelector((state: RootState) => state.ads);
  
  // Get an ad with placement 'search_result_top_slider' or 'search_result_banner'
  const topAd = ads.find(ad => ad.placement === 'search_result_top_slider') || ads[0];

  if (!topAd) return null;

  return (
    <div className="w-full bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Link href={topAd.link} className="block relative w-full h-[60px] md:h-[90px] group">
          <Image 
            src={topAd.desktopImageUrl || topAd.imageUrl} 
            alt="Advertisement" 
            fill 
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-end px-4">
            <div className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-white/50 uppercase tracking-[0.2em] border border-white/10">
              Sponsored Ad
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
