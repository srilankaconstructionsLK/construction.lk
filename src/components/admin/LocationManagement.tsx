"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { LocationService, District } from "@/services/supabase/LocationService";
import { useAppSelector } from "@/redux/hooks";

// Sub-components
import { LocationManagementHeader } from "./location-management/LocationManagementHeader";
import { LocationManagementStats } from "./location-management/LocationManagementStats";
import { LocationManagementDistrictsList } from "./location-management/LocationManagementDistrictsList";
import { LocationManagementCityManager } from "./location-management/LocationManagementCityManager";

type NoticeType = "success" | "error" | "info";

export function LocationManagement() {
  const { districts: reduxDistricts, loading: reduxLoading } = useAppSelector((state) => state.location);
  
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [dirtyDistricts, setDirtyDistricts] = useState<Set<string>>(new Set());

  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState<number | null>(null);
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [bulkCities, setBulkCities] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [notice, setNotice] = useState<{ type: NoticeType; message: string } | null>(null);

  // Initialize local draft state from Redux once it's loaded
  useEffect(() => {
    if (!reduxLoading) {
      setDistricts(reduxDistricts);
      setLoading(false);
    }
  }, [reduxDistricts, reduxLoading]);

  const selectedDistrict =
    selectedDistrictIndex !== null ? districts[selectedDistrictIndex] : null;

  const filteredDistricts = useMemo(() => {
    if (!searchTerm.trim()) return districts;
    const lower = searchTerm.toLowerCase();
    return districts.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.cities.some((c) => c.toLowerCase().includes(lower)),
    );
  }, [districts, searchTerm]);

  const totals = useMemo(() => {
    const totalLocations = districts.reduce((acc, d) => acc + d.cities.length, 0);
    const activeDistricts = districts.filter((d) => d.cities.length > 0).length;
    const verifiedCoverage = districts.length
      ? ((activeDistricts / districts.length) * 100).toFixed(1)
      : "0.0";
    return { totalLocations, activeDistricts, verifiedCoverage };
  }, [districts]);

  const setInfo = (type: NoticeType, message: string) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), 5000);
  };

  const addDistrict = () => {
    const name = newDistrictName.trim();
    if (!name) return;
    if (districts.some((d) => d.name.toLowerCase() === name.toLowerCase())) {
      setInfo("error", "District already exists.");
      return;
    }
    setDistricts((prev) => [...prev, { name, cities: [] }]);
    setNewDistrictName("");
    setDirtyDistricts((prev) => new Set(prev).add(name));
    setHasUnsavedChanges(true);
    setInfo("success", "District added locally.");
  };

  const deleteDistrict = (index: number) => {
    const target = districts[index];
    if (!target) return;
    if (!confirm(`Delete ${target.name} district and all its cities?`)) return;

    setDistricts((prev) => prev.filter((_, i) => i !== index));
    if (selectedDistrictIndex === index) setSelectedDistrictIndex(null);
    setHasUnsavedChanges(true);
    setInfo("info", `${target.name} district removed locally.`);
  };

  const addCity = () => {
    if (selectedDistrictIndex === null) return;
    const city = newCityName.trim();
    if (!city) return;

    const current = districts[selectedDistrictIndex];
    if (!current) return;

    if (current.cities.some((c) => c.toLowerCase() === city.toLowerCase())) {
      setInfo("error", "City already exists in this district.");
      return;
    }

    const updated = [...districts];
    updated[selectedDistrictIndex] = {
      ...current,
      cities: [...current.cities, city].sort(),
    };

    setDistricts(updated);
    setNewCityName("");
    setDirtyDistricts((prev) => new Set(prev).add(current.name));
    setHasUnsavedChanges(true);
    setInfo("success", "City added locally.");
  };

  const addBulkCities = () => {
    if (selectedDistrictIndex === null || !bulkCities.trim()) return;

    const cityList = bulkCities
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    if (cityList.length === 0) return;

    const current = districts[selectedDistrictIndex];
    if (!current) return;

    const existing = new Set(current.cities.map((c) => c.toLowerCase()));
    const toAdd = cityList.filter((c) => !existing.has(c.toLowerCase()));

    if (toAdd.length === 0) {
      setInfo("error", "All cities already exist in this district.");
      return;
    }

    const updated = [...districts];
    updated[selectedDistrictIndex] = {
      ...current,
      cities: [...current.cities, ...toAdd].sort(),
    };

    setDistricts(updated);
    setBulkCities("");
    setDirtyDistricts((prev) => new Set(prev).add(current.name));
    setHasUnsavedChanges(true);
    setInfo("success", `${toAdd.length} cities added locally.`);
  };

  const deleteCity = (cityIndex: number) => {
    if (selectedDistrictIndex === null) return;

    const updated = [...districts];
    const current = updated[selectedDistrictIndex];
    if (!current) return;

    updated[selectedDistrictIndex] = {
      ...current,
      cities: current.cities.filter((_, i) => i !== cityIndex),
    };

    setDistricts(updated);
    setDirtyDistricts((prev) => new Set(prev).add(current.name));
    setHasUnsavedChanges(true);
    setInfo("info", "City removed locally.");
  };

  const publishChanges = async () => {
    try {
      setIsPublishing(true);
      await LocationService.updateLocationsAggregation(districts, new Set(dirtyDistricts));
      setDirtyDistricts(new Set());
      setHasUnsavedChanges(false);
      setInfo("success", "Location hierarchy published successfully.");
    } catch (error) {
      console.error(error);
      setInfo("error", "Failed to publish changes.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-bold text-secondary/40 uppercase tracking-widest">
          Reconstructing Hierarchy...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col -m-4 md:-m-5 lg:-m-6">
      <LocationManagementHeader 
        hasUnsavedChanges={hasUnsavedChanges}
        isPublishing={isPublishing}
        onPublish={publishChanges}
      />

      <div className="px-6 pb-12 w-full space-y-6">
        <LocationManagementStats 
          totalLocations={totals.totalLocations}
          activeDistricts={totals.activeDistricts}
          verifiedCoverage={totals.verifiedCoverage}
        />

        {notice && (
          <div className={`rounded-sm border px-4 py-2 text-[11px] font-bold uppercase tracking-wider animate-in fade-in duration-300 ${
            notice.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : notice.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-slate-50 border-slate-200 text-slate-600"
          }`}>
            {notice.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <LocationManagementDistrictsList 
              districts={districts}
              filteredDistricts={filteredDistricts}
              selectedDistrictIndex={selectedDistrictIndex}
              onSelect={setSelectedDistrictIndex}
              onDelete={deleteDistrict}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              newDistrictName={newDistrictName}
              onNewDistrictNameChange={setNewDistrictName}
              onAdd={addDistrict}
            />
          </div>

          <div className="lg:col-span-8 h-full min-h-[600px]">
            <LocationManagementCityManager 
              selectedDistrict={selectedDistrict}
              onDeleteCity={deleteCity}
              newCityName={newCityName}
              onNewCityNameChange={setNewCityName}
              onAddCity={addCity}
              bulkCities={bulkCities}
              onBulkCitiesChange={setBulkCities}
              onAddBulkCities={addBulkCities}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
