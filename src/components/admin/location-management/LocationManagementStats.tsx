"use client";

import { Globe, Navigation, ShieldCheck } from "lucide-react";

interface StatsProps {
  totalLocations: number;
  activeDistricts: number;
  verifiedCoverage: string;
}

export function LocationManagementStats({
  totalLocations,
  activeDistricts,
  verifiedCoverage,
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest leading-none mb-2">Total Locations</p>
          <h3 className="text-xl font-black text-secondary tracking-tight">{totalLocations.toLocaleString()}</h3>
        </div>
        <Globe className="w-8 h-8 text-secondary/10" />
      </div>
      <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest leading-none mb-2">Active Districts</p>
          <h3 className="text-xl font-black text-secondary tracking-tight">{activeDistricts}</h3>
        </div>
        <Navigation className="w-8 h-8 text-secondary/10" />
      </div>
      <div className="bg-white border border-surface-variant p-5 rounded-md flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest leading-none mb-2">Verified Coverage</p>
          <h3 className="text-xl font-black text-emerald-500 tracking-tight">{verifiedCoverage}%</h3>
        </div>
        <ShieldCheck className="w-8 h-8 text-emerald-500/10" />
      </div>
    </div>
  );
}
