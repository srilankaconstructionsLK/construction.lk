<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## AI_MAP Documentation Rules (Obsidian)

All agents working in this repo must treat `AI_MAP/` as the project mindmap/source of technical truth.

### When code changes are made
- Before editing any file, quickly check `AI_MAP/Project_Map.md` and related AI_MAP notes to locate the correct files/components first.
- If you add, refactor, or remove behavior, update the relevant note(s) in `AI_MAP/`.
- If no relevant note exists, create one and link it from `AI_MAP/Project_Map.md` and/or `AI_MAP/00_Dashboard.md`.
- Keep architecture notes synchronized with actual implementation (state flow, slices, services, hydration, etc.).

### Obsidian format requirements
- Use wiki links for internal notes, e.g. `[[Project_Map]]`, `[[Architecture_Overview]]`.
- Keep link names consistent with file names to avoid broken graph links.
- Prefer stable sections and concise headings so agents can update docs incrementally.
- When introducing a new feature note, add at least one inbound and one outbound link.

### Consistency checks before finishing
- Verify note links resolve (no orphan note names or typos).
- Ensure any mentioned file paths and Redux/service patterns match the current code.
- If behavior changed but docs were intentionally not updated, explicitly state that in your final summary.

## UI Folder Structure Rules

When implementing complex UI features (especially admin pages), follow this structure:

- Keep route files thin:
  - `src/app/**/page.tsx` should only compose/render feature containers.
- Use a feature container in `src/components/<domain>/`:
  - Example: `src/components/admin/BusinessList.tsx`
  - Container owns orchestration only (fetching, filters state, pagination state, modal state, action handlers).
- Split reusable sections into a feature subfolder:
  - Example: `src/components/admin/business-list/BusinessListHeader.tsx`
  - Example: `src/components/admin/business-list/BusinessListTable.tsx`
- Keep DB logic in service layer only:
  - `src/services/supabase/*.ts` (class + static methods).
  - UI components must not call raw table queries directly if service methods already exist.

For new admin features, follow this pattern by default unless a strong reason is documented in AI_MAP.

## Full Folder Architecture Rules

### Core folder responsibilities
- `src/app/*`: routes and layout composition only (thin page wrappers).
- `src/components/*`: UI and feature containers.
- `src/redux/*`: global app state, slices, typed hooks, store wiring.
- `src/services/*`: external data/IO integration layer.
- `src/lib/*`: framework/client bootstrapping, shared low-level utilities.
- `src/types/*`: generated and shared static types (including Supabase `Database` type).

### Service-layer architecture
- `src/services/supabase/*Service.ts`:
  - source of truth for Supabase table/RPC access.
  - class + static method pattern.
  - should consume generated `src/types/supabase.ts` types.
- `src/services/firebase/*`:
  - Firebase-only concerns (auth token bridging helpers, storage, Firebase SDK-specific workflows).
  - do not mix Supabase table CRUD here.

### Boundary rules
- Components/pages/slices should call service methods, not raw DB queries, when a service method exists.
- Do not duplicate the same domain CRUD across both Firebase and Supabase services.
- If a feature uses Supabase for persistence, keep its persistence API under `services/supabase`.
- Keep orchestration in containers/slices; keep transport/query details in services.

## File Header Comment Rule

- When creating a new file or editing an existing file, add/keep a top-level file path comment in the file.
- Format example:
  - TypeScript/JavaScript: `// src/components/admin/BusinessList.tsx`
  - CSS: `/* src/app/globals.css */`
- Keep the path comment accurate after file moves/renames.
