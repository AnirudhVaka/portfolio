# anirudhvaka.dev

Geo-adaptive portfolio + region-aware resume for **Anirudh Vaka**, Senior DevOps Engineer.

Detects the visitor's country at the Vercel edge, serves a region-appropriate variant of the portfolio copy (visa eligibility, role-pitch sentence) and a region-formatted resume (length, section order, photo, CGPA, notice period). Visitors can override the detected region via a top-right switcher.

## Stack

- **Next.js 15** App Router on **Vercel**
- React 19 (RC)
- TypeScript with strict + `noUncheckedIndexedAccess`
- Edge middleware for `x-vercel-ip-country` → region resolution
- Pre-built per-region PDFs (via print-CSS) and DOCX (via `docx` npm)
- No Tailwind — design tokens live in `app/globals.css`
- No client-side IP lookup; no analytics; no cookie banner needed

## Region variants

| Region    | Codes              | Resume style                            |
|-----------|--------------------|------------------------------------------|
| India     | IN                 | 2 pages, CGPA, notice period             |
| US        | US                 | 1 page strict, no CGPA, H1B note         |
| Germany   | DE / AT / CH       | 2 pages, optional photo, EU Blue Card    |
| Netherlands | NL / BE / LU     | 1–2 pages, Highly Skilled Migrant        |
| Ireland   | IE                 | 2 pages, Critical Skills Permit          |
| UK        | GB                 | 2 pages, British English, Skilled Worker |
| Canada    | CA                 | 1–2 pages, Global Talent Stream          |
| Singapore | SG / MY            | 1–2 pages, CGPA, Employment Pass         |
| Aus / NZ  | AU / NZ            | 2–3 pages, Skills in Demand              |
| Global    | everything else    | 1 page tight, no visa line               |

## Local development

```bash
npm install
npm run dev
```

The site runs on http://localhost:3000. Locally, `x-vercel-ip-country` is absent, so detection falls back to the Global variant — use the region switcher (top-right) to preview the others. The override persists for 30 days via the `av-region-override` cookie.

## Deploying

```bash
vercel
```

No environment variables are required for the geo signal — Vercel injects `x-vercel-ip-country` for free on every request.

## Layout

```
app/
  page.tsx              — portfolio (Server Component, reads cookie)
  resume/page.tsx       — region-adaptive resume (Phase 4)
  api/set-region/       — manual override endpoint
  _components/          — RegionSwitcher and shared portfolio components
  globals.css           — design tokens, aurora background, reveal system
  layout.tsx            — fonts, OG metadata
data/
  resume.ts             — typed single source of truth for resume content
lib/
  geo.ts                — country → region map, region labels/flags, cookie names
  getRegion.ts          — server-side region resolver (override > detected > header > fallback)
  regionCopy.ts         — portfolio copy that varies per region
middleware.ts           — reads x-vercel-ip-country, writes detection cookie
scripts/
  build-docx.mjs        — pre-build DOCX per region (Phase 4)
public/
  downloads/            — pre-built PDFs and DOCX (Phase 4)
```

## Single source of truth

All resume content lives in [`data/resume.ts`](./data/resume.ts). Every region variant reads from it. One edit updates: the portfolio page, all 10 resume variants, all 10 PDFs, and all 10 DOCX files.

Bullet priorities (`core` vs `extra`) drive which lines stay on the strict 1-page US/Global variants and which appear on the longer EU/UK/IE/ANZ variants.

## Why no client-side IP lookup?

Brief explicitly avoids third-party detection. Vercel's `x-vercel-ip-country` is server-side, free, and arrives before the page renders — no flash of default content, no cookie banner, no third-party request. Visitors who object can still override.

## Build commands

| Command          | Effect                                              |
|------------------|------------------------------------------------------|
| `npm run dev`    | Next dev server on :3000                            |
| `npm run build`  | Builds DOCX for all regions, then `next build`      |
| `npm run start`  | Production server                                   |
| `npm run lint`   | ESLint (`next lint`)                                |
| `npm run typecheck` | `tsc --noEmit`                                   |
| `npm run build:docx` | Regenerate the 10 region DOCX files only         |

## Deploying to Vercel (GitHub auto-deploy)

The repo is wired to Vercel via the GitHub integration — every push to a branch produces a Vercel preview URL, and every push to `main` ships to production at anirudhvaka.dev. No CLI needed.

The full ship workflow:

1. **Local sanity check first.**
   ```bash
   npm install
   npm run typecheck      # zero errors
   npm run build          # full production build (also regenerates DOCX)
   npm run start          # spot-check http://localhost:3000 and /resume
   ```
2. **Push to a preview branch.**
   ```bash
   git checkout -b rebuild/geo-adaptive
   git add -A
   git commit -m "rebuild: geo-adaptive portfolio + 10-region resume"
   git push -u origin rebuild/geo-adaptive
   ```
   Vercel creates a preview URL within ~60s. Watch the GitHub PR / Vercel dashboard for the link.
3. **Verify the preview.**
   - Open the preview URL in an incognito window — confirm the detected region matches your IP.
   - Use the region switcher (top-right) to walk all 10 variants; confirm copy + visa lines.
   - Click "Resume" → walk every region; press "Print / Save as PDF" on one; confirm output is single-column real text.
   - Click "Download Word" on at least 2 variants; open in Word; confirm bullets, hyperlinks, fonts.
   - Test from a VPN or by spoofing the header for sanity:
     ```bash
     curl -H "x-vercel-ip-country: DE" https://<preview>.vercel.app/ | grep -E "Blue Card|Germany view"
     ```
4. **Promote to production by merging.**
   ```bash
   # Open a PR from the branch, get the Vercel preview link on it, click around,
   # then merge to main. Vercel auto-deploys the merge to anirudhvaka.dev.
   ```
5. **Post-deploy verification on production (5 min).**
   - Open https://anirudhvaka.dev in an incognito window — confirm detected region.
   - Open one of the .docx files; upload one of the PDF prints to resumeworded.com or jobscan.co; target >90% parse.

**Vercel project settings that should already be correct** — verify in the dashboard if anything looks off:

| Setting              | Expected                                                    |
|----------------------|-------------------------------------------------------------|
| Framework Preset     | Next.js                                                     |
| Build Command        | `npm run build` (which chains `build:docx` then `next build`)|
| Install Command      | `npm install` (default)                                     |
| Output Directory     | `.next` (default)                                           |
| Node Version         | 20.x or 22.x                                                |
| Environment vars     | none required — `x-vercel-ip-country` is injected for free  |
| Domain               | anirudhvaka.dev → this project                              |

## Region detection — local dev

`x-vercel-ip-country` is absent in `npm run dev`. The page falls back to the Global variant. Use the region switcher (top-right of the nav, or in the resume toolbar) to preview each variant. Override is cookie-persisted for 30 days; reset via the switcher's "↺ Reset to auto-detect".

## ATS verification

Per-region resume PDFs should be tested at:
- https://resumeworded.com (free for 1 scan)
- https://jobscan.co (free trial, more detailed)

Target: >90% parsing accuracy. If a region fails, the most likely cause is grey-on-white text — the print CSS forces `#333` on body text, but custom job titles might inherit. Open Chrome DevTools, Print preview, sample text colours.
