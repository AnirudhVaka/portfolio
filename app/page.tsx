import type { Metadata } from "next";
import { getRegion } from "@/lib/getRegion";
import { REGION_LABEL } from "@/lib/geo";
import { INTRO_CLAUSE } from "@/lib/regionCopy";
import { Nav } from "./_components/Nav";
import { Hero } from "./_components/Hero";
import { PipelineWidget } from "./_components/PipelineWidget";
import { IntroSection } from "./_components/IntroSection";
import { MetricsStrip } from "./_components/MetricsStrip";
import { ProjectsSection } from "./_components/ProjectsSection";
import { SkillsSection } from "./_components/SkillsSection";
import { WriteupsSection } from "./_components/WriteupsSection";
import { ContactFooter } from "./_components/ContactFooter";
import { RevealController } from "./_components/RevealController";

/**
 * Portfolio root.
 *
 * Server Component. Resolves the visitor's region once (server-side from
 * cookie or x-vercel-ip-country header), then composes the seven sections
 * spec'd in the brief:
 *   1. Hero (region pill)
 *   2. Intro paragraph (visa clause varies by region)
 *   3. Pipeline widget (decorative)
 *   4. Metrics strip (hardcoded, no animation)
 *   5. Projects (PrepAtlas, HumanifyCV, AICPA, TimeChamp — in that order)
 *   6. Tech stack (consolidated, no duplication)
 *   7. Engineering writeups
 *   8. Contact + footer (region-aware CTA, LinkedIn URL fixed)
 *
 * Everything except RegionSwitcher / Nav / PipelineWidget / FlowNode /
 * RevealController is a Server Component — minimal JS shipped to the
 * browser.
 */
export default async function HomePage() {
  const { region, source } = await getRegion();

  return (
    <>
      <Nav region={region} source={source} />
      <main>
        <Hero region={region} />
        <IntroSection region={region} />
        <PipelineWidget />
        <MetricsStrip />
        <ProjectsSection />
        <SkillsSection />
        <WriteupsSection />
        <ContactFooter region={region} />
      </main>
      <RevealController />
    </>
  );
}

// Force per-request rendering — the page reads cookies and headers.
export const dynamic = "force-dynamic";

/**
 * Per-region metadata: visa eligibility and region name appear in the
 * meta description so the social card and search snippet match the body
 * the visitor will actually see. Title stays clean.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { region } = await getRegion();
  const description = `Senior DevOps Engineer running production infrastructure on AWS + on-prem Kubernetes. Founder of PrepAtlas + HumanifyCV. Exploring roles in ${INTRO_CLAUSE[region]}`;
  return {
    title: `Senior DevOps Engineer · ${REGION_LABEL[region]} view`,
    description,
    openGraph: {
      title: "Anirudh Vaka — Senior DevOps Engineer",
      description,
    },
    twitter: {
      title: "Anirudh Vaka — Senior DevOps Engineer",
      description,
    },
  };
}
