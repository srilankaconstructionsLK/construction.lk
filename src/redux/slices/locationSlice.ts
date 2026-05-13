import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

export interface District {
  name: string;
  cities: string[];
}

interface LocationState {
  selectedLocation: string;
  districts: District[];
}

const mockDistricts: District[] = [
  {
    name: "Colombo",
    cities: [
      "Colombo 1-15",
      "Dehiwala",
      "Mount Lavinia",
      "Moratuwa",
      "Kotte",
      "Battaramulla",
      "Nugegoda",
      "Piliyandala",
      "Maharagama",
      "Homagama",
    ],
  },
  {
    name: "Gampaha",
    cities: [
      "Negombo",
      "Gampaha City",
      "Veyangoda",
      "Kiribathgoda",
      "Kadawatha",
      "Kelaniya",
      "Ja-Ela",
      "Wattala",
      "Minuwangoda",
    ],
  },
  {
    name: "Kandy",
    cities: [
      "Kandy City",
      "Peradeniya",
      "Gampola",
      "Katugastota",
      "Kundasale",
      "Akurana",
      "Wathelage",
    ],
  },
  {
    name: "Kalutara",
    cities: [
      "Kalutara City",
      "Panadura",
      "Horana",
      "Beruwala",
      "Matugama",
      "Aluthgama",
    ],
  },
  {
    name: "Galle",
    cities: [
      "Galle City",
      "Hikkaduwa",
      "Ambalangoda",
      "Karapitiya",
      "Baddegama",
      "Elpitiya",
    ],
  },
  {
    name: "Matara",
    cities: ["Matara City", "Weligama", "Dikwella", "Hakmana", "Kamburupitiya"],
  },
];

const initialState: LocationState = {
  selectedLocation: "All Sri Lanka",
  districts: mockDistricts,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // Pure reducer — no side effects
    setLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
    setDistricts: (state, action: PayloadAction<District[]>) => {
      state.districts = action.payload;
    },
  },
});

export const { setLocation, setDistricts } = locationSlice.actions;

// Thunk: sets location in store AND persists to localStorage
export const setLocationWithPersist =
  (location: string): AppThunk =>
  (dispatch) => {
    dispatch(setLocation(location));
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_location", location);
    }
  };

// Thunk: reads from localStorage after hydration and syncs to store
export const hydrateLocation = (): AppThunk => (dispatch) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("selected_location");
    if (saved) {
      dispatch(setLocation(saved));
    }
  }
};

export default locationSlice.reducer;
