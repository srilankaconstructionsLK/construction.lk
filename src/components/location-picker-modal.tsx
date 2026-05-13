"use client";

import { ChevronRight, MapPin, Search, ArrowLeft, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setLocationWithPersist, District } from '@/redux/slices/locationSlice';
import { setLocationPickerOpen } from '@/redux/slices/uiSlice';

export const LocationPickerModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation: currentLocation, districts } = useSelector((state: RootState) => state.location);
  const { isLocationPickerOpen: isOpen } = useSelector((state: RootState) => state.ui);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [showCitiesMobile, setShowCitiesMobile] = useState(false);

  // Sync selectedDistrict with districts when they load or modal opens
  useEffect(() => {
    if (isOpen && districts.length > 0 && !selectedDistrict) {
      setSelectedDistrict(districts[0]);
    }
  }, [isOpen, districts, selectedDistrict]);

  // Search logic
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lower = searchTerm.toLowerCase();
    const results: { city: string; district: string }[] = [];
    
    districts.forEach(d => {
      d.cities.forEach(c => {
        if (c.toLowerCase().includes(lower) || d.name.toLowerCase().includes(lower)) {
          results.push({ city: c, district: d.name });
        }
      });
    });
    return results.slice(0, 20);
  }, [searchTerm, districts]);

  const handleSelect = (location: string) => {
    dispatch(setLocationWithPersist(location));
    dispatch(setLocationPickerOpen(false));
  };

  const onClose = () => {
    dispatch(setLocationPickerOpen(false));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-surface-variant flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-variant bg-white">
          <div>
            <h3 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Select Strategic Location</h3>
            <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Sourcing by regional availability</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary/5 rounded-sm transition-colors text-secondary">
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Districts Sidebar */}
          <div className={`lg:w-[35%] w-full flex-col bg-surface border-r border-surface-variant overflow-y-auto ${showCitiesMobile && !searchTerm ? "hidden lg:flex" : "flex"}`}>
            <button
              onClick={() => handleSelect("All Sri Lanka")}
              className="flex items-center gap-3 px-6 py-4 border-b border-surface-variant hover:bg-white group transition-all"
            >
              <div className="w-8 h-8 bg-primary-container rounded-sm flex items-center justify-center text-white shadow-lg shadow-primary-container/20 group-hover:scale-110 transition-transform">
                <MapPin size={14} />
              </div>
              <span className="text-[10px] font-black text-primary-container uppercase tracking-widest">All Sri Lanka</span>
            </button>

            {districts.map((district) => (
              <button
                key={district.name}
                onClick={() => {
                  setSelectedDistrict(district);
                  setShowCitiesMobile(true);
                }}
                className={`flex items-center justify-between px-6 py-3 border-b border-surface-variant hover:bg-white transition-all text-left ${selectedDistrict?.name === district.name ? "bg-white border-r-4 border-r-primary-container" : ""}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedDistrict?.name === district.name ? "text-secondary" : "text-secondary/50"}`}>{district.name}</span>
                <ChevronRight size={14} className={selectedDistrict?.name === district.name ? "text-primary-container" : "text-secondary/20"} />
              </button>
            ))}
          </div>

          {/* Cities / Search Area */}
          <div className={`lg:w-[65%] w-full flex-col overflow-hidden bg-white ${!showCitiesMobile && !searchTerm ? "hidden lg:flex" : "flex"}`}>
            
            {/* Search Input */}
            <div className="p-4 border-b border-surface-variant flex items-center gap-2">
              {showCitiesMobile && !searchTerm && (
                <button onClick={() => setShowCitiesMobile(false)} className="lg:hidden p-2 text-secondary">
                  <ArrowLeft size={18} />
                </button>
              )}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="SEARCH CITY OR DISTRICT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface border border-surface-variant rounded-sm text-[10px] font-black uppercase tracking-widest text-secondary focus:outline-none focus:border-primary-container transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4">
              {searchTerm.trim() !== "" ? (
                /* Search Results */
                <div className="space-y-1">
                  {searchResults.map((res, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(res.city)}
                      className="w-full flex items-center justify-between p-3 rounded-sm hover:bg-surface group transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-secondary/20 group-hover:text-primary-container" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{res.city}</span>
                          <span className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest">in {res.district}</span>
                        </div>
                      </div>
                      <ArrowLeft className="w-3 h-3 text-primary-container rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              ) : selectedDistrict ? (
                /* Cities List */
                <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="px-2">
                    <h4 className="text-[10px] font-black text-secondary uppercase tracking-widest">Areas in {selectedDistrict.name}</h4>
                    <div className="w-8 h-0.5 bg-primary-container mt-2"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    <button
                      onClick={() => handleSelect(selectedDistrict.name)}
                      className="col-span-full p-3 rounded-sm hover:bg-surface text-primary-container font-black text-[9px] uppercase tracking-widest transition-all border-b border-surface-variant/50 text-left"
                    >
                      All areas in {selectedDistrict.name}
                    </button>
                    {selectedDistrict.cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleSelect(city)}
                        className={`p-3 rounded-sm text-left transition-all group ${currentLocation === city ? "bg-primary-container/5 text-primary-container ring-1 ring-primary-container/20" : "hover:bg-surface text-secondary/60 hover:text-secondary"}`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">{city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
