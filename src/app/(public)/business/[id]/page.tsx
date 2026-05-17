import { Button } from "@/components/ui/button";
import { MOCK_BUSINESSES } from "@/data/mock-businesses";
import { BusinessService } from "@/services/supabase/BusinessService";
import type { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import {
  BadgeCheck,
  Briefcase,
  Eye,
  FileText,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  QrCode,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BusinessProfileHero } from "@/components/business/BusinessProfileHero";
import { BusinessProfileSideAd } from "@/components/business/BusinessProfileSideAd";

// Server-side supabase client for public data
const supabaseAdmin = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let business = MOCK_BUSINESSES.find((b) => b.id === id) as any;

  if (!business) {
    business = await BusinessService.getBusinessById(supabaseAdmin, id);
  }

  return {
    title: `${business?.title || "Business"} | Construction.lk`,
    description:
      business?.description?.substring(0, 160) ||
      "Construction business profile",
  };
}

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let business = MOCK_BUSINESSES.find((b) => b.id === id) as any;

  if (!business) {
    business = await BusinessService.getBusinessById(supabaseAdmin, id);
  }

  if (!business) {
    return (
      <div className="py-40 text-center space-y-4">
        <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
          Business not found.
        </h2>
        <p className="text-secondary/40 text-sm">
          The ID "{id}" does not exist in our industrial database.
        </p>
        <Link href="/search">
          <Button
            variant="outline"
            className="mt-4 border-surface-variant text-secondary font-black uppercase text-[10px] tracking-widest px-8 h-12"
          >
            Return to Search
          </Button>
        </Link>
      </div>
    );
  }

  const logo =
    business.profile_images_info?.logo_url ||
    "https://via.placeholder.com/200?text=Logo";
  const cover =
    business.profile_images_info?.cover_url ||
    "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070";
  const gallery = business.profile_images_info?.gallery || [
    cover,
    cover,
    cover,
  ];

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* 1. Unified Hero Slider (Ads + Gallery) */}
      <BusinessProfileHero gallery={gallery} />

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex flex-col md:flex-row items-start gap-8 w-full">
            {/* Logo Box - Overlapping and Black as per SS */}
            <div className="h-44 w-44 shrink-0 bg-black border-4 border-white shadow-lg -mt-16 z-20 relative flex items-center justify-center p-2">
              <div className="relative h-full w-full">
                <Image src={logo} alt="Logo" fill className="object-contain" sizes="176px" />
              </div>
            </div>

            {/* Title & Stats */}
            <div className="flex-1 pt-4 space-y-4">
              <div className="space-y-1 text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-secondary flex items-center gap-2">
                  {business.title}
                  {business.verified && (
                    <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" />
                  )}
                </h1>
                <p className="text-secondary/60 text-sm font-medium">
                  Construction &bull; {business.cida_grading || "General"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-secondary/50 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#00a651] text-white px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                    {business.rating} <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span>({business.review_count} Reviews)</span>
                </div>
                <div className="h-4 w-px bg-surface-variant" />
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{business.visit_count || 0} Views</span>
                </div>
                <div className="h-4 w-px bg-surface-variant" />
                <span>{business.city}</span>
                <div className="h-4 w-px bg-surface-variant" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${business.is_open ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span
                    className={`${business.is_open ? "text-green-500" : "text-red-500"} uppercase font-bold tracking-wider`}
                  >
                    {business.is_open ? "Open" : "Closed"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-surface-variant/20 hover:bg-surface-variant/40 transition-all">
                  <Share2 className="w-4 h-4 text-secondary/60" />
                </button>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button className="bg-[#00a651] hover:bg-[#008f45] text-white font-bold h-10 px-6 rounded-md flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +94777489200
                </Button>
                <Button
                  variant="outline"
                  className="border-surface-variant text-secondary font-bold h-10 px-6 rounded-md flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Chat
                </Button>
                <Button
                  variant="outline"
                  className="border-surface-variant text-secondary font-bold h-10 px-6 rounded-md flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Column: Details & Tabs */}
          <div className="lg:col-span-8 space-y-12">
            {/* Tabbed Navigation (High-Fidelity) */}
            <div className="bg-white border border-surface-variant rounded-md p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { name: "Gallery", icon: LayoutGrid },
                { name: "Services", icon: Briefcase },
                { name: "Projects", icon: ShieldCheck },
                { name: "Reviews", icon: Star },
              ].map((tab, i) => (
                <button
                  key={tab.name}
                  className={`flex items-center gap-3 px-6 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap rounded-sm ${
                    i === 0
                      ? "bg-[#53616a] text-white shadow-md"
                      : "text-[#8b5e3c] hover:bg-surface transition-colors"
                  }`}
                >
                  <tab.icon
                    className={`w-4 h-4 ${i === 0 ? "text-white" : "text-[#8b5e3c]"}`}
                  />
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Gallery Grid (Active Tab Content) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((img: string, i: number) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] bg-surface-variant group overflow-hidden border border-surface-variant"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-secondary uppercase tracking-tight flex items-center">
                <FileText className="w-6 h-6 mr-3 text-primary-container" />
                Company Profile
              </h2>
              <div className="bg-white border border-surface-variant p-8 md:p-10">
                <p className="text-secondary/60 leading-relaxed text-sm font-medium">
                  {business.description ||
                    "No description available for this business."}
                </p>

                {/* Secondary Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-surface">
                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">
                      Established
                    </div>
                    <div className="text-sm font-black text-secondary">
                      {business.year_established || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">
                      BR Number
                    </div>
                    <div className="text-sm font-black text-secondary">
                      {business.br_number || "Pending"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">
                      VAT Status
                    </div>
                    <div className="text-sm font-black text-secondary">
                      {business.is_vat_registered ? "Registered" : "Non-VAT"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">
                      Coverage
                    </div>
                    <div className="text-sm font-black text-secondary">
                      {business.service_districts?.length || 1} Districts
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products/Tags Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-secondary uppercase tracking-tight flex items-center">
                <ShieldCheck className="w-6 h-6 mr-3 text-primary-container" />
                Expertise & Capabilities
              </h2>
              <div className="flex flex-wrap gap-3">
                {business.tags?.map((tag: string) => (
                  <div
                    key={tag}
                    className="bg-white border-2 border-surface-variant px-6 py-3 text-[10px] font-black uppercase tracking-widest text-secondary hover:border-primary-container transition-colors cursor-default"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-secondary uppercase tracking-tight flex items-center">
                <Star className="w-6 h-6 mr-3 text-primary-container" />
                Network Trust
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(business.reviews || []).map((rev: any) => (
                  <div
                    key={rev.id}
                    className="bg-white border border-surface-variant p-6 space-y-4"
                  >
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < rev.rating
                              ? "fill-current"
                              : "text-surface-variant"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-secondary/60 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <div className="pt-4 border-t border-surface flex items-center justify-between">
                      <div className="text-[10px] font-black text-secondary uppercase tracking-widest">
                        - {rev.author}
                      </div>
                      <div className="text-[10px] font-bold text-secondary/30 uppercase">
                        {rev.company}
                      </div>
                    </div>
                  </div>
                ))}
                {(!business.reviews || business.reviews.length === 0) && (
                  <div className="col-span-full py-12 text-center border border-dashed border-surface-variant text-secondary/30 text-xs font-black uppercase tracking-widest">
                    No verified reviews yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Sidebar (as in SS) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#f8fafc] border border-surface-variant rounded-xl overflow-hidden shadow-sm">
              {/* QR Section */}
              <div className="p-8 flex flex-col items-center text-center space-y-4 border-b border-surface-variant/50">
                <div className="relative w-44 h-44 bg-white p-4 shadow-sm">
                  <QrCode size={144} className="text-secondary" />
                </div>
                <div className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">
                  Scan to view profile
                </div>
              </div>

              {/* Contact Details Section */}
              <div className="p-8 space-y-6 border-b border-surface-variant/50 text-left">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-secondary/40 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-secondary leading-snug">
                        {business.contact_info?.address ||
                          "123 Builder's Way, Industrial Zone, Cityville, 40001"}
                      </p>
                      <button className="text-sm font-bold text-[#3b82f6] hover:underline">
                        Get Directions
                      </button>
                    </div>
                  </div>
                  {/* Small Map Thumbnail */}
                  <div className="h-16 w-16 shrink-0 bg-surface rounded-lg border border-surface-variant overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-red-500 fill-current opacity-20" />
                      <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=6.9271,79.8612&zoom=13&size=64x64&key=AIzaSy...')] bg-cover opacity-60" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary/40 shrink-0" />
                  <p className="text-sm font-medium text-secondary">
                    {business.contact_info?.phone || "+1-800-BUILDER"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary/40 shrink-0" />
                  <p className="text-sm font-medium text-secondary break-all">
                    {business.contact_info?.email ||
                      "contact@apexconstruction.com"}
                  </p>
                </div>
              </div>

              {/* Lead Generation Form */}
              <div className="p-8 space-y-6 text-left">
                <h3 className="text-lg font-bold text-secondary">
                  Lead Generation
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-12 px-4 rounded-md border border-surface-variant bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="w-full h-12 px-4 rounded-md border border-surface-variant bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-surface-variant bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                  <Button className="w-full h-12 bg-[#336791] hover:bg-[#28557a] text-white font-bold text-base rounded-md">
                    Send Enquiry
                  </Button>
                </div>
              </div>
            </div>

            {/* Verification Badge Section */}
            <div className="bg-white border border-surface-variant p-6 flex items-center justify-between rounded-xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-green-600" />
                <div className="space-y-0.5 text-left">
                  <div className="text-xs font-black text-secondary uppercase tracking-widest">
                    Verified Supplier
                  </div>
                  <div className="text-[10px] text-secondary/40 font-medium">
                    Verified by Construction.lk Network
                  </div>
                </div>
              </div>
              <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" />
            </div>

            {/* Business Profile Side Ad (Moved to Bottom) */}
            <div className="pt-4">
              <BusinessProfileSideAd />
            </div>
          </aside>
        </div>

        {/* Simple Bottom Footer for Profile */}
        <div className="mt-24 pt-12 border-t border-surface-variant flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-black uppercase tracking-widest text-secondary/30">
          <div className="flex items-center gap-8">
            <Link
              href="/about"
              className="hover:text-secondary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-secondary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="hover:text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            © {new Date().getFullYear()} Construction.lk Industrial Network
          </div>
        </div>
      </div>
    </div>
  );
}
