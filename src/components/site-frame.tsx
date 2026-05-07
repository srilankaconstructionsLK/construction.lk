"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, MapPin, User, MessageSquare, Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

interface SiteFrameProps {
  children: ReactNode;
  active?: string;
}

export function SiteFrame({ children, active }: SiteFrameProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-surface-variant py-4 px-4 md:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-10 overflow-hidden">
              <Image 
                src="/logo.webp" 
                alt="Construction.lk Logo" 
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center bg-surface-container-low rounded-lg border border-surface-variant overflow-hidden shadow-sm transition-all focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container">
            <div className="flex items-center px-4 border-r border-surface-variant flex-1">
              <Search className="w-4 h-4 text-outline mr-3" />
              <Input 
                placeholder="Search materials, heavy gear, suppliers..." 
                className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm h-11"
              />
            </div>
            <div className="flex items-center px-5 border-r border-surface-variant cursor-pointer hover:bg-surface-container transition-colors h-11">
              <MapPin className="w-4 h-4 text-outline mr-2" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Location</span>
              <ChevronDown className="w-3 h-3 ml-2 text-outline" />
            </div>
            <Button className="rounded-none h-11 px-7 bg-primary-container hover:bg-primary transition-colors">
              <Search className="w-5 h-5 text-white" />
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden xl:flex items-center gap-6">
              <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary-container transition-colors">
                Sign In
              </Link>
              <Link href="/register">
                <Button variant="outline" className="border-primary-container text-primary-container hover:bg-primary-container hover:text-white font-bold h-10 px-6 rounded-md">
                  Join Network
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center cursor-pointer group relative p-2 rounded-md hover:bg-surface-container transition-colors">
                <MessageSquare className="w-5 h-5 text-secondary group-hover:text-primary-container transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-container text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-extrabold shadow-sm">2</span>
              </div>
              <Button variant="ghost" size="icon" className="md:hidden text-secondary">
                <Menu className="w-7 h-7" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-surface-variant px-4 md:px-8 hidden md:block overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          <ul className="flex items-center gap-10">
            {['Suppliers', 'Materials', 'Machinery', 'Services', 'Tenders', 'Projects'].map((item) => (
              <li key={item} className="h-full flex items-center">
                <Link 
                  href={item === 'Suppliers' ? '/search' : '#'} 
                  className={`text-[13px] font-bold uppercase tracking-widest transition-all hover:text-primary-container relative h-full flex items-center ${
                    (item === 'Suppliers' && pathname === '/search') 
                    ? 'text-primary-container after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-primary-container' 
                    : 'text-secondary'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <Button className="bg-secondary hover:bg-on-surface text-white text-xs font-bold uppercase tracking-widest px-8 h-10 rounded-md transition-all shadow-sm">
            Request Quote (RFQ)
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Industrial Footer */}
      <footer className="bg-secondary text-white pt-24 pb-12 px-4 md:px-8 border-t-[8px] border-primary-container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-8 overflow-hidden">
                <Image 
                  src="/logo.webp" 
                  alt="Construction.lk Logo" 
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-on-secondary/60 text-sm leading-relaxed max-w-xs">
              The leading industrial procurement network for the South Asian construction sector. Engineered for reliability, transparency, and growth.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary-container">Supply Chain</h3>
            <ul className="space-y-4 text-sm text-on-secondary/70">
              <li><Link href="#" className="hover:text-primary-container transition-colors">Verified Suppliers</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Raw Materials</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Machinery Rental</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Logistics Partners</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">CIDA Grading Directory</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary-container">Ecosystem</h3>
            <ul className="space-y-4 text-sm text-on-secondary/70">
              <li><Link href="#" className="hover:text-primary-container transition-colors">Project Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Public Tenders</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Partner Access</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Business Support</Link></li>
              <li><Link href="#" className="hover:text-primary-container transition-colors">Resource Library</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="font-display font-bold text-lg uppercase tracking-widest text-primary-container">Industry Newsletter</h3>
            <div className="flex flex-col gap-3">
              <Input placeholder="Engineering Email..." className="bg-on-secondary/5 border-on-secondary/10 text-white placeholder:text-on-secondary/30 h-12" />
              <Button className="bg-primary-container hover:bg-primary w-full h-12 font-bold uppercase tracking-widest text-xs">Join Network</Button>
            </div>
            <div className="pt-4 border-t border-on-secondary/10 space-y-2 text-[10px] uppercase tracking-widest text-on-secondary/40 font-bold">
              <p>Hotline: +94 11 200 5000</p>
              <p>Email: HQ@CONSTRUCTION.LK</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-on-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-on-secondary/40 font-bold">© 2024 CONSTRUCTION.LK INDUSTRIAL PLATFORM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10 text-[10px] uppercase tracking-widest text-on-secondary/40 font-bold">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
