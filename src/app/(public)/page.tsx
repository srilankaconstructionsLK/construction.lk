"use client";

import React from 'react';
import { HeroArea } from "@/components/sections/hero-area";
import { FeaturesArea } from "@/components/sections/features-area";
import { CategoriesArea } from "@/components/sections/categories-area";
import { SuppliersArea } from "@/components/sections/suppliers-area";
import { ActionBannerArea } from "@/components/sections/action-banner-area";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <div>
        <HeroArea />
      </div>
      <div>
        <FeaturesArea />
      </div>
      <div>
        <CategoriesArea />
      </div>
      <div className="animate-reveal">
        <SuppliersArea />
      </div>
      <div className="animate-reveal delay-100">
        <ActionBannerArea />
      </div>
    </div>
  );
}
