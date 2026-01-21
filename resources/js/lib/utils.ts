import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string, locale = "en-AU", currency = "AUD"): string {
  const number = Number(value);
  if (Number.isNaN(number)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(number);
}

export const API_BASE_URL =
  import.meta.env. VITE_API_URL || "http://localhost:8000/api";