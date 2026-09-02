/**
 * Resume-rendering rules.
 *
 * The resume content lives in data/resume.ts as a single source of truth.
 * This file is the *formatting* layer — section order, labels, and which
 * optional fields show.
 *
 * There is now ONE comprehensive resume for everyone (`UNIVERSAL_RULES`):
 * every bullet (core + extra), every section, all the detail. The renderer
 * (ResumeRenderer) and the DOCX builder (scripts/build-docx.ts) both consume
 * this single ruleset — no per-region variants.
 */

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

/**
 * The single, comprehensive resume shown to everyone. `bulletFilter: "all"`
 * keeps every experience bullet; the section order includes every section so
 * nothing is trimmed. One download artifact: anirudh-vaka-resume-universal.docx.
 */
export const UNIVERSAL_RULES: ResumeRules = {
  lengthLabel: "comprehensive",
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
  summaryLabel: "Professional Summary",
  experienceLabel: "Professional Experience",
  titleChip: "Senior DevOps / Platform / SRE Engineer · AI Infrastructure & LLMOps",
  projectsLabel: "Products & Side Projects",
  // Relocation/remote detail lives in the meta strip (visaLine) to avoid
  // duplicating it here and over-widening the header's right column.
  locationLine: "Hyderabad, India · IST (UTC+5:30)",
  visaLine: "Open to relocation worldwide with visa sponsorship, or fully remote",
  workModeLine: null,
  includeCGPA: true,
  includeNoticePeriod: true,
  includeNationality: false,
  showReferencesLine: true,
  spelling: "en-US",
  fileSlug: "universal",
};
