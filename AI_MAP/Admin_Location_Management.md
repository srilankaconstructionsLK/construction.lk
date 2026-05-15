# Admin Location Management

This feature allows administrators to manage the platform's geographical hierarchy (Districts and Cities) using a centralized Supabase backend and Redux synchronization.

## 🏗️ Architecture

Following the project's [[Project_Map#UI Structure Standard|UI Structure Standard]]:

### 1. Route Wrapper
- **Path**: `src/app/(admin-portal)/admin/manage-city/page.tsx`
- **Responsibility**: Thin client component that only renders the feature container.

### 2. Feature Container
- **Path**: `src/components/admin/LocationManagement.tsx`
- **Responsibility**: 
    - Orchestrates data flow between Redux and local draft state.
    - Manages the "Unsaved Edits" workflow.
    - Handles local state for search, selection, and bulk ingestion.
    - Triggers Supabase service mutations.

### 3. Reusable Sections
Located in `src/components/admin/location-management/`:
- **LocationManagementHeader**: Controls publishing and unsaved changes alerts.
- **LocationStats**: Displays aggregate metrics (total locations, coverage %).
- **DistrictsList**: Interactive sidebar for selecting and adding districts.
- **CityManager**: Primary workspace for managing cities within a selected district.

### 4. Data Layer
- **Service**: `src/services/supabase/LocationService.ts`
- **Redux Sync**: `src/redux/slices/locationSlice.ts`
- **Initialization**: Triggered globally in `src/components/AppBootstrap.tsx` via `startLocationSync` thunk.

## 🔄 Data Synchronization Flow

1. **Hydration**: On app boot (root level), `AppBootstrap` dispatches `hydrateLocation` and `startLocationSync`.
2. **Real-time Listener**: `LocationService.listenToLocationsAggregation` sets up a debounced Supabase Realtime channel (300ms delay to batch rapid changes).
3. **State Update**: Any changes in the DB (from any admin) are immediately pushed to Redux.
4. **Draft Workflow**: The admin portal uses a local `useState` for districts to allow "Work-in-Progress" edits without affecting public users until **Publish Changes** is clicked.

## 🛠️ Key Operations

### Add District
- Adds a new entry to the local `districts` array.
- Marks `hasUnsavedChanges` as true.

### Bulk City Ingestion
- Accepts a comma-separated list of city names.
- Automatically cleans, deduplicates against existing cities, and sorts the list.

### Publish Changes
- Calls `LocationService.updateLocationsAggregation`.
- **Service Reconciliation**: 
    - **Dirty Tracking**: Only districts modified in the UI are synced to the DB.
    - **Batch Operations**: Deletions are performed using `.in([...ids])` to minimize real-time broadcast noise.
    - **Cities**: Clean-slate sync (delete/insert) is performed ONLY for dirty districts.
- **Sync**: Success triggers the real-time listener, which updates Redux for all users.

## 🔒 Security (RLS)
- **Select**: Publicly accessible.
- **Insert/Update/Delete**: Restricted to users with `admin` or `super_admin` roles via Supabase RLS and custom PostgreSQL functions.
