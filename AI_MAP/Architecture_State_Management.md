# 🏗️ State Management Philosophy & Architecture

This document defines the 4-Pillar state management philosophy used across `construction.lk` to ensure high performance, data consistency, and architectural scalability.

## The 4 Pillars of Data

1.  **The Dictionary (Pillar 1)**
    *   **What it is**: Globally shared, highly static reference data (e.g., Categories, Locations).
    *   **Tool**: **Redux**.
    *   **Architecture**: 
        *   Fetched via Next.js Server Components (SSR/ISR) for critical initial paths (like the Home Page).
        *   Hydrated into Redux using `HydrateCategories` style components.
        *   Or fetched Client-Side Just-In-Time (JIT) via `isDataStale` threshold checks if not needed on initial paint.
    *   **Result**: 0ms loading spinners for the user, highly SEO friendly.

2.  **The Core Entities (Pillar 2)**
    *   **What it is**: Paginated, frequently updated data (e.g., Business Profiles, Ad Listings, Search Results).
    *   **Tool**: **React Query** (or standard async `useEffect` for now, pending migration).
    *   **Architecture**: Handles caching, pagination, infinite scroll, and background refetching.

3.  **The Workbench (Pillar 3)**
    *   **What it is**: Draft data, form inputs, unsaved edits.
    *   **Tool**: **React `useState` / `useReducer`** (Local State).
    *   **Architecture**: Prevents polluting global Redux with incomplete keystrokes. Only pushes to the DB/Redux upon successful "Save" actions.

4.  **The Environment (Pillar 4)**
    *   **What it is**: UI state (Modals open/closed, Sidebar toggles) and Session State (Auth user).
    *   **Tool**: **Redux** or **React Context**.

## The "Server to Redux Bridge" (Hydration)

For critical SEO elements like the "All Categories" menu or Home Page grid, we employ the **SSR/ISR + Hydration** pattern:
1.  **Server Component Layout** (`RootLayout`) queries Supabase and mounts global hydration components (`<HydrateCategories>` & `<HydrateLocations>`).
2.  **Server Component Page** (`page.tsx`) queries Supabase to get the same reference data (e.g. `categories`) to render visible static elements (like the homepage categories grid) for 100% SEO coverage.
3.  Both layouts and pages use `createStaticClient()` (which does not use dynamic headers/cookies) to keep layouts and pages fully static/cacheable via ISR (`export const revalidate = 3600`).
4.  The JSON data is hydrated into Redux instantly when the client browser mounts the layout.
5.  Modals (like `<AllCategoriesModal />`) can immediately `useAppSelector` to read the full data tree with zero client-side network requests.

### ⚡ Next.js / React Server Fetch Deduplication

To prevent duplicate database queries when both layouts and pages request the same Pillar 1 dictionary data within the same server-rendering tree:
*   Wrap your Supabase SDK service methods (like `CategoryService.getCategoriesHierarchy` and `LocationService.getLocationsHierarchy`) with React's built-in **`cache()`** utility.
*   Next.js/React automatically deduplicates identical service calls within the same render tree, guaranteeing exactly **1 database call** per page cycle.

```typescript
import { cache } from "react";

export class CategoryService {
  // Wrap service methods in cache() to ensure zero duplicate DB hits
  static getCategoriesHierarchy = cache(async (supabaseClient) => {
    // database call here...
  });
}
```

Never sacrifice SSR/HTML generation just to avoid duplicate calls. Instead, use React `cache()` to keep rendering static while completely optimizing the I/O layer!
