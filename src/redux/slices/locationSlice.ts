// src/redux/slices/locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { LocationService, District } from "@/services/supabase/LocationService";

export type { District };

interface LocationState {
  selectedLocation: string;
  districts: District[];
  loading: boolean;
}

const initialState: LocationState = {
  selectedLocation: "All Sri Lanka",
  districts: [],
  loading: true,
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
 * Thunk: Starts a real-time listener for location data from Supabase.
 * This keeps the Redux store in sync with the database for all users.
 */
export const startLocationSync = (): AppThunk<() => void> => (dispatch, getState) => {
  // Only set loading if we don't have districts yet to prevent flicker on re-init
  if (getState().location.districts.length === 0) {
    dispatch(setLoading(true));
  }

  const unsubscribe = LocationService.listenToLocationsAggregation((districts) => {
    dispatch(setDistricts(districts));
  });

  return unsubscribe;
};

export default locationSlice.reducer;
