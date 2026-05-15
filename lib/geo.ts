/**
 * Geo-adaptive region resolution.
 *
 * Source of truth for: which ISO-3166-1 alpha-2 country codes map to which
 * resume/portfolio variant, default fallback, and the small set of human-
 * readable labels we surface in the UI (region switcher, hero region pill).
 *
 * Used by:
 *   - middleware.ts                (reads x-vercel-ip-country, sets cookie)
 *   - app/page.tsx                 (server component, reads cookie)
 *   - app/resume/page.tsx          (server component, reads cookie)
 *   - app/_components/RegionSwitcher.tsx (renders the override dropdown)
 *   - app/api/set-region/route.ts  (validates manual override input)
 */

export const REGIONS = [
  "in",
  "us",
  "de",
  "nl",
  "ie",
  "uk",
  "ca",
  "sg",
  "anz",
  "global",
] as const;

export type Region = (typeof REGIONS)[number];

export const DEFAULT_REGION: Region = "global";

/** Display label for the UI switcher / hero pill. */
export const REGION_LABEL: Record<Region, string> = {
  in: "India",
  us: "United States",
  de: "Germany",
  nl: "Netherlands",
  ie: "Ireland",
  uk: "United Kingdom",
  ca: "Canada",
  sg: "Singapore",
  anz: "Australia / NZ",
  global: "Global / Remote",
};

/** Flag emoji for the UI switcher (purely cosmetic, no semantic load). */
export const REGION_FLAG: Record<Region, string> = {
  in: "🇮🇳",
  us: "🇺🇸",
  de: "🇩🇪",
  nl: "🇳🇱",
  ie: "🇮🇪",
  uk: "🇬🇧",
  ca: "🇨🇦",
  sg: "🇸🇬",
  anz: "🇦🇺",
  global: "🌐",
};

/**
 * Map ISO country code → region variant.
 * Anything not in the map falls through to DEFAULT_REGION.
 * Per brief: DE/AT/CH share German-style; NL/BE/LU share Dutch-style;
 * SG/MY share Singapore-style; AU/NZ share ANZ-style.
 */
const COUNTRY_TO_REGION: Record<string, Region> = {
  IN: "in",
  US: "us",
  DE: "de",
  AT: "de",
  CH: "de",
  NL: "nl",
  BE: "nl",
  LU: "nl",
  IE: "ie",
  GB: "uk",
  CA: "ca",
  SG: "sg",
  MY: "sg",
  AU: "anz",
  NZ: "anz",
};

/** Resolve a country code (case-insensitive) to a Region, with safe fallback. */
export function regionFromCountry(country: string | null | undefined): Region {
  if (!country) return DEFAULT_REGION;
  const upper = country.toUpperCase();
  return COUNTRY_TO_REGION[upper] ?? DEFAULT_REGION;
}

/** Type guard for trusted region strings (used by the override API route). */
export function isRegion(value: unknown): value is Region {
  return typeof value === "string" && (REGIONS as readonly string[]).includes(value);
}

/** Cookie names — kept in one place so middleware + UI agree. */
export const COOKIE = {
  detected: "av-region-detected",
  override: "av-region-override",
} as const;

/** 30 days. Matches brief. */
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
