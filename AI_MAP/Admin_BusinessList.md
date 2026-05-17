# 🧾 Admin Business List

This note documents the admin business listing page structure implemented for parity with the `srilankabusiness.lk` admin flow.

## 📍 Route + Entry
- Route: `src/app/(admin-portal)/admin/business/page.tsx`
- UI component: `src/components/admin/BusinessList.tsx`
- Reusable sections:
  - `src/components/admin/business-list/BusinessListHeader.tsx`
  - `src/components/admin/business-list/BusinessListTable.tsx`

## 🧱 Behavior
- Main table of business profiles with pagination.
- Tabs:
  - `All Businesses`
  - `Created by Me` (uses `created_by_id` filter)
  - `Action Required` (uses subscription-state filter)
- Filters:
  - search query (client-side text match)
  - status filter (server-side)
  - plan filter (client-side)
- Row actions:
  - **Manage Profile Redirection** (triggered via primary grid LayoutDashboard icon, redirecting to the `/[admin|superadmin]/business/manage/[id]` dynamic dashboard route which renders `BusinessProfileHub`)
  - **Manage Status Dialog** (triggered via actions dropdown `Manage Status` menu item, opening `AdminBusinessManagerDialog` overlay)
  - Open public profile
  - Activate/deactivate
  - Verify/unverify
  - Delete (super admin only)

## 🎚️ Premium Standalone Dashboard (`BusinessProfileHub`)
- **Location**: `src/components/business/BusinessProfileHub.tsx`
- **Route Wrapper**: `src/app/(admin-portal)/[admin|superadmin]/business/manage/[id]/page.tsx`
- **Features**:
  - **Profile Details**: Detailed property breakdown including BR numbers, CIDA grading, and establishing year.
  - **Billing Timeline**: High-fidelity step-by-step payment timeline log integrated with the `payments` table.
  - **Wizard-based Stepper Editor**: Reuses the beautiful 3-step wizard stepper (`BusinessForm`) for seamless profile edits.

## 🎛️ Premium Status Dialog (`AdminBusinessManagerDialog`)
- **Status Tab**: Direct control over business statuses (active, pending, suspended, archived) or direct validation as Paid & Active. Displays detailed owner/creator profiles.
- **History Tab**: Integrates `BusinessHistoryTimeline` which retrieves step-by-step creation and payment logs from the `payments` table.
- **QR Tab**: Incorporates a premium vector QR generator (`BeautifulQRCode`) featuring circular/curved corner eyes and customizable rounded modules, paired with instant high-res PNG downloads via `html-to-image`.
- **Dev Tab** (SuperAdmin/Admin only): Provides manual overrides to force-toggle subscription plan tier, status, and precise expiration dates.
- **Raw Tab** (SuperAdmin/Admin only): Offers a developer console with a copyable JSON format raw database inspector.

## ♻️ Reuse Guidance
- `BusinessListTable` is intentionally reusable for other dashboards (e.g. agent/admin variants).
- Keep page-level orchestration (`fetch`, filters, modal state) in container components such as `BusinessList`.

## 🧩 Folder Pattern (Standard)
- Route wrapper only:
  - `src/app/(admin-portal)/admin/business/page.tsx`
- Feature container:
  - `src/components/admin/BusinessList.tsx`
- Reusable feature sections:
  - `src/components/admin/business-list/BusinessListHeader.tsx`
  - `src/components/admin/business-list/BusinessListTable.tsx`
- Service layer only for DB:
  - `src/services/supabase/BusinessService.ts`

Use this same split for future admin modules to keep reuse and maintenance consistent.

## 🔌 Service Layer
All DB operations are routed through [[Architecture_Overview]] service patterns:
- `BusinessService.listBusinesses(...)`
- `BusinessService.updateBusinessProfile(...)`
- `BusinessService.deleteBusinessProfile(...)`

Service file:
- `src/services/supabase/BusinessService.ts`

## 🔗 Related Notes
- [[Project_Map]]
- [[Redux_Workflow]]
- [[Architecture_Overview]]
- [[00_Dashboard]]
