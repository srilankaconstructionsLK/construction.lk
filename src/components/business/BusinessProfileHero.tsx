"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface BusinessProfileHeroProps {
  gallery: string[];
}

export const BusinessProfileHero = ({ gallery }: BusinessProfileHeroProps) => {
  const { ads } = useSelector((state: RootState) => state.ads);
  const cover = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";
  
  // Find a relevant ad
  const topAd = ads.find(ad => ad.placement === 'search_result_top_slider') || ads[0];

  // Combine ads and gallery for a single slider experience
  // If there's a top ad, we can put it first, then the gallery images
  const slides = [
    ...(topAd ? [{ id: 'ad', imageUrl: topAd.desktopImageUrl || topAd.imageUrl, link: topAd.link, isAd: true }] : []),
    ...gallery.map((img, i) => ({ id: `img-${i}`, imageUrl: img, link: null, isAd: false }))
  ];

  if (slides.length === 0) return null;

  return (
    <div className="w-full bg-secondary relative group overflow-hidden h-[300px] md:h-[400px]">
      <Carousel
        showStatus={false}
        autoPlay
        interval={5000}
        infiniteLoop
        showArrows={true}
        stopOnHover={true}
        showIndicators={true}
        showThumbs={false}
        className="h-full"
        renderArrowPrev={(clickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={clickHandler}
              className="absolute z-10 top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
          )
        }
        renderArrowNext={(clickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={clickHandler}
              className="absolute z-10 top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          )
        }
      >
        {slides.map((slide, idx) => (
          <div key={slide.id} className="relative w-full h-[300px] md:h-[400px] bg-[#1e293b]">
            {/* Slide Label Overlay */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
                {slide.isAd ? "Sponsored Advertisement" : "Business Gallery"}
              </span>
            </div>

            {slide.link ? (
              <Link href={slide.link} className="block w-full h-full relative">
                <Image 
                  src={slide.imageUrl || cover} 
                  alt={slide.isAd ? "Sponsored Advertisement" : "Business Gallery"} 
                  fill 
                  unoptimized
                  priority={idx === 0}
                  className="object-cover opacity-80"
                />
                {slide.isAd && (
                  <div className="absolute top-4 right-12 bg-[#00a651] px-3 py-1 rounded text-[10px] font-black text-white uppercase tracking-[0.2em] z-20">
                    AD
                  </div>
                )}
              </Link>
            ) : (
              <Image 
                src={slide.imageUrl || cover} 
                alt="Business Gallery" 
                fill 
                unoptimized
                priority={idx === 0}
                className="object-cover opacity-80"
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
