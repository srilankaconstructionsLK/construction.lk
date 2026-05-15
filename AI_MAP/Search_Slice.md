# 🔎 Search Slice

## Purpose
Holds global search query state shared across hero, header, and search results pages.

## Source File
- `src/redux/slices/searchSlice.ts`

## State Contract
- `query: string`

## Actions
- `setQuery(payload: string)`: updates the global search input value.

## Used By
- `src/components/home/sections/hero-area.tsx`
- `src/components/layouts/main-layout.tsx`
- `src/app/search/page.tsx`

## Integration Rules
1. Always read with `useAppSelector((state) => state.search.query)`.
2. Always write with `useAppDispatch()` + `dispatch(setQuery(...))`.
3. Keep this slice focused on search input/session query only.
4. If backend search history/autocomplete is added, implement via thunk in this slice.

## Extension Example
If adding `category` filter to search state:
1. Add `category?: string` to `SearchState`.
2. Add `setCategory` reducer.
3. Update components that build URL params (hero/header/search page).
4. Keep query/category sync behavior documented in [[Redux_Workflow]].

---
[[Architecture_Overview|⬅️ Back to Architecture]]
