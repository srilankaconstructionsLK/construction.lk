# 📍 Location Slice

## Purpose
Stores selected location and district/city data for global search context, with client-safe persistence.

## Source File
- `src/redux/slices/locationSlice.ts`

## State Contract
- `selectedLocation: string`
- `districts: District[]`

## Actions / Thunks
- `setLocation(payload: string)`: sync update of selected location.
- `setDistricts(payload: District[])`: replace available districts.
- `setLocationWithPersist(location)`: thunk to update store + `localStorage`.
- `hydrateLocation()`: thunk to read persisted location after hydration.
- `startLocationSync()`: thunk to initialize Supabase real-time listener.

## Used By
- `src/components/location-picker-modal.tsx`
- `src/components/AppBootstrap.tsx` (Primary initialization)
- `src/components/navigation/Header.tsx`
- `src/components/home/sections/hero-area.tsx`
- `src/app/search/page.tsx`

## SSR/Hydration Rule
- Never read `localStorage` in initial state for this slice.
- Use static server-safe default first (`"All Sri Lanka"`), then call `hydrateLocation()` on client.
- Reference: [[Hydration_Mismatch_Fix]]

## Extension Example
If adding a new field like `selectedDistrictCode`:
1. Add it to `LocationState` + `initialState`.
2. Add reducer/thunk updates where location is set.
3. Persist/hydrate it only via thunks (not reducers with browser-only APIs).
4. Update all UI selectors using typed hooks.

---
[[Architecture_Overview|⬅️ Back to Architecture]]
