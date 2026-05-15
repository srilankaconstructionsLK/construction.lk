# 🔄 Redux Workflow (Construction.lk)

This is the canonical process for adding or changing Redux-managed data in this project.

## 🎯 Goal
When a new DB column, UI field, or feature state is introduced, update Redux in a predictable order so AI/devs avoid regressions.

## 📍 Where Things Live
- Store: `src/redux/store.ts`
- Typed hooks: `src/redux/hooks.ts`
- Redux provider: `src/redux/provider.tsx`
- Domain slices: `src/redux/slices/*.ts`
- API/services: `src/services/*`
- UI usage points: `src/components/*`, `src/app/*`

## ✅ Standard Update Process
1. Update source-of-truth type first.
   - If data comes from DB/API, update service/domain type in `src/services/*`.
2. Update Redux slice state interface.
   - Add field to the relevant `State` interface.
   - Add default in `initialState`.
3. Add reducers/actions for sync updates.
   - Use `PayloadAction<T>` with explicit types (avoid `any`).
4. Add/extend async thunk for server updates.
   - Use `createAsyncThunk`.
   - In `catch`, use `unknown` and convert to safe message.
5. Handle thunk lifecycle in `extraReducers`.
   - `pending`: set loading, clear previous error.
   - `fulfilled`: write data.
   - `rejected`: store readable error.
6. Ensure reducer is registered in `store.ts` (only if it is a new slice).
7. Use typed hooks in UI.
   - `useAppSelector` for reads.
   - `useAppDispatch` for actions/thunks.
8. Handle persistence/hydration if needed.
   - For localStorage-based data, follow [[Hydration_Mismatch_Fix]] pattern.
9. Validate.
   - Search for untyped Redux usage.
   - Check affected pages/components manually.

## 🧪 Quick Checklist Before Merge
- No `any` introduced in slice state or action payloads.
- No direct `useDispatch`/`useSelector` in components.
- New async flows include loading + error handling.
- Default state values are safe for SSR.
- If persisted client-side, hydration is two-step (server-safe default + client sync).

## 🧭 Decision Rules
- UI-only transient state: `uiSlice`.
- Domain entities from backend: domain slice (`business`, `admin`, etc.).
- Reused across multiple pages/components: Redux.
- Local single-component state: keep in component unless shared/global.

---
[[Architecture_Overview|⬅️ Back to Architecture]]
