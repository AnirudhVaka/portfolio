/**
 * Per-region resume-rendering rules.
 *
 * The resume content lives in data/resume.ts as a single source of truth.
 * This file is the *formatting* layer — it controls:
 *
 *   - which sections appear and in what order
 *   - which optional fields show (CGPA, notice period, nationality, photo)
 *   - the visa-eligibility line
 *   - the city / location line on the header
 *   - which labels to use (e.g. "Professional Summary" vs "Personal Statement")
 *   - which bullet priority to keep ("core" only for tight 1-pagers,
 *     "core" + "extra" for 2-page variants)
 *
 * Adding a new region = adding a new entry to RULES. The renderer is
 * generic and doesn't need changes for new regions.
 */

import type { Region } from "./geo";

export type SectionKey =
  | "personalDetails"
  | "summary"
  | "experience"
  | "sideProjects"
  | "skills"
  | "education"
  | "languages"
  | "references";

export interface ResumeRules {
  /** Page-length hint shown to the user; affects bullet filter below. */
  lengthLabel: string;
  /** Bullet priority filter — core-only keeps the resume short. */
  bulletFilter: "core" | "all";
  /** Section order from top to bottom. */
  sectionOrder: SectionKey[];
  /** Heading shown above the summary paragraph. */
  summaryLabel: string;
  /** Section title for experience. */
  experienceLabel: string;
  /** Title used on the chip under the candidate name. */
  titleChip: string;
  /** Section title for projects. */
  projectsLabel: string;
  /** City / availability line on the right of the header. */
  locationLine: string;
  /** Visa eligibility line — appears just under contact links. Null = omit. */
  visaLine: string | null;
  /** Work-mode line (onsite/hybrid/remote). Null = omit. */
  workModeLine: string | null;
  /** Show CGPA on Education section. */
  includeCGPA: boolean;
  /** Show notice period on Personal Details / Summary. */
  includeNoticePeriod: boolean;
  /** Show nationality (SG-only). */
  includeNationality: boolean;
  /** Spoken nationality value when includeNationality is true. */
  nationality?: string;
  /** Slot for a hosted photo URL (Germany only, optional). */
  photoUrl?: string | null;
  /** "References available upon request." line (UK / IE / ANZ). */
  showReferencesLine: boolean;
  /** Spelling: subtle differences in copy. */
  spelling: "en-US" | "en-UK" | "en-CA";
  /** Filename slug for the downloadable artifacts. */
  fileSlug: string;
}

/**
 * Filter resume bullets per the region's rules.
 */
export function bulletAllowed(
  priority: "core" | "extra",
  filter: ResumeRules["bulletFilter"]
): boolean {
  return filter === "all" || priority === "core";
}

const SECTIONS_DEFAULT: SectionKey[] = [
  "summary",
  "experience",
  "sideProjects",
  "skills",
  "education",
  "languages",
];

