// src/app/actions/revalidate.ts
'use server';

import { revalidatePath } from 'next/cache';

/**
 * Revalidates the entire layout to instantly update categories across all static pages.
 */
export async function revalidateCategoriesAction() {
  try {
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('[revalidateCategoriesAction] Failed to revalidate path:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Revalidates the entire layout to instantly update locations across all static pages.
 */
export async function revalidateLocationsAction() {
  try {
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('[revalidateLocationsAction] Failed to revalidate path:', error);
    return { success: false, error: String(error) };
  }
}
