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
import { BootSequence } from "./_components/BootSequence";
import { StatusBar } from "./_components/StatusBar";
import { Interactions } from "./_components/Interactions";

/**
 * Portfolio root — one universal version for everyone (no region detection).
 *
 * Static Server Component. Title/OG/description come from the root layout's
 * metadata; page content is a single universal variant. Only Nav, the hero
 * background, the pipeline/terminal/metrics interactions, RevealController,
 * and Interactions ship JS — everything else is server-rendered.
 */
export default function HomePage() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <BootSequence />
      <Nav />
      <main>
        <Hero />
        <IntroSection />
        <PipelineWidget />
        <MetricsStrip />
        <ProjectsSection />
        <SkillsSection />
        <WriteupsSection />
        <ContactFooter />
      </main>
      <StatusBar />
      <RevealController />
      <Interactions />
    </>
  );
}
