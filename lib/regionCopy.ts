/**
 * Region-variant copy: the small differences between what each visitor sees.
 *
 * Two things vary by region on the portfolio page:
 *   - intro paragraph closing clause (`introClause`)
 *   - contact CTA suffix (same text, surfaced in two places)
 *
 * Resume-side differences (length, photo, section order, visa line) live in
 * the resume renderer components, not here. This file is portfolio-only copy.
 */

import type { Region } from "./geo";

/** Full sentence that closes the intro paragraph after "Currently exploring … in …". */
export const INTRO_CLAUSE: Record<Region, string> = {
  in: "India (Hyderabad, Bangalore, Gurgaon) or fully remote.",
  us: "the United States (open to H1B sponsorship) or fully remote.",
  de: "Germany (open to EU Blue Card) or fully remote.",
  nl: "the Netherlands (open to Highly Skilled Migrant visa) or fully remote.",
  ie: "Ireland (open to Critical Skills Employment Permit) or fully remote.",
  uk: "the UK (open to Skilled Worker visa) or fully remote.",
  ca: "Canada (open to Global Talent Stream) or fully remote.",
  sg: "Singapore (open to Employment Pass) or fully remote.",
  anz: "Australia / NZ (open to Skills in Demand visa) or fully remote.",
  global: "Europe, fully remote, or India.",
};

/** Compact role-pitch sentence used on the contact CTA. */
export const CONTACT_CTA: Record<Region, string> = {
  in: "Open to Senior DevOps / Platform / SRE roles in India (Hyderabad, Bangalore, Gurgaon) or fully remote. Let's talk.",
  us: "Open to Senior DevOps / Platform / SRE roles in the United States (open to H1B sponsorship) or fully remote. Let's talk.",
  de: "Open to Senior DevOps / Platform / SRE roles in Germany (open to EU Blue Card) or fully remote. Let's talk.",
  nl: "Open to Senior DevOps / Platform / SRE roles in the Netherlands (open to Highly Skilled Migrant visa) or fully remote. Let's talk.",
  ie: "Open to Senior DevOps / Platform / SRE roles in Ireland (open to Critical Skills Employment Permit) or fully remote. Let's talk.",
  uk: "Open to Senior DevOps / Platform / SRE roles in the UK (open to Skilled Worker visa) or fully remote. Let's talk.",
  ca: "Open to Senior DevOps / Platform / SRE roles in Canada (open to Global Talent Stream) or fully remote. Let's talk.",
  sg: "Open to Senior DevOps / Platform / SRE roles in Singapore (open to Employment Pass) or fully remote. Let's talk.",
  anz: "Open to Senior DevOps / Platform / SRE roles in Australia / NZ (open to Skills in Demand / Skilled Migrant visa) or fully remote. Let's talk.",
  global: "Open to Senior DevOps / Platform / SRE roles across Europe, fully remote, or India. Let's talk.",
};

/** Compose the full intro paragraph with the region-specific clause. */
export function introParagraph(region: Region): string {
  return `I build and operate production infrastructure — and I ship products on top of it. By day, I lead DevOps for an enterprise SaaS platform and operate an on-prem Kubernetes data center I built from bare metal. Outside work, I run two paid SaaS products — PrepAtlas (AI-grounded exam prep) and HumanifyCV (AI text humanization). Currently exploring Senior DevOps / Platform / SRE roles in ${INTRO_CLAUSE[region]}`;
}
