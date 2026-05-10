"use client";

import React from 'react';
import { MainLayout } from "@/components/layouts/main-layout";
import { 
  MapPin, Phone, Mail, Globe, MessageSquare, 
  ShieldCheck, Star, Clock, FileText, 
  ExternalLink, ChevronRight, CheckCircle2, 
  Images, Info, Briefcase, MessageCircle,
  Zap, ArrowRight, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

const gallery = [
  { title: "Industrial Site Alpha", image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600" },
  { title: "Equipment Fleet", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600" },
  { title: "Structural Framework", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600" },
  { title: "Quality Control Lab", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
];

const projects = [
  { name: "Port City Infrastructure Phase II", client: "CHEC", year: "2023", category: "Civil Works" },
  { name: "Central Expressway Section 3", client: "RDA", year: "2022", category: "Earthmoving" },
  { name: "Lotus Tower Interior Fit-out", client: "Telecommunications Regulatory Commission", year: "2021", category: "Structural" },
];

const services = [
  "High-Tensile Structural Steel Fabrication",
  "Precision Concrete Batching & Supply",
  "Heavy Earthmoving Equipment Rental (20-40 ton)",
  "CIDA CS2 Grade Project Management",
  "Civil Engineering Design & Consultancy",
  "Industrial Logistics & Material Transport",
];

export default function ProfilePage() {
  return (
    <MainLayout active="profile">
      <div className="bg-surface-container-low min-h-screen">
        {/* Profile Hero Header */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-secondary">
          <Image 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070" 
            alt="Apex Facility" 
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" />
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-32 relative z-10 pb-32">
          {/* Main Identity Card */}
          <Card className="bg-white border-none shadow-2xl shadow-secondary/10 overflow-hidden mb-12">
            <div className="flex flex-col lg:flex-row">
              {/* Identity Branding */}
              <div className="lg:w-1/3 bg-secondary p-12 text-center flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="w-32 h-32 bg-primary-container rounded-xl flex items-center justify-center text-white text-5xl font-extrabold shadow-2xl shadow-black/20 mb-8 border-4 border-white/10">
                  A
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-extrabold font-display text-white tracking-tight leading-tight">Apex Construction Solutions</h1>
                  <div className="flex flex-col items-center gap-2">
                    <Badge className="bg-primary-container text-white px-4 py-1.5 font-extrabold uppercase tracking-widest text-[10px] border-none">CIDA Grade CS2</Badge>
                    <div className="flex items-center gap-2 text-primary-container font-extrabold text-sm mt-2">
                      <Star className="w-5 h-5 fill-primary-container" />
                      <span className="text-white">4.8</span>
                      <span className="text-white/40 text-xs font-bold">(512 REVIEWS)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity Contact & Stats */}
              <div className="lg:w-2/3 p-12 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-secondary/40">Capability Overview</h3>
                    <p className="text-secondary/70 text-sm leading-relaxed">
                      Leading industrial procurement and engineering partner specializing in national-scale infrastructure projects. We provide precision-engineered materials and heavy machinery solutions with full CIDA certification.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface-container overflow-hidden">
                            <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" width={40} height={40} />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-secondary/40 uppercase tracking-widest">Trusted by 200+ Developers</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-secondary/40">Verified Credentials</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 text-sm font-bold text-secondary">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> CIDA Grade CS2 (Building)
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-secondary">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> ISO 9001:2015 Certified
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-secondary">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> National Procurement Registered
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-12 border-t border-surface-variant mt-10">
                  <Button className="bg-primary-container hover:bg-primary text-white font-bold uppercase tracking-widest text-xs px-10 h-14 rounded-md shadow-lg shadow-primary-container/20">
                    Submit RFQ Enquiry
                  </Button>
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold uppercase tracking-widest text-xs px-10 h-14 rounded-md transition-all">
                    <MessageCircle className="w-5 h-5 mr-3" /> WhatsApp Support
                  </Button>
                  <Button variant="outline" className="border-secondary/20 text-secondary hover:bg-secondary hover:text-white font-bold uppercase tracking-widest text-xs w-14 h-14 p-0 rounded-md">
                    <Phone className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Content Tabs */}
          <div className="grid gap-12 lg:grid-cols-12">
            <main className="lg:col-span-8 space-y-12">
              <Tabs defaultValue="gallery" className="w-full">
                <TabsList className="bg-white border border-surface-variant p-1 h-auto w-full justify-start rounded-md mb-8">
                  <TabsTrigger value="gallery" className="data-[state=active]:bg-secondary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-sm"><Images className="w-4 h-4 mr-2" /> Gallery</TabsTrigger>
                  <TabsTrigger value="services" className="data-[state=active]:bg-secondary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-sm"><Briefcase className="w-4 h-4 mr-2" /> Services</TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-secondary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-sm"><ShieldCheck className="w-4 h-4 mr-2" /> Projects</TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-secondary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-sm"><Star className="w-4 h-4 mr-2" /> Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gallery" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gallery.map((item, i) => (
                      <Card key={i} className="group relative aspect-video overflow-hidden border-none shadow-lg cursor-pointer">
                        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <p className="text-white font-bold text-xs uppercase tracking-widest">{item.title}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-8">
                  <Card className="border-surface-variant p-10 bg-white">
                    <h3 className="font-display font-bold text-xl text-secondary mb-8 uppercase tracking-widest">Industrial Capabilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {services.map((service, i) => (
                        <div key={i} className="flex gap-4 p-6 rounded-md bg-surface-container-low border border-surface-variant/30 hover:border-primary-container/30 transition-all group">
                          <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-primary-container shadow-sm border border-surface-variant group-hover:bg-primary-container group-hover:text-white transition-all">
                            <Zap className="w-5 h-5" />
                          </div>
                          <p className="text-sm font-bold text-secondary leading-tight flex-1 flex items-center">{service}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-8">
                  <div className="space-y-4">
                    {projects.map((project, i) => (
                      <Card key={i} className="border-surface-variant p-8 bg-white hover:border-primary-container transition-all flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 bg-secondary rounded flex flex-col items-center justify-center text-white shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Year</span>
                          <span className="font-bold">{project.year}</span>
                        </div>
                        <div className="flex-1 space-y-2 text-center md:text-left">
                          <h3 className="font-display font-extrabold text-xl text-secondary">{project.name}</h3>
                          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-secondary/40">
                            <span className="flex items-center gap-2"><Briefcase className="w-3 h-3" /> {project.category}</span>
                            <span className="flex items-center gap-2"><User className="w-3 h-3" /> {project.client}</span>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-primary-container font-bold text-xs uppercase tracking-widest">Case Study <ArrowRight className="w-4 h-4 ml-2" /></Button>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Information Grid */}
              <section className="bg-white border border-surface-variant rounded-md p-10 space-y-10">
                <div className="flex items-center gap-4">
                  <Info className="w-6 h-6 text-primary-container" />
                  <h3 className="font-display font-bold text-xl text-secondary uppercase tracking-widest">Corporate Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/40">About the Organization</h4>
                    <p className="text-sm text-secondary/70 leading-relaxed">
                      Established in 1998, Apex Construction Solutions has grown from a regional materials supplier to a national industrial powerhouse. Our headquarters in Colombo oversees a network of 5 distribution centers and 3 specialized fabrication plants.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-secondary/40">Sustainability & Safety</h4>
                    <p className="text-sm text-secondary/70 leading-relaxed">
                      We operate with a zero-accident philosophy. All site operations are strictly governed by international HSE standards, and we are committed to reducing our carbon footprint through optimized logistics.
                    </p>
                  </div>
                </div>
              </section>
            </main>

            {/* Sidebar Contact & Tools */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Contact Card */}
              <Card className="border-secondary/10 bg-secondary text-white overflow-hidden p-0">
                <div className="bg-primary-container p-8 text-center">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-white">Project Support Hotline</h3>
                  <p className="text-3xl font-extrabold mt-2">+94 11 200 5000</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex gap-4 group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-all">
                        <MapPin className="w-5 h-5 text-primary-container group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">HQ Address</p>
                        <p className="text-sm font-medium leading-relaxed">123 Builder's Way, Industrial Zone, Colombo 10, Sri Lanka</p>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-all">
                        <Mail className="w-5 h-5 text-primary-container group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Direct Email</p>
                        <p className="text-sm font-medium">procure@apexconstruction.lk</p>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-all">
                        <Globe className="w-5 h-5 text-primary-container group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Corporate Web</p>
                        <p className="text-sm font-medium">www.apexconstruction.lk</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-white text-secondary hover:bg-primary-container hover:text-white font-bold uppercase tracking-widest text-xs h-14">Download Capability Deck</Button>
                </div>
              </Card>

              {/* Verified Documents */}
              <Card className="border-surface-variant p-8 bg-white">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary/40 mb-8">Official Documents</h3>
                <div className="space-y-4">
                  {[
                    "CIDA Registration 2024.pdf",
                    "ISO 9001 Certificate.pdf",
                    "Tax Clearance Certificate.pdf",
                    "Business Registration.pdf"
                  ].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-4 bg-surface-container-low rounded-md border border-surface-variant/30 hover:border-primary-container transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-outline group-hover:text-primary-container" />
                        <span className="text-xs font-bold text-secondary uppercase tracking-tight">{doc}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-outline" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Working Hours */}
              <Card className="border-surface-variant p-8 bg-white">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary/40 mb-8">Operating Hours</h3>
                <div className="space-y-4">
                  {[
                    { days: "Monday - Friday", hours: "08:30 AM - 05:30 PM" },
                    { days: "Saturday", hours: "09:00 AM - 01:00 PM" },
                    { days: "Sunday", hours: "Closed" }
                  ].map((time) => (
                    <div key={time.days} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-secondary uppercase tracking-tight">{time.days}</span>
                      <span className="text-secondary/50 font-medium">{time.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
