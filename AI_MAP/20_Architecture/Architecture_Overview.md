# 🏛️ Architecture Overview

This project uses a centralized state management pattern with **Redux Toolkit** and **Next.js (App Router)**.

## 🧠 Redux State Design
We use a modular Redux architecture with one slice per domain and typed hooks for all components.

## 🗂️ Full Folder Architecture

### Layer map
- `src/app/*`: route entrypoints and layout composition.
- `src/components/*`: UI primitives, feature containers, reusable view sections.
- `src/redux/*`: application state orchestration and async lifecycle state.
- `src/services/*`: service layer for backend/provider access.
- `src/lib/*`: SDK client factories, auth/token bridge logic, shared low-level utilities.
- `src/types/*`: generated types (`supabase.ts`) and shared domain aliases.

### Service split: Supabase vs Firebase
- `src/services/supabase/*Service.ts`:
  - canonical data persistence layer for relational/business data.
  - class + static method pattern.
  - typed with `Database` from `src/types/supabase.ts`.
- `src/services/firebase/*`:
  - Firebase-specific integrations (auth/session bridge helpers, storage/media workflows).
  - not used as a parallel CRUD layer for the same Supabase tables.

### Standard boundaries
- Pages/components/slices call service methods; avoid direct table queries in UI layers.
- Keep feature orchestration in containers/slices, and DB transport/query details in services.
- Avoid dual ownership of domain data APIs across both Firebase and Supabase layers.

### Core Redux Files
- `src/redux/store.ts`: root store + reducers + exported `RootState`, `AppDispatch`, `AppThunk`.
- `src/redux/hooks.ts`: typed hooks (`useAppDispatch`, `useAppSelector`, `useAppStore`).
- `src/redux/slices/*`: domain slices and async thunks.
- `src/redux/provider.tsx`: top-level React Redux provider.

### 1. [[Search_Slice]]
- **Responsibility**: Manages session-specific search queries.
- **Key State**: `query: string`
- **Used by**: `HeroArea`, `Header`.

### 2. [[Location_Slice]]
- **Responsibility**: Manages persistent regional data and global UI modals.
- **Key State**: `selectedLocation`, `districts[]`.
- **Persistence**: `localStorage` via client-side hydration.

### 3. Other Active Slices
- `uiSlice`: UI toggles/modals/filter states.
- `adSlice`: ad placements and ad-related UI data.
- `businessSlice`, `businessFormSlice`, `adminSlice`: business/admin domain states.

## 🔄 Standard Redux Extension Flow
See [[Redux_Workflow]] for the exact process to:
- add new state fields/DB columns,
- add new slice actions/thunks,
- wire components correctly with typed hooks.

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (Turbo)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Redux Toolkit
- **Toasts**: Sonner (Custom Industrial Theme)
- **Theme**: Next-Themes
- **Icons**: Lucide React
- **Animations**: Framer Motion

---
[[00_Dashboard|⬅️ Back to Dashboard]]