export const RULES: Record<Region, ResumeRules> = {
  in: {
    lengthLabel: "1–2 pages",
    bulletFilter: "all",
    sectionOrder: SECTIONS_DEFAULT,
    summaryLabel: "Professional Summary",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Hyderabad, India",
    visaLine: null, // No visa needed.
    workModeLine: null,
    includeCGPA: true,
    includeNoticePeriod: true,
    includeNationality: false,
    showReferencesLine: false,
    spelling: "en-US",
    fileSlug: "in",
  },

  us: {
    lengthLabel: "1 page",
    bulletFilter: "core",
    sectionOrder: ["summary", "experience", "sideProjects", "skills", "education"],
    summaryLabel: "Summary",
    experienceLabel: "Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Projects",
    locationLine: "Open to relocate · Hyderabad, India",
    visaLine: "Work authorization: requires H1B sponsorship",
    workModeLine: "Open to onsite, hybrid, or fully remote in the US",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: false,
    spelling: "en-US",
    fileSlug: "us",
  },

  de: {
    lengthLabel: "2 pages",
    bulletFilter: "all",
    sectionOrder: [
      "personalDetails",
      "summary",
      "experience",
      "sideProjects",
      "skills",
      "education",
      "languages",
    ],
    summaryLabel: "Professional Summary",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Open to relocate to Germany · Hyderabad, India",
    visaLine: "Visa: requires EU Blue Card sponsorship",
    workModeLine: "Open to onsite, hybrid, or fully remote in Germany",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    photoUrl: null, // Drop a /public/de-headshot.jpg path here when Anirudh provides one.
    showReferencesLine: false,
    spelling: "en-UK",
    fileSlug: "de",
  },

  nl: {
    lengthLabel: "1–2 pages",
    bulletFilter: "all",
    sectionOrder: SECTIONS_DEFAULT,
    summaryLabel: "Professional Summary",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Open to relocate to the Netherlands · Hyderabad, India",
    visaLine:
      "Open to relocate; eligible for Highly Skilled Migrant visa sponsorship",
    workModeLine: "Open to onsite, hybrid, or fully remote in the Netherlands",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: false,
    spelling: "en-UK",
    fileSlug: "nl",
  },

  ie: {
    lengthLabel: "2 pages",
    bulletFilter: "all",
    sectionOrder: [
      "summary",
      "experience",
      "sideProjects",
      "skills",
      "education",
      "languages",
      "references",
    ],
    summaryLabel: "Personal Statement",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Open to relocate to Ireland · Hyderabad, India",
    visaLine:
      "Open to relocate; eligible for Critical Skills Employment Permit (DevOps on the eligible occupations list)",
    workModeLine: "Open to onsite, hybrid, or fully remote in Ireland",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: true,
    spelling: "en-UK",
    fileSlug: "ie",
  },

  uk: {
    lengthLabel: "2 pages",
    bulletFilter: "all",
    sectionOrder: [
      "summary",
      "experience",
      "sideProjects",
      "skills",
      "education",
      "references",
    ],
    summaryLabel: "Personal Statement",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Open to relocate to the UK · Hyderabad, India",
    visaLine:
      "Open to relocate; requires Skilled Worker visa sponsorship (eligible role)",
    workModeLine: "Open to onsite, hybrid, or fully remote in the UK",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: true,
    spelling: "en-UK",
    fileSlug: "uk",
  },

  ca: {
    lengthLabel: "1–2 pages",
    bulletFilter: "all",
    sectionOrder: ["summary", "experience", "sideProjects", "skills", "education"],
    summaryLabel: "Professional Summary",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Projects",
    locationLine: "Open to relocate to Canada · Hyderabad, India",
    visaLine: "Open to relocate; eligible for Global Talent Stream",
    workModeLine: "Open to onsite, hybrid, or fully remote in Canada",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: false,
    spelling: "en-CA",
    fileSlug: "ca",
  },

  sg: {
    lengthLabel: "1–2 pages",
    bulletFilter: "all",
    sectionOrder: [
      "personalDetails",
      "summary",
      "experience",
      "sideProjects",
      "skills",
      "education",
    ],
    summaryLabel: "Professional Summary",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Open to relocate to Singapore · Hyderabad, India",
    visaLine: "Open to relocate; eligible for Employment Pass",
    workModeLine: "Open to onsite, hybrid, or fully remote in Singapore",
    includeCGPA: true,
    includeNoticePeriod: true, // SG employers commonly ask.
    includeNationality: true,
    nationality: "Indian",
    showReferencesLine: false,
    spelling: "en-UK",
    fileSlug: "sg",
  },

  anz: {
    lengthLabel: "2–3 pages",
    bulletFilter: "all",
    sectionOrder: [
      "summary",
      "skills",
      "experience",
      "sideProjects",
      "education",
      "references",
    ],
    summaryLabel: "Career Summary",
    experienceLabel: "Professional Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Side Projects",
    locationLine: "Open to relocate to Australia / NZ · Hyderabad, India",
    visaLine:
      "Open to relocate; eligible for Skills in Demand visa (Australia) or Skilled Migrant Category (NZ)",
    workModeLine: "Open to onsite, hybrid, or fully remote in Australia / NZ",
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: true,
    spelling: "en-UK",
    fileSlug: "anz",
  },

  global: {
    lengthLabel: "1 page",
    bulletFilter: "core",
    sectionOrder: ["summary", "experience", "sideProjects", "skills", "education"],
    summaryLabel: "Summary",
    experienceLabel: "Experience",
    titleChip: "Senior DevOps Engineer",
    projectsLabel: "Projects",
    locationLine: "Hyderabad, India · IST (UTC+5:30) · Open to remote anywhere",
    visaLine: null,
    workModeLine: null,
    includeCGPA: false,
    includeNoticePeriod: false,
    includeNationality: false,
    showReferencesLine: false,
    spelling: "en-US",
    fileSlug: "global",
  },
};
