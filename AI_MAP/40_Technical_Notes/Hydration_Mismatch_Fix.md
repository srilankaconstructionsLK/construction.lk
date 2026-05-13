# 💧 Hydration Mismatch Fix

## ❌ The Problem
When using `localStorage` to initialize Redux state in Next.js:
1. **Server** renders the component with default state (e.g., "All Sri Lanka").
2. **Client** renders the component with `localStorage` value (e.g., "Dikwella").
3. **React Error**: `Hydration failed because the server rendered text didn't match the client.`

## ✅ The Solution
We use a **Two-Step Hydration** pattern.

1. **Initial State**: Always start with a static, safe value in the slice (e.g., "All Sri Lanka").
2. **Client-Side Sync**: Use an `useEffect` in the root layout or main layout to trigger a hydration action.

### Implementation
**In `locationSlice.ts`:**
```typescript
hydrateLocation: (state) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('selected_location');
    if (saved) state.selectedLocation = saved;
  }
}
```

**In `MainLayout.tsx`:**
```tsx
useEffect(() => {
  dispatch(hydrateLocation());
}, [dispatch]);
```

---
[[00_Dashboard|⬅️ Back to Dashboard]]
