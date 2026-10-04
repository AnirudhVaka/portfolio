# anirudhvaka.dev

Portfolio + resume for **Anirudh Vaka**, Senior DevOps Engineer.

A static site: every page is prerendered at build time and every visitor gets the same version (only the Open Graph image is generated on demand at the edge). The resume at `/resume` is one comprehensive resume (every bullet, every section) rendered from a single ruleset, `UNIVERSAL_RULES`, with a matching pre-built Word download.

## Stack

- **Next.js 15** App Router on **Vercel**
- React 19
- TypeScript with strict + `noUncheckedIndexedAccess`
- Statically prerendered pages: no middleware, no cookies, no per-visitor rendering
- One pre-built DOCX resume (via the `docx` npm package); PDFs come from the browser's print-to-PDF using the `@media print` CSS
- No Tailwind — design tokens live in `app/globals.css`
- No client-side IP lookup; no analytics; no cookie banner needed

## Local development

```bash
npm install
npm run dev
```

The site runs on http://localhost:3000; the resume is at http://localhost:3000/resume.

## Layout

```
app/
  page.tsx              — portfolio (static Server Component)
  resume/page.tsx       — the resume, rendered with UNIVERSAL_RULES
  resume/ResumeRenderer.tsx — rules-driven, ATS-friendly single-column HTML
  resume/ResumeToolbar.tsx  — Print / Save as PDF + Download Word
  resume/resume.css     — screen + print styles for the resume
  writeups/             — long-form writeups
  _components/          — shared portfolio components
  globals.css           — design tokens, aurora background, reveal system
  layout.tsx            — fonts, metadata, meta description, JSON-LD
  opengraph-image.tsx, twitter-image.tsx, robots.ts, sitemap.ts
data/
  resume.ts             — typed single source of truth for resume content
lib/
  resumeRules.ts        — UNIVERSAL_RULES: section order, labels, optional fields
  siteCopy.ts           — portfolio copy (availability line, intro, contact CTA)
scripts/
  build-docx.ts         — builds the DOCX resume at build time
public/
  downloads/            — anirudh-vaka-resume-universal.docx
```

## Single source of truth

All resume content lives in [`data/resume.ts`](./data/resume.ts). The formatting layer — section order, labels, and which optional fields show (CGPA, notice period, references line, …) — lives in `UNIVERSAL_RULES` in [`lib/resumeRules.ts`](./lib/resumeRules.ts).

Both the `/resume` page (`app/resume/ResumeRenderer.tsx`) and the DOCX builder (`scripts/build-docx.ts`) render `data/resume.ts` through `UNIVERSAL_RULES`, so one edit updates the resume page, its print-to-PDF output, and `public/downloads/anirudh-vaka-resume-universal.docx`.

Each bullet carries a `core` / `extra` priority. `UNIVERSAL_RULES` uses `bulletFilter: "all"`, so every bullet ships.

## Build commands

| Command          | Effect                                              |
|------------------|------------------------------------------------------|
| `npm run dev`    | Next dev server on :3000                            |
| `npm run build`  | Builds the DOCX resume, then `next build`           |
| `npm run start`  | Production server                                   |
| `npm run lint`   | ESLint (`next lint`)                                |
| `npm run typecheck` | `tsc --noEmit`                                   |
| `npm run build:docx` | Regenerate `public/downloads/anirudh-vaka-resume-universal.docx` only |

## Deploying to Vercel (GitHub auto-deploy)

The repo is wired to Vercel via the GitHub integration — every push to a branch produces a Vercel preview URL, and every push to `main` ships to production at anirudhvaka.dev. No CLI needed.

The full ship workflow:

1. **Local sanity check first.**
   ```bash
   npm install
   npm run typecheck      # zero errors
   npm run build          # full production build (also regenerates the DOCX)
   npm run start          # spot-check http://localhost:3000 and /resume
   ```
2. **Push to a preview branch.**
   ```bash
   git checkout -b <branch>
   git add -A
   git commit -m "<message>"
   git push -u origin <branch>
   ```
   Vercel creates a preview URL within ~60s. Watch the GitHub PR / Vercel dashboard for the link.
3. **Verify the preview.**
   - Open the preview URL; click through the portfolio sections and the writeup.
   - Click "Resume"; press "Print / Save as PDF"; confirm output is single-column real text.
   - Click "Download Word"; open the file in Word; confirm bullets, hyperlinks, fonts.
4. **Promote to production by merging.**
   ```bash
   # Open a PR from the branch, get the Vercel preview link on it, click around,
   # then merge to main. Vercel auto-deploys the merge to anirudhvaka.dev.
   ```
5. **Post-deploy verification on production (5 min).**
   - Open https://anirudhvaka.dev and https://anirudhvaka.dev/resume.
   - Open the .docx; upload a PDF print to resumeworded.com or jobscan.co; target >90% parse (see [ATS verification](#ats-verification)).

**Vercel project settings that should already be correct** — verify in the dashboard if anything looks off:

| Setting              | Expected                                                    |
|----------------------|-------------------------------------------------------------|
| Framework Preset     | Next.js                                                     |
| Build Command        | `npm run build` (which chains `build:docx` then `next build`)|
| Install Command      | `npm install` (default)                                     |
| Output Directory     | `.next` (default)                                           |
| Node Version         | 20.x or 22.x                                                |
| Environment vars     | none required                                               |
| Domain               | anirudhvaka.dev → this project                              |

## ATS verification

The resume PDF (from "Print / Save as PDF" on `/resume`) and the DOCX should be tested at:
- https://resumeworded.com (free for 1 scan)
- https://jobscan.co (free trial, more detailed)

Target: >90% parsing accuracy. If a scan falls short, the most likely cause is grey-on-white text — the print CSS forces `#333` on body text, but custom job titles might inherit. Open Chrome DevTools, Print preview, sample text colours.
