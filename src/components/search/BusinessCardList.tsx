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
  Send,
  Heart,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface BusinessCardListProps {
  item: {
    id: string;
    title: string;
    description: string;
    rating: number;
    review_count: number;
    verified: boolean;
    city: string;
    district: string;
    cida_grading: string;
    subscription_plan: string;
    image: string;
    tags: string[];
    category?: string;
  };
}

export const BusinessCardList = ({ item }: BusinessCardListProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/business/${item.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleNavigate}
      className="bg-white border border-surface-variant rounded-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-all duration-500 cursor-pointer"
    >
      {/* Left: Image Section */}
      <div className="relative w-full md:w-[320px] aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary/5">
        <Image 
          src={item.image} 
          alt={item.title} 
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
          className="absolute top-4 right-4 text-white/40 hover:text-red-500 transition-colors drop-shadow-md"
        >
          <Heart size={20} className="fill-transparent hover:fill-current" />
        </button>
      </div>

      {/* Right: Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-black text-secondary uppercase tracking-tight group-hover:text-primary-container transition-colors leading-none mb-3">
                {item.title}
              </h3>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold">
                <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded flex-shrink-0">
                  {item.rating} <Star className="w-3 h-3 ml-1 fill-current" />
                </div>
                <span className="text-secondary/60 uppercase tracking-widest">{item.review_count} Reviews</span>
                
                {item.verified && (
                  <div className="flex items-center text-blue-600 uppercase tracking-widest gap-1">
                    <BadgeCheck className="w-4 h-4" /> Verified
                  </div>
                )}
                
                <div className="flex items-center text-secondary/40 uppercase tracking-widest gap-1">
                  <Eye className="w-4 h-4" /> 42
                </div>
              </div>
            </div>
            
            <button 
              onClick={(e) => e.stopPropagation()}
              className="text-red-500"
            >
              <Heart size={20} className="fill-current" />
            </button>
          </div>

          {/* Breadcrumb / Category */}
          <div className="text-[10px] font-black uppercase tracking-widest text-primary-container flex items-center gap-2">
            <span>Industrial Service</span>
            <ChevronRight className="w-3 h-3" />
            <span>{item.tags[0] || 'Equipment'}</span>
          </div>

          {/* Address */}
          <div className="flex items-center text-xs font-bold text-secondary/60">
            <MapPin className="w-4 h-4 mr-2 text-primary-container flex-shrink-0" />
            <span className="uppercase tracking-widest">{item.city}, {item.district}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map(tag => (
              <span key={tag} className="text-[10px] font-black text-secondary/40 uppercase tracking-widest underline decoration-surface-variant underline-offset-4 hover:text-primary-container transition-colors">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
          <Button 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#00A859] hover:bg-[#008f4c] text-white font-black uppercase text-[11px] tracking-[0.2em] h-12 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call
          </Button>
          <Button 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#2D70E0] hover:bg-[#2563cc] text-white font-black uppercase text-[11px] tracking-[0.2em] h-12 rounded-sm shadow-sm transition-all"
          >
            Enquiry
          </Button>
          <Button 
            variant="outline" 
            onClick={(e) => e.stopPropagation()}
            className="border-surface-variant hover:border-green-500 text-secondary hover:text-green-600 font-black uppercase text-[11px] tracking-[0.2em] h-12 rounded-sm transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-green-500" /> Chat
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
