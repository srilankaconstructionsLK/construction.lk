"use client";

import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { Search, MapPin, Filter, Star, Phone, MessageSquare, Send, ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const results = [
  {
    name: "Apex Construction Materials",
    rating: "4.8",
    reviews: 32,
    cida: "CS2",
    verified: true,
    tags: ["Cement", "Structural Steel", "Heavy Machinery"],
    desc: "Premier supplier of high-grade construction materials for national infrastructure projects.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Global Builders Solutions",
    rating: "4.8",
    reviews: 24,
    cida: "C3",
    verified: true,
    tags: ["Engineering", "Logistics", "Site Prep"],
    desc: "End-to-end site management and industrial logistics provider with proven track record.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Heavy Machinery Lanka",
    rating: "4.7",
    reviews: 18,
    cida: "EM1",
    verified: false,
    tags: ["Excavators", "Cranes", "Rental"],
    desc: "Specialized in heavy earth-moving equipment rentals and technical maintenance services.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Construction Sales Hub",
    rating: "4.6",
    reviews: 40,
    cida: "CS1",
    verified: true,
    tags: ["Bulk Sourcing", "Pipes", "Fitting"],
    desc: "Direct-to-site bulk material supply network for large-scale commercial developments.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400"
  },
];

const brands = [
  { name: "Caterpillar Industrial", category: "Heavy Machinery", color: "from-yellow-400 to-yellow-600" },
  { name: "Sika Waterproofing", category: "Chemicals", color: "from-red-400 to-red-600" },
  { name: "Holcim Cement", category: "Materials", color: "from-blue-400 to-blue-600" },
];

export default function SearchPage() {
  return (
    <SiteFrame active="search">
      <div className="bg-surface-container-low min-h-screen">
        {/* Breadcrumbs & Title */}
        <div className="bg-white border-b border-surface-variant py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary/40 mb-6">
              <Link href="/" className="hover:text-primary-container transition-colors">Home</Link>
              <span>/</span>
              <span className="text-secondary">Directory Search</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold font-display text-secondary tracking-tight">Suppliers Directory</h1>
                <p className="text-secondary/50 text-sm mt-2">Showing {results.length} verified industrial partners in Sri Lanka.</p>
              </div>
              <div className="flex items-center gap-3 bg-surface-container p-1 rounded-md">
                <Button variant="ghost" className="h-9 px-4 text-xs font-bold uppercase tracking-widest bg-white shadow-sm">Grid</Button>
                <Button variant="ghost" className="h-9 px-4 text-xs font-bold uppercase tracking-widest text-secondary/40">List</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 space-y-8">
              <div className="bg-white border border-surface-variant rounded-md overflow-hidden">
                <div className="p-6 border-b border-surface-variant flex items-center justify-between bg-surface-container-lowest">
                  <h2 className="font-bold text-sm uppercase tracking-widest text-secondary flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                  </h2>
                  <button className="text-[10px] font-bold text-primary-container uppercase hover:underline">Reset</button>
                </div>
                <div className="p-6 space-y-10">
                  <section className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-secondary">Location</h3>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                      <Input placeholder="Select District..." className="pl-10 h-11 border-surface-variant text-sm" />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-secondary">CIDA Grading</h3>
                    <div className="space-y-3">
                      {['CS1 - CS2', 'C1 - C3', 'C4 - C6', 'EM1 - EM4'].map((grade) => (
                        <label key={grade} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container" />
                          <span className="text-sm text-secondary/70 group-hover:text-secondary transition-colors">{grade}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-secondary">Verified Status</h3>
                    <div className="flex items-center justify-between p-3 bg-surface-container rounded-md border border-surface-variant/50">
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest">Verified Only</span>
                      <button className="w-12 h-6 bg-primary-container rounded-full relative flex items-center px-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                      </button>
                    </div>
                  </section>
                </div>
              </div>

              {/* Ad Placement Sidebar */}
              <div className="bg-secondary rounded-md p-8 text-center space-y-6 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-4">
                  <p className="text-primary-container font-bold text-[10px] uppercase tracking-[0.2em]">Partner Opportunity</p>
                  <h3 className="text-white font-bold text-lg leading-snug">Feature Your Business Here</h3>
                  <p className="text-white/40 text-xs leading-relaxed">Reach thousands of procurement managers every month.</p>
                  <Button className="w-full bg-white text-secondary font-bold uppercase tracking-widest text-[10px] h-11 hover:bg-primary-container hover:text-white transition-all">Get Started</Button>
                </div>
                <div className="absolute inset-0 bg-primary-container/10 group-hover:bg-primary-container/20 transition-all"></div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9 space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white border border-surface-variant p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-4 text-sm text-secondary/50 font-medium">
                  <span>Sorted by <span className="text-secondary font-bold">Relevance</span></span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-secondary/40 uppercase tracking-widest">Page 1 of 12</span>
                  <div className="flex border border-surface-variant rounded-md overflow-hidden">
                    <Button variant="ghost" className="h-9 w-9 p-0 border-r border-surface-variant rounded-none"><ArrowRight className="w-4 h-4 rotate-180" /></Button>
                    <Button variant="ghost" className="h-9 w-9 p-0 rounded-none bg-surface-container"><ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((result) => (
                  <Card key={result.name} className="bg-white border-surface-variant overflow-hidden group hover:border-primary-container transition-all flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image src={result.image} alt={result.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      {result.verified && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-primary-container/20">
                          <ShieldCheck className="w-4 h-4 text-primary-container fill-primary-container/10" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary">Verified</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-secondary text-primary-container px-3 py-1.5 rounded-md font-extrabold text-[10px] uppercase tracking-widest shadow-lg border border-primary-container/20">
                        CIDA {result.cida}
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col flex-1 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="font-display font-extrabold text-xl text-secondary tracking-tight group-hover:text-primary-container transition-colors">{result.name}</h2>
                          <div className="flex items-center gap-1.5 text-primary-container">
                            <Star className="w-4 h-4 fill-primary-container" />
                            <span className="text-sm font-extrabold">{result.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-secondary/40 font-medium">Colombo, Western Province</p>
                      </div>

                      <p className="text-sm text-secondary/60 leading-relaxed line-clamp-2">
                        {result.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-surface-container text-secondary/60 text-[9px] uppercase tracking-widest font-bold border-none h-6">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-surface-variant flex items-center gap-3">
                        <Link href="/profile" className="flex-1">
                          <Button className="w-full bg-secondary hover:bg-on-surface text-white font-bold uppercase tracking-widest text-[10px] h-12 shadow-md shadow-secondary/10">View Profile</Button>
                        </Link>
                        <Button variant="outline" className="w-12 h-12 p-0 border-surface-variant hover:bg-surface-container-low transition-colors">
                          <MessageSquare className="w-5 h-5 text-secondary" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Brand Showcase Section */}
              <div className="mt-16 pt-16 border-t border-surface-variant space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-extrabold text-xl text-secondary uppercase tracking-widest">Global Brand Partners</h2>
                  <Button variant="ghost" className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-container">View Ecosystem</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {brands.map((brand) => (
                    <Card key={brand.name} className="relative h-32 overflow-hidden border-none group cursor-pointer">
                      <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-90 transition-all group-hover:scale-110`} />
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
                        <h3 className="text-white font-extrabold text-sm uppercase tracking-widest mb-1">{brand.name}</h3>
                        <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.2em]">{brand.category}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
