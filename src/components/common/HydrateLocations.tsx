// src/components/common/HydrateLocations.tsx
"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setDistricts } from "@/redux/slices/locationSlice";
import { District } from "@/services/supabase/LocationService";

interface HydrateLocationsProps {
  districts: District[];
}

/**
 * A client component that hydrates the Redux store with locations 
 * fetched on the server.
 */
export function HydrateLocations({ districts }: HydrateLocationsProps) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(setDistricts(districts));
    initialized.current = true;
  }

  return null;
}
