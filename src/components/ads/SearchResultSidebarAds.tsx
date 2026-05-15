"use client";

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SearchResultSidebarAdsProps {
  categoryId?: string;
}

export const SearchResultSidebarAds = ({ categoryId }: SearchResultSidebarAdsProps) => {
  const { ads } = useAppSelector((state) => state.ads);

  const filteredAds = ads.filter(ad => 
    ad.placement === 'search_result_banner' && 
    (!categoryId || ad.categoryId === categoryId)
  );

  if (filteredAds.length === 0) return null;

  return (
    <div className="space-y-4">
      {filteredAds.map((ad, idx) => (
        <motion.div
          key={ad.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative aspect-square w-full rounded-xl overflow-hidden border border-surface-variant cursor-pointer group shadow-sm hover:shadow-md transition-all"
          onClick={() => ad.link && window.open(ad.link, '_blank')}
        >
          <Image
            src={ad.imageUrl}
            alt="Advertisement"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 bg-secondary/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
            AD
          </div>
        </motion.div>
      ))}
    </div>
  );
};
