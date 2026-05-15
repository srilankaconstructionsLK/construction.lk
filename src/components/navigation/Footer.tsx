// src/components/navigation/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 px-4 md:px-8 border-t-[8px] border-primary-container">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand & Mission */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center">
            <div className="relative w-44 h-11">
              <Image
                src="/logo.webp"
                alt="Construction.lk Logo"
                fill
                className="object-contain object-left invert brightness-[1.2]"
              />
            </div>
          </Link>
          <p className="text-on-secondary/60 text-sm leading-relaxed max-w-xs">
            The leading industrial procurement network for the South Asian
            construction sector. Engineered for reliability, transparency, and
            growth.
          </p>
        </div>

        {/* Column 1 */}
        <div>
          <h3 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary-container">
            Supply Chain
          </h3>
          <ul className="space-y-4 text-sm text-on-secondary/70">
            <li><Link href="#" className="hover:text-primary-container transition-colors">Verified Suppliers</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Raw Materials</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Machinery Rental</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Logistics Partners</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">CIDA Grading Directory</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary-container">
            Ecosystem
          </h3>
          <ul className="space-y-4 text-sm text-on-secondary/70">
            <li><Link href="#" className="hover:text-primary-container transition-colors">Project Dashboard</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Public Tenders</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Partner Access</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Business Support</Link></li>
            <li><Link href="#" className="hover:text-primary-container transition-colors">Resource Library</Link></li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-8">
          <h3 className="font-display font-bold text-lg uppercase tracking-widest text-primary-container">
            Industry Newsletter
          </h3>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Engineering Email..."
              className="bg-on-secondary/5 border-on-secondary/10 text-white placeholder:text-on-secondary/30 h-12"
            />
            <Button className="bg-primary-container hover:bg-primary w-full h-12 font-bold uppercase tracking-widest text-xs">
              Join Network
            </Button>
          </div>
          <div className="pt-4 border-t border-on-secondary/10 space-y-2 text-[10px] uppercase tracking-widest text-on-secondary/40 font-bold">
            <p>Hotline: +94 11 200 5000</p>
            <p>Email: HQ@CONSTRUCTION.LK</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-12 border-t border-on-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-widest text-on-secondary/40 font-bold">
          © 2024 CONSTRUCTION.LK INDUSTRIAL PLATFORM. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-10 text-[10px] uppercase tracking-widest text-on-secondary/40 font-bold">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
}
