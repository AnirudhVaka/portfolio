import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, COOKIE_MAX_AGE_SECONDS, isRegion } from "@/lib/geo";

/**
 * Manual region override.
 *
 * The RegionSwitcher (client component) calls this with `{ region: "uk" }`.
 * We validate the region against our allowlist, then set the
 * `av-region-override` cookie for 30 days. The page is then re-fetched
 * via `router.refresh()` from the client, which causes the Server
 * Component to read the new cookie and render the right variant.
 *
 * If region === "auto", we clear the override and fall back to detection.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const region = (body as { region?: unknown } | null)?.region;

  // Special-case: "auto" clears the override and lets detection win again.
  if (region === "auto") {
    const response = NextResponse.json({ ok: true, region: "auto" });
    response.cookies.set(COOKIE.override, "", { maxAge: 0, path: "/" });
    return response;
  }

  if (!isRegion(region)) {
    return NextResponse.json({ error: "invalid_region" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, region });
  response.cookies.set(COOKIE.override, region, {
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
