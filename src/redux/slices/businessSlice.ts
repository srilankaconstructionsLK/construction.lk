import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BusinessProfile, getBusinessesByUserId } from "@/services/business";
import { SupabaseClient } from "@supabase/supabase-js";

interface BusinessState {
  myBusinesses: BusinessProfile[];
  selectedBusiness: BusinessProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  myBusinesses: [],
  selectedBusiness: null,
  loading: false,
  error: null,
};

// Fetch my businesses - used by business owners
export const fetchMyBusinesses = createAsyncThunk(
  "business/fetchMine",
  async ({ supabase, userId }: { supabase: SupabaseClient; userId: string }, { rejectWithValue }) => {
    try {
      return await getBusinessesByUserId(supabase, userId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setSelectedBusiness: (state, action: PayloadAction<BusinessProfile | null>) => {
      state.selectedBusiness = action.payload;
    },
    clearBusinessState: (state) => {
      state.myBusinesses = [];
      state.selectedBusiness = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBusinesses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        state.myBusinesses = action.payload;
      })
      .addCase(fetchMyBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedBusiness, clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
