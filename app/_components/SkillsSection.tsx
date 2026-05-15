import { resume } from "@/data/resume";

/**
 * Consolidated tech stack — single grid, no duplication.
 *
 * Brief's "TECH STACK (CONSOLIDATE — currently duplicated). Pick the
 * cleaner visual (icon grid with category headers) and DROP the
 * redundant second list."
 *
 * Skill content is read from data/resume.ts — same source as the resume,
 * so anything dropped from the resume is also dropped here. Trend Micro,
 * SentinelOne, Power Automate, and Lerna-as-top-level were removed at
 * the data level.
 */
export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title" data-reveal>
          Tech <span className="gradient">Stack</span>
        </h2>
        <p className="section-sub" data-reveal>
          Technologies I use daily to build, ship, and operate production
          infrastructure and side products.
        </p>
        <div className="skills-grid" data-reveal>
          {resume.skills.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
