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
  - view details dialog
  - open public profile
  - activate/deactivate
  - verify/unverify
  - delete (super admin only)

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
