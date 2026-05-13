"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchResultCarouselProps {
  categoryId?: string;
}

export const SearchResultCarousel = ({ categoryId }: SearchResultCarouselProps) => {
  const { ads } = useSelector((state: RootState) => state.ads);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredAds = ads.filter(ad => 
    ad.placement === 'search_result_top_slider' && 
    (!categoryId || ad.categoryId === categoryId)
  );

  useEffect(() => {
    if (filteredAds.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredAds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredAds.length]);

  if (filteredAds.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredAds.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredAds.length) % filteredAds.length);
  };

  const currentAd = filteredAds[currentIndex];

  return (
    <div className="relative w-full group overflow-hidden bg-secondary/5 border-y border-surface-variant">
      <div className="max-w-7xl mx-auto relative aspect-[16/5] md:aspect-[16/3]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 cursor-pointer"
            onClick={() => currentAd.link && window.open(currentAd.link, '_blank')}
          >
            {/* Desktop Image */}
            <Image
              src={currentAd.desktopImageUrl || currentAd.imageUrl}
              alt="Advertisement"
              fill
              className="hidden md:block object-cover object-top"
              priority
              unoptimized
            />
            {/* Mobile Image */}
            <Image
              src={currentAd.imageUrl}
              alt="Advertisement"
              fill
              className="block md:hidden object-cover"
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        {filteredAds.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {filteredAds.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? "bg-primary-container w-4" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
