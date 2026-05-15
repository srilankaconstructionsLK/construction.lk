// src/components/business/BusinessCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  BadgeCheck, 
  Phone, 
  MessageSquare, 
  ChevronRight,
  ChevronLeft,
  Heart,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  business: {
    id: string;
    title: string;
    description?: string;
    rating: number;
    review_count: number;
    verified?: boolean;
    city: string;
    district: string;
    cida_grading?: string;
    subscription_plan?: string;
    image: string;
    tags: string[];
    category?: string;
  };
  variant?: 'grid' | 'list';
}

export default function BusinessCard({ business, variant = 'grid' }: BusinessCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/business/${business.id}`);
  };

  const isList = variant === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleNavigate}
      className={cn(
        "bg-white border border-surface-variant rounded-sm overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer",
        isList ? "flex flex-col md:flex-row" : "flex flex-col"
      )}
    >
      {/* Image Section */}
      <div className={cn(
        "relative overflow-hidden bg-secondary/5",
        isList ? "w-full md:w-[320px] aspect-[4/3] md:aspect-auto" : "w-full aspect-[16/10]"
      )}>
        <Image 
          src={business.image || "https://via.placeholder.com/400x250?text=Construction.lk"} 
          alt={business.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Image Controls (Mock) */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 text-white/40 hover:text-red-500 transition-colors drop-shadow-md z-10"
        >
          <Heart size={20} className="fill-transparent hover:fill-current" />
        </button>

        {/* Status Badges (Grid only) */}
        {!isList && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {business.subscription_plan === 'enterprise' && (
              <div className="bg-primary-container text-white px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center">
                <BadgeCheck className="w-3.5 h-3.5 mr-1.5" /> Enterprise Partner
              </div>
            )}
            {business.verified && (
              <div className="bg-white/90 backdrop-blur-md text-secondary px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center w-fit">
                <BadgeCheck className="w-3.5 h-3.5 mr-1.5 text-primary-container" /> Verified
              </div>
            )}
          </div>
        )}

        {/* CIDA Badge (Grid only) */}
        {!isList && business.cida_grading && (
          <div className="absolute top-4 right-4 bg-secondary text-primary-container px-3 py-1.5 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-lg border border-primary-container/20 z-10">
            CIDA {business.cida_grading}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                "font-black text-secondary uppercase tracking-tight group-hover:text-primary-container transition-colors leading-none mb-3",
                isList ? "text-xl" : "text-base line-clamp-1"
              )}>
                {business.title}
              </h3>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black">
                <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded flex-shrink-0">
                  {business.rating} <Star className="w-3 h-3 ml-1 fill-current" />
                </div>
                <span className="text-secondary/60 uppercase tracking-widest">{business.review_count} Reviews</span>
                
                {business.verified && (
                  <div className="flex items-center text-blue-600 uppercase tracking-widest gap-1">
                    <BadgeCheck className="w-4 h-4" /> Verified
                  </div>
                )}
                
                <div className="flex items-center text-secondary/40 uppercase tracking-widest gap-1">
                  <Eye className="w-4 h-4" /> 42
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumb / Category */}
          <div className="text-[9px] font-black uppercase tracking-[0.15em] text-primary-container flex items-center gap-2">
            <span>{business.category || 'Industrial Service'}</span>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="text-secondary/40">{business.tags?.[0] || 'Equipment'}</span>
          </div>

          {/* Address */}
          <div className="flex items-center text-[10px] font-bold text-secondary/60">
            <MapPin className="w-3.5 h-3.5 mr-2 text-primary-container flex-shrink-0" />
            <span className="uppercase tracking-[0.1em]">{business.city}, {business.district}</span>
          </div>

          {/* Tags (Only in List variant for now) */}
          {isList && business.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {business.tags.map(tag => (
                <span key={tag} className="text-[9px] font-black text-secondary/30 uppercase tracking-widest underline decoration-surface-variant underline-offset-4 hover:text-primary-container transition-colors">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons (Full Grid in List, Simplified in Grid) */}
        <div className={cn(
          "gap-3 mt-6",
          isList ? "grid grid-cols-1 md:grid-cols-3" : "flex items-center"
        )}>
          <Button 
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "bg-[#00A859] hover:bg-[#008f4c] text-white font-black uppercase text-[10px] tracking-[0.15em] h-11 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2",
              isList ? "w-full" : "flex-1"
            )}
          >
            <Phone className="w-3.5 h-3.5" /> Call
          </Button>
          
          {isList ? (
            <>
              <Button 
                onClick={(e) => e.stopPropagation()}
                className="bg-[#2D70E0] hover:bg-[#2563cc] text-white font-black uppercase text-[10px] tracking-[0.15em] h-11 rounded-sm shadow-sm transition-all"
              >
                Enquiry
              </Button>
              <Button 
                variant="outline" 
                onClick={(e) => e.stopPropagation()}
                className="border-surface-variant hover:border-green-500 text-secondary hover:text-green-600 font-black uppercase text-[10px] tracking-[0.15em] h-11 rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-500" /> Chat
              </Button>
            </>
          ) : (
            <Button 
              variant="outline"
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 p-0 border-surface-variant flex items-center justify-center rounded-sm"
            >
              <MessageSquare className="w-4 h-4 text-secondary/40" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
