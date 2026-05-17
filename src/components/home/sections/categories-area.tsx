// src/components/home/sections/categories-area.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Folder } from 'lucide-react';
import { Category } from '@/services/supabase/CategoryService';
import { AllCategoriesModal } from './all-categories-modal';

interface CategoriesAreaProps {
  categories: Category[];
}

/**
 * CategoriesArea displays the top-level categories fetched from the database.
 * This is a Server Component rendered on the Home Page (SSR/ISR).
 */
export function CategoriesArea({ categories }: CategoriesAreaProps) {
  // We only show root categories (parent_id is null) and limit to 20
  const rootCategories = categories
    .filter(cat => !cat.parent_id)
    .slice(0, 20);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-6">
        {rootCategories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/search?category=${encodeURIComponent(cat.name)}`} 
            className="group flex flex-col items-center text-center gap-4"
          >
            <div className="w-full aspect-square bg-white border border-surface-variant rounded-md shadow-sm flex items-center justify-center p-6 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center overflow-hidden relative">
                {cat.icon_url ? (
                  <Image 
                    src={cat.icon_url} 
                    alt={cat.name} 
                    fill 
                    className="object-contain p-2"
                    sizes="48px"
                    unoptimized
                  />
                ) : (
                  <Folder className="w-6 h-6 text-secondary/20" />
                )}
              </div>
            </div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider leading-tight px-2 group-hover:text-primary-container transition-colors line-clamp-2">
              {cat.name}
            </span>
          </Link>
        ))}
        
        {/* All Categories Button / Modal */}
        <AllCategoriesModal />
      </div>
    </section>
  );
}
