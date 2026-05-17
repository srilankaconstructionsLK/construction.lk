// src/components/common/HydrateCategories.tsx
"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCategories } from "@/redux/slices/categorySlice";
import { Category } from "@/services/supabase/CategoryService";

interface HydrateCategoriesProps {
  categories: Category[];
}

/**
 * A client component that hydrates the Redux store with categories 
 * fetched on the server. This ensures Pillar 1 (The Dictionary) is 
 * populated immediately without a client-side fetch.
 */
export function HydrateCategories({ categories }: HydrateCategoriesProps) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(setCategories(categories));
    initialized.current = true;
  }

  return null;
}
