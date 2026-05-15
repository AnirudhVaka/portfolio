import { resume } from "@/data/resume";
import type { ResumeData } from "@/data/resume";
import type { ResumeRules, SectionKey } from "@/lib/resumeRules";
import { bulletAllowed } from "@/lib/resumeRules";

/**
 * Region-agnostic resume renderer. Takes a content object (from
 * data/resume.ts) and a region's rules (from lib/resumeRules.ts) and
 * produces ATS-friendly single-column HTML.
 *
 * All formatting differences between regions are driven by the `rules`
 * argument — this file never branches on region directly.
 */

interface Props {
  data?: ResumeData;
  rules: ResumeRules;
}

export function ResumeRenderer({ data = resume, rules }: Props) {
  return (
    <main className="resume-page">
      <ResumeHeader data={data} rules={rules} />
      <MetaStrip data={data} rules={rules} />
      {rules.sectionOrder.map((key) => (
        <SectionByKey key={key} sectionKey={key} data={data} rules={rules} />
      ))}
    </main>
  );
}

function ResumeHeader({ data, rules }: { data: ResumeData; rules: ResumeRules }) {
  return (
    <header className="resume-header">
      <div className="resume-header-left">
        <h1>{data.contact.name}</h1>
        <span className="title-chip">{rules.titleChip}</span>
      </div>
      {rules.photoUrl && (
        <img
          className="resume-header-photo"
          src={rules.photoUrl}
          alt={`Headshot of ${data.contact.name}`}
        />
      )}
      <div className="resume-header-right">
        <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
        {" | "}
        <a href={`tel:${data.contact.phone.replace(/\s/g, "")}`}>
          {data.contact.phone}
        </a>
        {" | "}
        <a href={`https://${data.contact.portfolio}`} target="_blank" rel="noopener noreferrer">
          {data.contact.portfolio}
        </a>
        <br />
        {rules.locationLine}
        {" | "}
        <a href={`https://${data.contact.github}`} target="_blank" rel="noopener noreferrer">
          {data.contact.github}
        </a>
        {" | "}
        <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
          {data.contact.linkedin}
        </a>
      </div>
    </header>
  );
}

function MetaStrip({ data, rules }: { data: ResumeData; rules: ResumeRules }) {
  const items: string[] = [];
  if (rules.visaLine) items.push(rules.visaLine);
  if (rules.workModeLine) items.push(rules.workModeLine);
  if (rules.includeNoticePeriod) {
    items.push(`Notice period: ${data.noticePeriod}`);
  }
  if (items.length === 0) return null;
  return (
    <div className="resume-meta-strip">
      {items.map((line, i) => (
        <span key={i} className="item">
          {line}
        </span>
      ))}
    </div>
  );
}

function SectionByKey({
  sectionKey,
  data,
  rules,
}: {
  sectionKey: SectionKey;
  data: ResumeData;
  rules: ResumeRules;
}) {
  switch (sectionKey) {
    case "personalDetails":
      return <PersonalDetailsSection data={data} rules={rules} />;
    case "summary":
      return <SummarySection data={data} rules={rules} />;
    case "experience":
      return <ExperienceSection data={data} rules={rules} />;
    case "sideProjects":
      return <SideProjectsSection data={data} rules={rules} />;
    case "skills":
      return <SkillsSection data={data} />;
    case "education":
      return <EducationSection data={data} rules={rules} />;
    case "languages":
      return <LanguagesSection data={data} />;
    case "references":
      return <ReferencesSection />;
    default:
      return null;
  }
}

function PersonalDetailsSection({
  data,
  rules,
}: {
  data: ResumeData;
  rules: ResumeRules;
}) {
  const rows: Array<[string, string]> = [
    ["Location", rules.locationLine],
  ];
  if (rules.includeNationality && rules.nationality) {
    rows.push(["Nationality", rules.nationality]);
  }
  if (rules.includeNoticePeriod) {
    rows.push(["Notice period", data.noticePeriod]);
  }
  rows.push(["Languages", data.languages.map((l) => l.name).join(", ")]);

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">Personal Details</h2>
      <dl className="resume-personal">
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: "contents" }}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SummarySection({ data, rules }: { data: ResumeData; rules: ResumeRules }) {
  return (
    <section className="resume-section resume-summary">
      <h2 className="resume-section-title">{rules.summaryLabel}</h2>
      <p>{data.summary}</p>
    </section>
  );
}

function ExperienceSection({
  data,
  rules,
}: {
  data: ResumeData;
  rules: ResumeRules;
}) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{rules.experienceLabel}</h2>
      {data.experience.map((job) => {
        const bullets = job.bullets.filter((b) =>
          bulletAllowed(b.priority, rules.bulletFilter)
        );
        if (bullets.length === 0) return null;
        return (
          <article className="resume-job" key={job.id}>
            <div className="resume-job-header">
              <h3>{job.title}</h3>
              <span className="dates">{job.dates}</span>
            </div>
            <div className="company">
              {job.company}
              {job.clientContext ? ` · ${job.clientContext}` : ""} ·{" "}
              {job.location.toLowerCase() === job.mode.toLowerCase()
                ? job.mode
                : `${job.location} · ${job.mode}`}
            </div>
            <ul className="resume-bullets">
              {bullets.map((b, i) => (
                <li key={i}>{b.text}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}

function SideProjectsSection({
  data,
  rules,
}: {
  data: ResumeData;
  rules: ResumeRules;
}) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{rules.projectsLabel}</h2>
      {data.sideProjects.map((p) => (
        <article className="resume-project" key={p.id}>
          <div className="resume-project-header">
            <div className="name">
              {p.role} — <a href={p.url}>{p.name}</a>{" "}
              <span className="url">({p.url.replace(/^https?:\/\//, "")})</span>
            </div>
            <span className="dates">{p.dates}</span>
          </div>
          <p>{p.resumeBlurb}</p>
        </article>
      ))}
    </section>
  );
}

function SkillsSection({ data }: { data: ResumeData }) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">Technical Skills</h2>
      <ul className="resume-skills">
        {data.skills.map((g) => (
          <li key={g.label}>
            <strong>{g.label}:</strong> {g.items.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}

function EducationSection({
  data,
  rules,
}: {
  data: ResumeData;
  rules: ResumeRules;
}) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">Education</h2>
      <div className="resume-edu">
        <div className="deg">{data.education.degree}</div>
        <div className="inst">
          {data.education.institution}, {data.education.location}
        </div>
        <div className="meta">
          {data.education.dates}
          {rules.includeCGPA ? ` | CGPA: ${data.education.cgpa}` : ""}
        </div>
      </div>
    </section>
  );
}

function LanguagesSection({ data }: { data: ResumeData }) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">Languages</h2>
      <div className="resume-languages">
        {data.languages.map((l, i) => (
          <span key={l.name}>
            <strong>{l.name}</strong> — {l.level}
            {i < data.languages.length - 1 ? "  ·  " : ""}
          </span>
        ))}
      </div>
    </section>
  );
}

function ReferencesSection() {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">References</h2>
      <p className="resume-references">References available on request.</p>
    </section>
  );
}
