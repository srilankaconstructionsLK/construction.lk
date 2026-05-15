import { UserProfile, UserService } from "@/services/supabase/UserService";
import { BusinessProfile } from "@/services/supabase/BusinessService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  users: UserProfile[];
  businesses: BusinessProfile[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

const initialState: AdminState = {
  users: [],
  businesses: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// Fetch users for admin management
export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (
    { page, limit, search }: { page: number; limit: number; search?: string },
    { rejectWithValue },
  ) => {
    try {
      const result = await UserService.getUsersPaginated(page, limit, search);
      return { ...result, page, limit };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      return rejectWithValue(message);
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Businesses are currently fetched outside this slice and normalized via this action.
    // Add a dedicated fetchAdminBusinesses thunk when business pagination/filtering is moved into Redux.
    setBusinesses: (state, action: PayloadAction<BusinessProfile[]>) => {
      state.businesses = action.payload;
    },
    clearAdminState: (state) => {
      state.users = [];
      state.businesses = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination.totalItems = action.payload.count || 0;
        state.pagination.currentPage = action.payload.page;
        state.pagination.totalPages = Math.ceil(
          (action.payload.count || 0) / action.payload.limit,
        );
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBusinesses, clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
