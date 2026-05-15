"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { District } from "@/services/supabase/LocationService";

interface DistrictsListProps {
  districts: District[];
  filteredDistricts: District[];
  selectedDistrictIndex: number | null;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  newDistrictName: string;
  onNewDistrictNameChange: (val: string) => void;
  onAdd: () => void;
}

export function LocationManagementDistrictsList({
  districts,
  filteredDistricts,
  selectedDistrictIndex,
  onSelect,
  onDelete,
  searchTerm,
  onSearchChange,
  newDistrictName,
  onNewDistrictNameChange,
  onAdd,
}: DistrictsListProps) {
  return (
    <div className="bg-white rounded-sm border border-surface-variant shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-variant bg-surface-container-lowest flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-secondary uppercase tracking-wider">Districts List</h3>
        <Badge variant="outline" className="bg-white text-secondary/50 border-surface-variant px-2 py-0 h-5">
          {districts.length} Unit
        </Badge>
      </div>

      <div className="p-4 border-b border-surface-variant bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary/30" />
          <input
            placeholder="Search by district or city..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full pl-9 pr-4 bg-surface-container-low border-none rounded-sm text-[10px] font-bold tracking-wider placeholder:text-secondary/40 outline-none"
          />
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {filteredDistricts.length === 0 ? (
          <div className="py-12 text-center text-[10px] font-bold text-secondary/30 uppercase italic tracking-widest">
            No Districts Found
          </div>
        ) : (
          <div className="divide-y divide-surface-variant">
            {filteredDistricts.map((district) => {
              const realIndex = districts.findIndex((d) => d.name === district.name);
              const selected = selectedDistrictIndex === realIndex;
              return (
                <div
                  key={district.name}
                  onClick={() => onSelect(realIndex)}
                  className={`flex items-center justify-between px-5 py-4 cursor-pointer group transition-all ${
                    selected ? "bg-primary/5 border-r-4 border-primary" : "hover:bg-surface-container-lowest"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${selected ? "bg-primary" : "bg-secondary/20"}`} />
                    <div>
                      <p className={`text-xs font-bold tracking-tight ${selected ? "text-secondary" : "text-secondary/80"}`}>
                        {district.name}
                      </p>
                      <p className="text-[9px] text-secondary/40 font-mono">{district.cities.length} Cities Registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(realIndex);
                      }}
                      className="p-2 text-secondary/20 hover:text-red-500 hover:bg-red-50 rounded-sm opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronRight className={`w-3.5 h-3.5 ${selected ? "text-primary" : "text-secondary/20"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 bg-surface-container-lowest border-t border-surface-variant">
        <div className="flex gap-2">
          <Input
            placeholder="Add New District"
            value={newDistrictName}
            onChange={(e) => onNewDistrictNameChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            className="h-10 bg-white border-surface-variant rounded-sm text-xs font-bold"
          />
          <Button onClick={onAdd} className="bg-secondary hover:bg-secondary/90 text-white w-10 h-10 p-0 rounded-sm">
            <Plus size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
