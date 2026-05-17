import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes.
 * Fallback to simple join if dependencies are missing.
 */
export function cn(...inputs: ClassValue[]) {
  try {
    return twMerge(clsx(inputs));
  } catch (e) {
    return inputs.filter(Boolean).join(" ");
  }
}

/**
 * Checks if data is stale based on a timestamp and a threshold.
 */
export function isDataStale(lastFetched: number | null, thresholdMs: number = 60 * 60 * 1000) {
  return !lastFetched || Date.now() - lastFetched > thresholdMs;
}
