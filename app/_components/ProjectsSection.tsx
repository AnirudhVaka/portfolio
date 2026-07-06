import { PrepAtlasCard } from "./projects/PrepAtlasCard";
import { HumanifyCVCard } from "./projects/HumanifyCVCard";
import { AiInfraCard } from "./projects/AiInfraCard";
import { AicpaCard } from "./projects/AicpaCard";
import { TimeChampCard } from "./projects/TimeChampCard";
import { FinOpsCard } from "./projects/FinOpsCard";

/**
 * Projects section — the lead products first, then the AI-infra differentiator,
 * the day-job platforms, and the FinOps story.
 * Order: PrepAtlas, HumanifyCV, AI-Infra (featured), AICPA, TimeChamp, FinOps.
 */
export function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title" data-reveal>
          Selected <span className="gradient">Projects</span>
        </h2>
        <p className="section-sub" data-reveal>
          Two products I run end-to-end with paying users, the AI platform I built
          for internal engineering, and the production infrastructure I architect
          and operate for work.
        </p>

        <PrepAtlasCard />
        <HumanifyCVCard />
        <AiInfraCard />
        <AicpaCard />
        <TimeChampCard />
        <FinOpsCard />
      </div>
    </section>
  );
}
