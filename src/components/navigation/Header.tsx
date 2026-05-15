// src/components/navigation/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown, Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/UserNav";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setQuery } from '@/redux/slices/searchSlice';
import { setLocationPickerOpen } from '@/redux/slices/uiSlice';

import { NotificationDropdown } from "@/components/navigation/NotificationDropdown";

export function Header() {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedLocation: location } = useAppSelector((state) => state.location);
  const { query } = useAppSelector((state) => state.search);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location && location !== 'All Sri Lanka') params.set('location', location);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <header className="bg-white border-b border-surface-variant py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-48 h-12 overflow-hidden">
            <Image 
              src="/logo.webp" 
              alt="Construction.lk Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Search Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="hidden md:flex flex-1 max-w-2xl items-center bg-surface-container-low rounded-lg border border-surface-variant overflow-hidden shadow-sm transition-all focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container"
        >
          <div className="flex items-center px-4 border-r border-surface-variant flex-1">
            <Search className="w-4 h-4 text-outline mr-3" />
            <Input
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search materials, heavy gear, suppliers..."
              className="border-none bg-transparent shadow-none focus-visible:ring-0 text-xs h-11"
            />
          </div>
          <div 
            onClick={() => dispatch(setLocationPickerOpen(true))}
            className="flex items-center px-5 border-r border-surface-variant cursor-pointer hover:bg-surface-container transition-colors h-11"
          >
            <MapPin className="w-4 h-4 text-secondary mr-2" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.15em] truncate max-w-[100px]">
              {location === 'All Sri Lanka' ? 'LOCATION' : location}
            </span>
            <ChevronDown className="w-3 h-3 ml-2 text-secondary shrink-0" />
          </div>
          <Button 
            type="submit"
            className="rounded-none h-11 px-7 bg-primary-container hover:bg-primary-container/90 transition-colors"
          >
            <Search className="w-5 h-5 text-white" />
          </Button>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-4 lg:gap-8 min-w-[240px] justify-end">
          {loading ? (
            <div className="flex items-center gap-2 text-secondary/30 text-[10px] font-bold uppercase tracking-widest">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Initializing...</span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-6">
              <NotificationDropdown />
              <div className="w-px h-6 bg-surface-variant"></div>
              <UserNav />
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link href="/login">
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-secondary hover:text-primary-container transition-colors cursor-pointer">
                  SIGN IN
                </span>
              </Link>
              <Link href="/register">
                <Button 
                  variant="outline" 
                  className="border-primary-container text-primary-container hover:bg-primary-container hover:text-white text-[11px] font-black uppercase tracking-[0.15em] px-6 h-10 rounded-sm transition-all"
                >
                  Join Network
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
