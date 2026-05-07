---
name: Industrial Integrity
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#574237'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#8b7265'
  outline-variant: '#dec1b1'
  surface-tint: '#9a4600'
  primary: '#9a4600'
  on-primary: '#ffffff'
  primary-container: '#f47a20'
  on-primary-container: '#582500'
  inverse-primary: '#ffb68c'
  secondary: '#516169'
  on-secondary: '#ffffff'
  secondary-container: '#d2e2ec'
  on-secondary-container: '#55656d'
  tertiary: '#596156'
  on-tertiary: '#ffffff'
  tertiary-container: '#979f93'
  on-tertiary-container: '#2f362d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68c'
  on-primary-fixed: '#321200'
  on-primary-fixed-variant: '#753400'
  secondary-fixed: '#d5e5ef'
  secondary-fixed-dim: '#b9c9d3'
  on-secondary-fixed: '#0e1d25'
  on-secondary-fixed-variant: '#3a4951'
  tertiary-fixed: '#dde5d8'
  tertiary-fixed-dim: '#c1c9bc'
  on-tertiary-fixed: '#161d15'
  on-tertiary-fixed-variant: '#41493f'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin: 32px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is engineered for the heavy industry and construction sector, prioritizing clarity, durability, and professional trust. The aesthetic follows a **Corporate / Modern** approach with a high-utility focus. It balances the high-energy signal of construction safety with the structural stability of architectural drafting.

The visual language is grounded and utilitarian, avoiding unnecessary decoration to focus on task completion and information density. It evokes a sense of "boots-on-the-ground" reliability combined with "architect-level" precision, making it suitable for project managers, contractors, and suppliers alike.

## Colors

The palette is anchored by **Construction Orange**, a high-visibility hue reserved strictly for primary actions, progress indicators, and essential notifications. 

**Dark Slate** serves as the primary typographic color, providing a softer, more sophisticated contrast than pure black, reminiscent of architectural blueprints and industrial steel. The background remains a **Clean White** to maintain a spacious, professional atmosphere, while subtle grays and off-whites define container boundaries and structural divisions.

## Typography

This design system utilizes a dual-font strategy to balance character with utility. **Manrope** is used for headings, providing a modern, geometric structure that feels engineered and precise. 

**Inter** is the workhorse font for all body copy and UI elements. It was selected for its exceptional legibility in data-heavy environments and its neutral, systematic tone. All labels should use a slightly heavier weight to ensure they are distinguishable from body text at a glance.

## Layout & Spacing

The system employs a **12-column fluid grid** for internal dashboards and a **fixed-width centered container (1280px)** for marketing and authentication pages. 

The spacing rhythm is built on an 8px base unit. Vertical stacks follow a generous hierarchy to prevent the "cluttered" feeling common in industrial software. Authentication layouts use a 50/50 split-screen model on desktop: the left side features immersive high-quality construction photography with a brand overlay, while the right side contains the clean, white-space-focused form container.

## Elevation & Depth

Visual hierarchy is established through **low-contrast outlines** and **tonal layers** rather than heavy shadows. 

- **Level 0 (Base):** White background.
- **Level 1 (Cards):** 1px solid border (#E9ECEF) with a subtle 4px blur shadow (5% opacity) to provide lift without appearing "floaty."
- **Level 2 (Dropdowns/Modals):** 1px solid border with a 12px blur shadow (10% opacity) for clear separation from the workspace.

Surfaces should feel flat and structural, reinforcing the "built" nature of the product.

## Shapes

The design system uses a **Soft (0.25rem)** corner radius for standard components like buttons and input fields. Larger containers like cards or image modules may use **0.5rem (rounded-lg)**. 

This subtle rounding prevents the UI from feeling sharp or aggressive while maintaining the rigid, rectangular integrity associated with building materials and blueprints.

## Components

### Buttons
- **Primary:** Solid Construction Orange background with white text. No gradients.
- **Secondary:** Dark Slate border (1px) with Dark Slate text.
- **Social Login:** High-contrast white buttons with 1px light gray borders. Logos (Google, Facebook) should be left-aligned with centered text.

### Form Fields
- **Input Fields:** 1px gray border that transitions to Construction Orange on focus. 
- **Labels:** Positioned above the field in `label-bold` Dark Slate.
- **Icons:** Use 20px line icons (Stroke: 1.5px) inside inputs for context (e.g., mail icon for email, lock for password).

### Cards & Lists
- **Service Cards:** Feature a top-aligned image, followed by a padded content area with a 24px internal gutter.
- **Action Lists:** Use clear chevron indicators for navigation and subtle divider lines between items.

### Authentication Specifics
- **Split-Screen:** The "Action Side" (Right) must maintain a minimum of 64px padding on all sides to ensure the form remains the focal point.