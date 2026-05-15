"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Trash2 } from "lucide-react";
import { District } from "@/services/supabase/LocationService";

interface CityManagerProps {
  selectedDistrict: District | null;
  onDeleteCity: (index: number) => void;
  newCityName: string;
  onNewCityNameChange: (val: string) => void;
  onAddCity: () => void;
  bulkCities: string;
  onBulkCitiesChange: (val: string) => void;
  onAddBulkCities: () => void;
}

export function LocationManagementCityManager({
  selectedDistrict,
  onDeleteCity,
  newCityName,
  onNewCityNameChange,
  onAddCity,
  bulkCities,
  onBulkCitiesChange,
  onAddBulkCities,
}: CityManagerProps) {
  if (!selectedDistrict) {
    return (
      <div className="h-full min-h-[420px] bg-white border border-surface-variant rounded-sm flex items-center justify-center text-center px-8">
        <div>
          <MapPin className="w-10 h-10 mx-auto mb-4 text-secondary/20" />
          <h3 className="text-sm font-black text-secondary uppercase tracking-widest mb-2">No district selected</h3>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-wider">Pick a district from the left panel to manage cities.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="bg-white rounded-sm border border-surface-variant shadow-sm overflow-hidden flex flex-col h-full">
        <div className="px-6 py-5 border-b border-surface-variant flex items-center justify-between bg-white flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-sm border border-primary/20 shadow-sm">
              <MapPin size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-secondary tracking-tight leading-none mb-1">{selectedDistrict.name}</h2>
              <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest leading-none">Regional Distribution Center</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-surface-container-low text-secondary/60 border-surface-variant px-4 py-1.5 rounded-full font-mono font-bold text-xs">
            {selectedDistrict.cities.length} ACTIVE CITIES
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-6 max-h-[500px]">
          {selectedDistrict.cities.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-secondary/30">
              <MapPin size={48} className="opacity-20 mb-4" />
              <p className="text-[11px] font-bold uppercase tracking-[4px]">
                No cities registered in {selectedDistrict.name}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedDistrict.cities.map((city, idx) => (
                <div
                  key={`${city}-${idx}`}
                  className="group flex items-center justify-between px-4 py-3 bg-surface-container-low border border-surface-variant rounded-sm hover:border-primary/20 hover:bg-primary/5 transition-all"
                >
                  <span className="text-xs font-bold text-secondary/80 tracking-tight">{city}</span>
                  <button
                    onClick={() => onDeleteCity(idx)}
                    className="p-1 px-2 text-secondary/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-surface-container-lowest border-t border-surface-variant space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Add new city</p>
              <div className="flex gap-2">
                <Input
                  placeholder="City name..."
                  value={newCityName}
                  onChange={(e) => onNewCityNameChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onAddCity()}
                  className="h-11 bg-white border-surface-variant rounded-sm text-xs font-bold"
                />
                <Button onClick={onAddCity} className="bg-primary-container hover:bg-primary text-white h-11 px-6 rounded-sm text-xs font-black uppercase tracking-widest">
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Bulk ingestion (CSV)</p>
              <div className="flex gap-2">
                <textarea
                  placeholder="Gampaha, Negombo, Wattala..."
                  value={bulkCities}
                  onChange={(e) => onBulkCitiesChange(e.target.value)}
                  className="w-full h-11 px-3 py-2 bg-white border border-surface-variant rounded-sm text-xs font-bold resize-none outline-none"
                />
                <Button onClick={onAddBulkCities} className="bg-secondary hover:bg-secondary/90 text-white h-11 px-6 rounded-sm text-xs font-black uppercase tracking-widest">
                  Import
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
