/**
 * Server-side region resolver.
 *
 * Single helper used by every Server Component that needs to know which
 * variant to render. Resolution order (override beats detection beats
 * fallback) lives here so no caller has to reimplement it.
 *
 * Must be called from a Server Component or Route Handler — uses
 * `next/headers` which is server-only.
 */

import { cookies, headers } from "next/headers";
import {
  COOKIE,
  DEFAULT_REGION,
  isRegion,
  regionFromCountry,
  type Region,
} from "./geo";

export interface ResolvedRegion {
  /** The region we'll render with. */
  region: Region;
  /** Where the value came from — useful for UI ("Showing India view"). */
  source: "override" | "detected" | "header" | "fallback";
  /** Original detection signal, for debug / "your IP looked like…" copy. */
  detectedCountry: string | null;
}

export async function getRegion(): Promise<ResolvedRegion> {
  // Next.js 15: cookies() and headers() return Promises.
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  const detectedCountry = headerStore.get("x-vercel-ip-country");
  const override = cookieStore.get(COOKIE.override)?.value;
  const detected = cookieStore.get(COOKIE.detected)?.value;

  if (isRegion(override)) {
    return { region: override, source: "override", detectedCountry };
  }
  if (isRegion(detected)) {
    return { region: detected, source: "detected", detectedCountry };
  }
  if (detectedCountry) {
    return {
      region: regionFromCountry(detectedCountry),
      source: "header",
      detectedCountry,
    };
  }
  return { region: DEFAULT_REGION, source: "fallback", detectedCountry: null };
}
