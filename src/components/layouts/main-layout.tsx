// src/components/layouts/main-layout.tsx
"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/navigation/Header";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { LocationPickerModal } from "@/components/location-picker-modal";

interface SiteFrameProps {
  children: ReactNode;
  active?: string;
}

/**
 * MainLayout orchestrates the public-facing site structure.
 * It composes the Header, Navbar, and Footer while providing
 * a slot for the main content.
 */
export function MainLayout({ children }: SiteFrameProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Primary Header & Navigation */}
      <Header />
      <Navbar />

      {/* Main Content Slot */}
      <main className="flex-1">
        {children}
      </main>

      {/* Industrial Footer */}
      <Footer />

      {/* Global Modals */}
      <LocationPickerModal />
    </div>
  );
}
