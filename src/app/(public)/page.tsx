"use client";

import React from 'react';
import { HeroArea } from "@/components/home/sections/hero-area";
import { FeaturesArea } from "@/components/home/sections/features-area";
import { CategoriesArea } from "@/components/home/sections/categories-area";
import { SuppliersArea } from "@/components/home/sections/suppliers-area";
import { ActionBannerArea } from "@/components/home/sections/action-banner-area";
import { PopularLinksArea } from "@/components/home/sections/popular-links-area";

export default function Home() {
  return (
    <div className="w-full">
      <HeroArea />
      <FeaturesArea />
      <CategoriesArea />
      <SuppliersArea />
      <ActionBannerArea />
      <PopularLinksArea />
    </div>
  );
}
