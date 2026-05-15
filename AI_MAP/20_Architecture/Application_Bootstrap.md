# 🚀 Application Bootstrap
// src/components/AppBootstrap.tsx

## Purpose
A centralized Client Component wrapper in the `RootLayout` responsible for all global, one-time application initializations that require browser-only APIs (hooks, localStorage, WebSockets).

## Why this pattern?
Next.js `RootLayout` is a Server Component and cannot use `useEffect`. This pattern allows us to:
1.  **Open Realtime Channels** exactly once.
2.  **Hydrate State** from localStorage/cookies.
3.  **Initialize SDKs** (Analytics, Error tracking).
4.  **Avoid Redundant Logic** in separate portal layouts (Main vs Admin).

## Architecture
- **Location**: `src/components/AppBootstrap.tsx`
- **Wraps**: All portal content (inside `AuthProvider` and `ReduxProvider`).

## Implementation details
Currently handles:
- `hydrateLocation()`: Restores selected location from localStorage.
- `startLocationSync()`: Opens the Supabase Realtime channel for Districts/Cities.

### Effect Separation
- **Global Effects**: Run once on mount (no dependencies).
- **Auth Effects**: Re-run when the `user` object from `AuthContext` changes (e.g. for user-specific notifications).

---
[[Architecture_Overview|⬅️ Back to Architecture]]
