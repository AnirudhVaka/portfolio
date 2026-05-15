import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, COOKIE_MAX_AGE_SECONDS, regionFromCountry } from "@/lib/geo";

/**
 * Region detection middleware.
 *
 * Runs at the Vercel edge for every request that matches the matcher below.
 * Responsibility:
 *   1. Read `x-vercel-ip-country` (injected free by Vercel for every request).
 *   2. Resolve it to a Region via `regionFromCountry`.
 *   3. Write the result to the `av-region-detected` cookie (30 days) IF
 *      the cookie is missing or stale. We never touch `av-region-override`
 *      (set only via /api/set-region — the manual switcher).
 *
 * What we DO NOT do here:
 *   - No redirect. The page reads cookies/headers itself.
 *   - No mutation of the request body or response body.
 *   - No IP lookup. If Vercel didn't give us a country, we leave detection
 *     blank and the page falls back to DEFAULT_REGION via `regionFromCountry`.
 *
 * Local dev: `x-vercel-ip-country` is absent. The page will render the
 * Global variant unless you set the override cookie manually via the
 * RegionSwitcher in the UI.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const country = request.headers.get("x-vercel-ip-country");
  const detectedRegion = regionFromCountry(country);

  const existing = request.cookies.get(COOKIE.detected)?.value;
  if (existing !== detectedRegion) {
    response.cookies.set(COOKIE.detected, detectedRegion, {
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      httpOnly: false, // Switcher (client component) needs to read it.
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  /**
   * Match everything except Next.js internals and static assets.
   * Matters because we don't want to set cookies on every image/font request.
   */
  matcher: ["/((?!_next/|favicon|api/|.*\\..*).*)"],
};
