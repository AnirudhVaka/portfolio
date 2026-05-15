import type { Metadata } from "next";
import { getRegion } from "@/lib/getRegion";
import { REGION_LABEL } from "@/lib/geo";
import { RULES } from "@/lib/resumeRules";
import { ResumeRenderer } from "./ResumeRenderer";
import { ResumeToolbar } from "./ResumeToolbar";
import "./resume.css";

/**
 * /resume route — region-adaptive resume.
 *
 * Reads region cookie / header, looks up the matching rules, hands them
 * to ResumeRenderer along with the universal `resume` data from
 * data/resume.ts. Per-region toolbar at the top offers Print and
 * Download Word.
 *
 * Pre-built DOCX files live at /public/downloads/anirudh-vaka-resume-{slug}.docx,
 * generated at build time by scripts/build-docx.mjs.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { region } = await getRegion();
  return {
    title: `Resume · ${REGION_LABEL[region]}`,
    description: `Anirudh Vaka — Senior DevOps Engineer · resume formatted for ${REGION_LABEL[region]}.`,
  };
}

export default async function ResumePage() {
  const { region, source } = await getRegion();
  const rules = RULES[region];

  return (
    <div className="resume-shell">
      <ResumeToolbar region={region} source={source} rules={rules} />
      <ResumeRenderer rules={rules} />
    </div>
  );
}
