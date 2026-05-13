"use client";

import React from 'react';
import Link from 'next/link';

const popularCategories = [
  "Civil Engineers", "Architects", "Steel Fabricators", "Concrete Suppliers", 
  "Electrical Contractors", "Plumbing Services", "HVAC Specialists", "Interior Designers",
  "Landscaping", "Painting Contractors", "Heavy Machinery Rental", "Tool Suppliers",
  "Safety Equipment", "Hardware Stores", "Tiling Specialists", "Roofing Contractors",
  "Solar Panel Installers", "Water Proofing", "Scaffolding Services", "Demolition Experts"
];

const popularCities = [
  "Colombo", "Gampaha", "Kandy", "Galle", "Negombo", "Jaffna", "Kurunegala", "Matara",
  "Kalutara", "Ratnapura", "Anuradhapura", "Trincomalee", "Batticaloa", "Badulla",
  "Nuwara Eliya", "Hambantota", "Polonnaruwa", "Kegalle", "Moneragala", "Mullaitivu",
  "Ampara", "Vavuniya", "Mannar", "Kilinochchi", "Dambulla", "Homagama", "Nugegoda"
];

const LinkGroup = ({ title, items }: { title: string, items: string[] }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-secondary tracking-tight">{title}</h3>
    <div className="flex flex-wrap items-center gap-y-2 text-[13px] text-secondary/60">
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          <Link 
            href={`/search?q=${encodeURIComponent(item)}`} 
            className="hover:text-[#336791] transition-colors font-medium"
          >
            {item}
          </Link>
          {idx < items.length - 1 && (
            <span className="px-3 text-secondary/20">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
    <Link href="/categories" className="inline-block text-[13px] font-bold text-[#336791] hover:underline">
      Show More
    </Link>
  </div>
);

export const PopularLinksArea = () => {
  return (
    <section className="w-full bg-white py-16 md:py-20 border-t border-surface-variant">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        <LinkGroup title="Popular Categories" items={popularCategories} />
        <LinkGroup title="Popular Cities" items={popularCities} />
      </div>
    </section>
  );
};
