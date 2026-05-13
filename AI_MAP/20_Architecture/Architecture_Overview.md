# 🏛️ Architecture Overview

This project uses a centralized state management pattern with **Redux Toolkit** and **Next.js (App Router)**.

## 🧠 Redux State Design
We have moved away from a single "Location" slice to a more modular **Unified Search & Location** system.

### 1. [[Search_Slice]]
- **Responsibility**: Manages session-specific search queries.
- **Key State**: `query: string`
- **Used by**: `HeroArea`, `MainLayout` (Header Search).

### 2. [[Location_Slice]]
- **Responsibility**: Manages persistent regional data and global UI modals.
- **Key State**: `selectedLocation`, `districts[]`, `isPickerOpen`.
- **Persistence**: `localStorage` via client-side hydration.

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (Turbo)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Redux Toolkit
- **Icons**: Lucide React
- **Animations**: Framer Motion

---
[[00_Dashboard|⬅️ Back to Dashboard]]
