// src/app/(public)/page.tsx
import React from 'react';
import { HeroArea } from "@/components/home/sections/hero-area";
import { FeaturesArea } from "@/components/home/sections/features-area";
import { CategoriesArea } from "@/components/home/sections/categories-area";
import { SuppliersArea } from "@/components/home/sections/suppliers-area";
import { ActionBannerArea } from "@/components/home/sections/action-banner-area";
import { PopularLinksArea } from "@/components/home/sections/popular-links-area";
import { CategoryService, Category } from "@/services/supabase/CategoryService";

// ISR: Revalidate the home page every 1 hour
export const revalidate = 3600;

/**
 * The Home Page is a Server Component that pre-fetches categories 
 * for instant SSR/ISR rendering, following Pillar 1 philosophy.
 */
export default async function Home() {
  // Fetch categories on the server for the CategoriesArea component
  let categories: Category[] = [];
  try {
    categories = await CategoryService.getCategoriesHierarchy();
  } catch (error) {
    console.error("Error pre-fetching categories on home page:", error);
  }

  return (
    <div className="w-full">
      <HeroArea />
      <FeaturesArea />
      
      {/* SSR/ISR Category Section */}
      <CategoriesArea categories={categories} />
      
      <SuppliersArea />
      <ActionBannerArea />
      <PopularLinksArea />
    </div>
  );
}
