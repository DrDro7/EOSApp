import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

/**
 * Merges Tailwind CSS class names with proper conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency (USD by default).
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  compact = false
): string {
  if (compact && value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a large number with K/M suffixes.
 */
export function formatNumber(value: number, compact = false): string {
  if (compact && value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Calculates the percentage change between two values.
 */
export function calcChangePercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Returns the date range boundaries for a given TimeRange string.
 */
export function getDateRange(
  range: string,
  customStart?: Date,
  customEnd?: Date
): { start: Date; end: Date } {
  const end = endOfDay(new Date());

  const rangeMap: Record<string, Date> = {
    "7d": startOfDay(subDays(new Date(), 7)),
    "30d": startOfDay(subDays(new Date(), 30)),
    "90d": startOfDay(subDays(new Date(), 90)),
    "1y": startOfDay(subDays(new Date(), 365)),
  };

  if (range === "custom" && customStart && customEnd) {
    return { start: startOfDay(customStart), end: endOfDay(customEnd) };
  }

  return { start: rangeMap[range] ?? rangeMap["30d"], end };
}

/**
 * Formats a date for display.
 */
export function formatDate(date: Date | string, pattern = "MMM d, yyyy"): string {
  return format(new Date(date), pattern);
}

/**
 * Slugifies a string (used for knowledge base URLs).
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncates a string to a maximum length.
 */
export function truncate(str: string, maxLength = 50): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Returns the initials of a name (up to 2 characters).
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Generates a random hex color — used for chart palette fallbacks.
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

/**
 * EOS chart color palette.
 */
export const CHART_COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#3b82f6", // blue
];

/**
 * Returns a safe JSON string — avoids circular reference errors.
 */
export function safeStringify(obj: unknown): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return "{}";
  }
}

/**
 * Delays execution for a given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
