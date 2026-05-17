// src/redux/slices/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { CategoryService, Category } from "@/services/supabase/CategoryService";

interface CategoryState {
  items: Category[];
  loading: boolean;
  lastFetched: number | null;
}

const initialState: CategoryState = {
  items: [],
  loading: true,
  lastFetched: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.lastFetched = Date.now();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setLoading } = categorySlice.actions;

export const fetchCategoriesAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const categories = await CategoryService.getCategoriesHierarchy();
    dispatch(setCategories(categories));
  } catch (error) {
    console.error("Failed to fetch categories in Redux:", error);
    dispatch(setLoading(false));
  }
};

export default categorySlice.reducer;
