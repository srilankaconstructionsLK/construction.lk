"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setQuery } from '@/redux/slices/searchSlice';
import { hydrateLocation, setLocationWithPersist } from '@/redux/slices/locationSlice';
import { setLocationPickerOpen } from '@/redux/slices/uiSlice';
import { 
  Filter, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Grid, 
  List as ListIcon,
  Hammer,
  BadgeCheck,
  X,
  ChevronRight,
  Search as SearchIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from "@/components/layouts/main-layout";
import { SearchResultCarousel } from '@/components/ads/SearchResultCarousel';
import { SearchResultSidebarAds } from '@/components/ads/SearchResultSidebarAds';
import { BusinessCardList } from '@/components/search/BusinessCardList';

import { MOCK_BUSINESSES } from '@/data/mock-businesses';

// Transform mock businesses for search view if needed
const mockResults = MOCK_BUSINESSES.map(b => ({
  id: b.id,
  title: b.title,
  description: b.description,
  rating: b.rating,
  review_count: b.review_count,
  verified: b.verified,
  city: b.city,
  district: b.district,
  cida_grading: b.cida_grading,
  subscription_plan: b.subscription_plan,
  image: b.profile_images_info?.cover_url || 'https://via.placeholder.com/600',
  tags: b.service_districts || [] // Using districts as tags for now to match the UI
}));

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useSelector((state: RootState) => state.search);
  const { selectedLocation: location } = useSelector((state: RootState) => state.location);
  
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync URL params with Redux on mount
  useEffect(() => {
    const q = searchParams.get('q');
    const loc = searchParams.get('location');
    
    if (q) dispatch(setQuery(q));
    if (loc) dispatch(setLocationWithPersist(loc));
    dispatch(hydrateLocation());
  }, [searchParams, dispatch]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <MainLayout active="search">
      <div className="bg-surface min-h-screen">
        <SearchResultCarousel />
        {/* Search Header Section */}
        <div className="bg-white border-b border-surface-variant py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30">
              <Link href="/" className="hover:text-primary-container transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-secondary/60">Industrial Search</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary-container">Results</span>
            </div>

            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-secondary text-white border-none text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-sm">
                    {mockResults.length} Units Found
                  </Badge>
                  {location !== 'All Sri Lanka' && (
                    <Badge 
                      variant="outline" 
                      onClick={() => dispatch(setLocationPickerOpen(true))}
                      className="text-secondary/40 border-surface-variant text-[10px] uppercase tracking-widest font-black cursor-pointer hover:bg-surface transition-colors rounded-sm px-3 py-1"
                    >
                      <MapPin className="w-3 h-3 mr-2 text-primary-container" /> {location}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-2xl md:text-4xl font-black text-secondary uppercase tracking-tighter leading-none">
                  Sourcing: <span className="text-primary-container underline decoration-primary-container/20 underline-offset-4 decoration-2">{query || 'All Suppliers'}</span>
                </h1>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  variant="outline" 
                  className="flex-1 md:flex-none border-surface-variant bg-white text-secondary hover:bg-surface uppercase font-black text-[10px] tracking-[0.2em] h-14 px-8 rounded-none border-2 transition-all active:scale-95"
                >
                  <Filter className="w-4 h-4 mr-3 text-primary-container" /> Adjust Filters
                </Button>
                
                <div className="hidden md:flex bg-surface border-2 border-surface-variant p-1 gap-1">
                  <button 
                    onClick={() => setViewType('grid')}
                    className={`p-3 transition-all ${viewType === 'grid' ? 'bg-secondary text-white' : 'text-secondary/30 hover:text-secondary'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewType('list')}
                    className={`p-3 transition-all ${viewType === 'list' ? 'bg-secondary text-white' : 'text-secondary/30 hover:text-secondary'}`}
                  >
                    <ListIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Filters */}
            <aside className={`lg:w-72 shrink-0 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-28 space-y-8">
                
                {/* Category Filter */}
                <div>
                  <h3 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Hammer className="w-3.5 h-3.5 mr-2 text-primary-container" /> Material Category
                  </h3>
                  <div className="space-y-2">
                    {['Structural Steel', 'Ready-Mix Concrete', 'Aggregates', 'Machinery', 'Electrical'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => toggleFilter(cat)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${activeFilters.includes(cat) ? 'bg-primary-container border-primary-container text-white' : 'bg-white border-surface-variant text-secondary hover:border-primary-container/30'}`}
                      >
                        {cat}
                        {activeFilters.includes(cat) && <X className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CIDA Grade Filter */}
                <div>
                  <h3 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] mb-4 flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-2 text-primary-container" /> CIDA Grading
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['C1', 'C2', 'C3', 'C4', 'C5', 'C6'].map((grade) => (
                      <button 
                        key={grade}
                        onClick={() => toggleFilter(grade)}
                        className={`p-2 rounded-lg border text-[10px] font-black transition-all ${activeFilters.includes(grade) ? 'bg-primary-container border-primary-container text-white' : 'bg-white border-surface-variant text-secondary hover:border-primary-container/30'}`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>


                {/* Ads Card */}
                <div className="bg-secondary p-8 rounded-xl relative overflow-hidden group">
                  <div className="relative z-10 space-y-4">
                    <span className="text-primary-container font-black text-[9px] uppercase tracking-[0.3em]">Partner Opportunity</span>
                    <h4 className="text-white font-black text-lg uppercase tracking-tight leading-tight">Feature Your Supply Line</h4>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Reach industrial buyers across Sri Lanka.</p>
                    <Button className="w-full bg-white text-secondary hover:bg-primary-container hover:text-white font-black uppercase tracking-widest text-[10px] h-12 transition-all">
                      Boost Visibility
                    </Button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-container/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                </div>

                {/* Sidebar Ads */}
                <SearchResultSidebarAds />

              </div>
            </aside>

            {/* Results Area */}
            <div className="flex-1">
              <div className={`grid gap-8 ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                <AnimatePresence mode="wait">
                  {mockResults.map((item, idx) => (
                    viewType === 'list' ? (
                      <BusinessCardList key={item.id} item={item} />
                    ) : (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => router.push(`/business/${item.id}`)}
                        className="bg-white rounded-xl border border-surface-variant overflow-hidden group hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 flex flex-col cursor-pointer"
                      >
                        <div className="relative h-60 overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60" />
                          
                          {/* Status Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {item.subscription_plan === 'enterprise' && (
                              <div className="bg-primary-container text-white px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center">
                                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Enterprise Partner
                              </div>
                            )}
                            {item.verified && (
                              <div className="bg-white/90 backdrop-blur-md text-secondary px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center w-fit">
                                <BadgeCheck className="w-3.5 h-3.5 mr-1.5 text-primary-container" /> Verified
                              </div>
                            )}
                          </div>
                          
                          <div className="absolute top-4 right-4 bg-secondary text-primary-container px-3 py-1.5 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-lg border border-primary-container/20">
                            CIDA {item.cida_grading}
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-white text-sm font-black">{item.rating}</span>
                              <span className="text-white/60 text-[10px] font-bold">({item.review_count} REVIEWS)</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-xl font-black text-secondary uppercase tracking-tight group-hover:text-primary-container transition-colors leading-none mb-2">
                                {item.title}
                              </h3>
                              <p className="flex items-center text-[10px] font-bold text-secondary/40 uppercase tracking-widest">
                                <MapPin className="w-3.5 h-3.5 mr-2 text-primary-container" /> {item.city}, {item.district}
                              </p>
                            </div>
                          </div>

                          <p className="text-secondary/60 text-xs font-medium leading-relaxed mb-8 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {item.tags.map(tag => (
                              <span key={tag} className="px-3 py-1.5 bg-surface rounded-sm text-[9px] font-black text-secondary/40 uppercase tracking-widest border border-surface-variant/50">
                                #{tag}
                              </span>
                            ))} 
                          </div>

                          <div className="pt-8 border-t border-surface-variant mt-auto flex items-center gap-4">
                            <Button 
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-secondary hover:bg-primary-container text-white font-black uppercase text-[10px] tracking-[0.2em] h-12 transition-all"
                            >
                              View Profile
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={(e) => e.stopPropagation()}
                              className="border-surface-variant hover:bg-surface text-secondary font-black uppercase text-[10px] tracking-[0.2em] h-12 w-12 p-0"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Pagination */}
              <div className="mt-16 flex justify-center">
                <Button variant="outline" className="px-16 py-7 border-surface-variant text-secondary font-black uppercase tracking-[0.3em] text-[11px] rounded-sm hover:bg-white hover:border-primary-container transition-all group">
                  Load More Suppliers <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Scanning Industrial Network...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
