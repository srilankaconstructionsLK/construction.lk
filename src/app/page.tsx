"use client";

import React from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Play, ShieldCheck, Zap, Globe, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiteFrame } from "@/components/site-frame";
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Structural Steel', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200' },
  { name: 'Heavy Machinery', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=200' },
  { name: 'Electrical Systems', image: 'https://images.unsplash.com/photo-1621905235285-645395697330?auto=format&fit=crop&q=80&w=200' },
  { name: 'HVAC Solutions', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200' },
  { name: 'Civil Engineering', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=200' },
  { name: 'Interior & Fit-out', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200' },
];

const suppliers = [
  { 
    name: 'Apex Construction Solutions', 
    logo: 'A', 
    desc: 'CIDA Grade CS2 verified leader in heavy machinery and structural materials sourcing.', 
    color: 'bg-primary-container' 
  },
  { 
    name: 'Global Build Corp', 
    logo: 'G', 
    desc: 'International standards for construction management and industrial logistics.', 
    color: 'bg-secondary' 
  },
  { 
    name: 'Master Concrete Pvt Ltd', 
    logo: 'M', 
    desc: 'Premium concrete solutions and prefabricated structures for large scale developments.', 
    color: 'bg-on-surface' 
  },
  { 
    name: 'Steel Dynamics SL', 
    logo: 'S', 
    desc: 'Leading supplier of high-tensile structural steel and fabrication services.', 
    color: 'bg-outline' 
  },
];

const features = [
  { icon: ShieldCheck, title: "Verified Suppliers", desc: "Every business profile is manually vetted for CIDA grading and registration." },
  { icon: Zap, title: "Direct RFQ System", desc: "Request quotes directly from multiple suppliers in a single click." },
  { icon: Globe, title: "Island-wide Network", desc: "Sourcing capabilities spanning across all 9 provinces of Sri Lanka." },
];

export default function Home() {
  return (
    <SiteFrame active="home">
      <div className="pb-32">
        {/* Industrial Hero Section */}
        <section className="relative h-[700px] overflow-hidden bg-secondary">
          <Image 
            src="/images/hero.png" 
            alt="Construction Site" 
            fill
            className="absolute inset-0 object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
          <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4 md:px-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1.5 bg-primary-container"></div>
                <span className="text-primary-container font-bold uppercase tracking-[0.2em] text-[10px]">Industrial Integrity Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] font-display">
                Building the Future with <span className="text-primary-container">Verified Precision.</span>
              </h1>
              <p className="text-on-secondary/70 text-xl mb-10 max-w-xl leading-relaxed">
                Connect with CIDA-graded suppliers, manage large-scale procurement, and execute projects with confidence on Sri Lanka's premier construction B2B network.
              </p>
              <div className="flex flex-wrap gap-5">
                <Button className="bg-primary-container hover:bg-primary text-white text-sm font-bold uppercase tracking-widest px-10 h-16 rounded-md shadow-xl transition-all hover:-translate-y-1">
                  Start Sourcing Now
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm font-bold uppercase tracking-widest px-10 h-16 rounded-md backdrop-blur-sm">
                  <Play className="w-4 h-4 mr-3 fill-white" /> View Platform Tour
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Quick Stats Overlay */}
          <div className="absolute bottom-0 right-0 left-0 bg-white/5 backdrop-blur-xl border-t border-white/10 py-8 hidden lg:block">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
              {[
                { label: 'Verified Suppliers', value: '2,500+' },
                { label: 'Active Projects', value: '450+' },
                { label: 'Materials Listed', value: '15,000+' },
                { label: 'Industry Support', value: '24/7' },
              ].map((stat, i) => (
                <div key={i} className="border-r border-white/10 last:border-none px-4">
                  <p className="text-primary-container font-extrabold text-2xl mb-1">{stat.value}</p>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-white border-none shadow-2xl shadow-secondary/10 p-8 hover:-translate-y-2 transition-transform duration-500">
                <div className="w-14 h-14 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-container" />
                </div>
                <h3 className="font-display font-bold text-lg mb-4 text-secondary uppercase tracking-wider">{feature.title}</h3>
                <p className="text-secondary/60 text-sm leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Category structural grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-primary-container"></div>
              <h2 className="text-4xl font-extrabold font-display text-secondary tracking-tight">Industrial Ecosystem</h2>
              <p className="text-secondary/50 text-sm max-w-md">Comprehensive sourcing categories for heavy industrial and commercial development.</p>
            </div>
            <Link href="/search" className="text-xs font-bold uppercase tracking-widest text-primary-container hover:underline flex items-center gap-2 group">
              Explore All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group relative aspect-square overflow-hidden cursor-pointer border-none shadow-sm hover:shadow-xl transition-all">
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest leading-snug">
                      {cat.name}
                    </h3>
                    <div className="w-0 group-hover:w-8 h-0.5 bg-primary-container mt-3 transition-all duration-300"></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Network Suppliers */}
        <section className="bg-surface-container-low mt-32 py-32 border-y border-surface-variant">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-4 mb-20">
              <span className="text-primary-container font-bold uppercase tracking-[0.3em] text-[10px]">Verified Network</span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-secondary tracking-tight">Premier Industrial Partners</h2>
              <div className="w-16 h-1 bg-primary-container mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {suppliers.map((supplier, i) => (
                <Card key={i} className="bg-white border border-surface-variant p-10 group hover:border-primary-container transition-all">
                  <div className="flex justify-center mb-10">
                    <div className={`w-20 h-20 ${supplier.color} rounded-md flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-black/10 group-hover:-translate-y-2 transition-transform`}>
                      {supplier.logo}
                    </div>
                  </div>
                  <h3 className="font-bold text-center mb-4 text-secondary text-lg uppercase tracking-tight">{supplier.name}</h3>
                  <p className="text-xs text-secondary/50 text-center mb-10 line-clamp-3 leading-relaxed">
                    {supplier.desc}
                  </p>
                  <Link href="/profile">
                    <Button variant="outline" className="w-full border-surface-variant text-secondary font-bold uppercase tracking-widest text-[10px] h-12 group-hover:bg-primary-container group-hover:border-primary-container group-hover:text-white transition-all">
                      View Capability Profile
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
          <div className="bg-secondary rounded-xl overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center">
            <Image 
              src="/images/hero.png" 
              alt="Structural Engineering" 
              fill
              className="absolute inset-0 object-cover opacity-20"
            />
            <div className="relative z-10 space-y-8 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white font-display leading-tight">Ready to streamline your <span className="text-primary-container">procurement?</span></h2>
              <p className="text-white/60 text-lg">Join thousands of verified construction professionals in Sri Lanka's most advanced B2B network.</p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Button className="bg-primary-container hover:bg-primary text-white font-bold uppercase tracking-widest px-12 h-16 rounded-md">Register as Buyer</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest px-12 h-16 rounded-md">Partner with Us</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
