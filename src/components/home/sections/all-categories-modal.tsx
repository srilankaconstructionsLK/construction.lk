"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
import { Menu, ChevronRight, FolderTree } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AllCategoriesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useAppSelector(state => state.category.items);
  
  // Filter for root categories (parents)
  const rootCategories = categories.filter(cat => !cat.parent_id);
  
  // Track which category is currently hovered/clicked
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Default to the first category if none is selected
  const activeCategory = rootCategories.find(c => c.id === activeCategoryId) || rootCategories[0];

  return (
    <>
      {/* The Trigger Button inside the Grid */}
      <button 
        onClick={() => setIsOpen(true)}
        className="group flex flex-col items-center text-center gap-4 cursor-pointer w-full"
      >
        <div className="w-full aspect-square bg-white border border-surface-variant rounded-md shadow-sm flex items-center justify-center p-6 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 bg-[#336791] rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Menu className="w-6 h-6 text-white" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-secondary uppercase tracking-wider leading-tight px-2 group-hover:text-[#336791] transition-colors">
          All Categories
        </span>
      </button>

      {/* The Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl h-[80vh] p-0 border-0 overflow-hidden flex flex-col md:flex-row gap-0 rounded-sm shadow-2xl">
          
          {/* Left Sidebar - Root Categories */}
          <div className="w-full md:w-1/3 bg-surface border-r border-surface-variant h-full flex flex-col relative z-10">
            <div className="p-6 border-b border-surface-variant bg-white flex items-center gap-3 shrink-0">
              <FolderTree className="w-5 h-5 text-primary-container" />
              <h2 className="text-sm font-black text-secondary uppercase tracking-widest">All Sectors</h2>
            </div>
            
            <div className="p-4 space-y-1 overflow-y-auto industrial-scrollbar flex-1">
              {rootCategories.map(cat => (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveCategoryId(cat.id)}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-sm transition-all duration-200 ${
                    activeCategory?.id === cat.id 
                      ? "bg-white border-l-4 border-primary-container text-primary-container shadow-sm" 
                      : "hover:bg-white/50 text-secondary/70 hover:text-secondary border-l-4 border-transparent"
                  }`}
                >
                  <span className="text-[11px] font-black uppercase tracking-widest text-left line-clamp-1 pr-4">
                    {cat.name}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                    activeCategory?.id === cat.id ? "text-primary-container translate-x-1" : "opacity-30"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Subcategories */}
          <div className="w-full md:w-2/3 bg-white h-full overflow-y-auto industrial-scrollbar relative">
            {activeCategory && (
              <div className="p-8 md:p-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                
                {/* Active Category Header */}
                <div className="flex items-center gap-5 pb-8 border-b border-surface-variant">
                  {activeCategory.icon_url && (
                     <div className="w-16 h-16 rounded-sm bg-surface border border-surface-variant flex items-center justify-center relative p-3">
                       <Image 
                         src={activeCategory.icon_url} 
                         alt={activeCategory.name} 
                         fill 
                         className="object-contain p-2" 
                         sizes="64px" 
                         unoptimized 
                       />
                     </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-black text-secondary uppercase tracking-tight">
                      {activeCategory.name}
                    </h3>
                    <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                      {activeCategory.sub_categories?.length || 0} Subcategories available
                    </p>
                  </div>
                </div>

                {/* Subcategories Grid */}
                {activeCategory.sub_categories && activeCategory.sub_categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeCategory.sub_categories.map(sub => (
                      <Link
                        key={sub.id}
                        href={`/search?category=${encodeURIComponent(sub.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="p-4 border border-surface-variant rounded-sm hover:border-primary-container hover:shadow-md transition-all duration-300 group flex items-center gap-4 bg-white"
                      >
                         <div className="w-8 h-8 rounded-sm bg-surface flex items-center justify-center relative shrink-0">
                           {sub.icon_url ? (
                             <Image 
                               src={sub.icon_url} 
                               alt={sub.name} 
                               fill 
                               className="object-contain p-1.5 opacity-70 group-hover:opacity-100 transition-opacity" 
                               sizes="32px" 
                               unoptimized 
                             />
                           ) : (
                             <FolderTree className="w-4 h-4 text-secondary/20" />
                           )}
                         </div>
                        <span className="text-[10px] font-black text-secondary/70 uppercase tracking-widest group-hover:text-primary-container transition-colors line-clamp-2 leading-relaxed">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center border-2 border-dashed border-surface-variant rounded-sm bg-surface/30">
                     <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">
                       No subcategories mapped yet
                     </p>
                  </div>
                )}
                
                {/* View All button for the main category */}
                <div className="pt-4">
                  <Link
                    href={`/search?category=${encodeURIComponent(activeCategory.name)}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-container hover:text-[#336791] transition-colors"
                  >
                    Browse all in {activeCategory.name} <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
