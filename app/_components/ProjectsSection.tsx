import { AiInfraCard } from "./projects/AiInfraCard";
import { AicpaCard } from "./projects/AicpaCard";
import { TimeChampCard } from "./projects/TimeChampCard";
import { FinOpsCard } from "./projects/FinOpsCard";

/**
 * Projects section — the AI-infra differentiator first, then the day-job
 * platforms, and the FinOps story.
 * Order: AI-Infra (featured), AICPA, TimeChamp, FinOps.
 */
export function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title" data-reveal>
          Selected <span className="gradient">Projects</span>
        </h2>
        <p className="section-sub" data-reveal>
          The AI platform I built for internal engineering, and the production
          infrastructure I architect and operate for work.
        </p>

        <AiInfraCard />
        <AicpaCard />
        <TimeChampCard />
        <FinOpsCard />
      </div>
    </section>
  );
}
