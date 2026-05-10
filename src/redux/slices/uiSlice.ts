import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeModal: string | null;
  sidebarCollapsed: boolean;
  searchFilters: {
    district: string | null;
    category: string | null;
    subscriptionPlan: string | null;
  };
  searchQuery: string;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  activeModal: null,
  sidebarCollapsed: false,
  searchFilters: {
    district: null,
    category: null,
    subscriptionPlan: null,
  },
  searchQuery: "",
  theme: 'light',
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    updateSearchFilters: (state, action: PayloadAction<Partial<UIState['searchFilters']>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    resetFilters: (state) => {
      state.searchFilters = initialState.searchFilters;
      state.searchQuery = "";
    },
  },
});

export const { 
  setActiveModal, 
  setSidebarCollapsed, 
  updateSearchFilters, 
  setSearchQuery, 
  toggleTheme,
  resetFilters 
} = uiSlice.actions;

export default uiSlice.reducer;
