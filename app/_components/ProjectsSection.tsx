import { PrepAtlasCard } from "./projects/PrepAtlasCard";
import { HumanifyCVCard } from "./projects/HumanifyCVCard";
import { AicpaCard } from "./projects/AicpaCard";
import { TimeChampCard } from "./projects/TimeChampCard";

/**
 * Projects section — the lead products first, then the day-job work.
 * Order is fixed: PrepAtlas, HumanifyCV, AICPA, TimeChamp.
 */
export function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title" data-reveal>
          Selected <span className="gradient">Projects</span>
        </h2>
        <p className="section-sub" data-reveal>
          Two products I run end-to-end with paying users, and two production
          platforms I architect and operate for work.
        </p>

        <PrepAtlasCard />
        <HumanifyCVCard />
        <AicpaCard />
        <TimeChampCard />
      </div>
    </section>
  );
}
