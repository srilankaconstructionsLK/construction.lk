// src/redux/slices/locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { LocationService, District } from "@/services/supabase/LocationService";

export type { District };

interface LocationState {
  selectedLocation: string;
  districts: District[];
  loading: boolean;
  lastFetched: number | null;
}

const initialState: LocationState = {
  selectedLocation: "All Sri Lanka",
  districts: [],
  loading: true,
  lastFetched: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
    setDistricts: (state, action: PayloadAction<District[]>) => {
      state.districts = action.payload;
      state.loading = false;
      state.lastFetched = Date.now();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLocation, setDistricts, setLoading } = locationSlice.actions;

/**
 * Thunk: sets location in store AND persists to localStorage
 */
export const setLocationWithPersist =
  (location: string): AppThunk =>
  (dispatch) => {
    dispatch(setLocation(location));
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_location", location);
    }
  };

/**
 * Thunk: reads from localStorage after hydration and syncs to store
 */
export const hydrateLocation = (): AppThunk => (dispatch) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("selected_location");
    if (saved) {
      dispatch(setLocation(saved));
    }
  }
};

/**
 * Thunk: Fetches locations from Supabase and updates the store.
 */
export const fetchLocationsAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const districts = await LocationService.getLocationsHierarchy();
    dispatch(setDistricts(districts));
  } catch (error) {
    console.error("Failed to fetch locations in Redux:", error);
    dispatch(setLoading(false));
  }
};

export default locationSlice.reducer;
