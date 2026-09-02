import { MessageSquare, Brain, Database, Bot, BookOpen } from "lucide-react";
import { resume } from "@/data/resume";
import { FlowNode } from "./FlowNode";

/**
 * PrepAtlas — the headline side product, first in the projects list.
 *
 * Diagram: the 5-stage learning-path pipeline that actually ships
 * (Query → budget check → PocketBase records → provider-routed LLM →
 * schema-validated plan). The earlier version of this card drew an
 * embed → pgvector → cosine-retrieve flow; the `embedding` column
 * exists in the schema but nothing backfills or queries it, so the
 * diagram now matches the code.
 */
export function PrepAtlasCard() {
  const project = resume.sideProjects.find((p) => p.id === "prepatlas")!;

  return (
    <article className="project-card" id="prepatlas" data-reveal>
      <div className="project-head">
        <span className="project-tag green mono">Product · Live</span>
        <h2 className="project-title">{project.name}</h2>
      </div>
      <p className="project-tagline">{project.tagline}</p>

      <div className="project-body">
        <p>
          <strong>The problem.</strong> Exam prep is sold as content — a fixed
          syllabus, recorded lectures, one generic question bank. None of it
          knows which topic a particular student is actually weak at, so
          everyone practises the same things and revises what they already know.
        </p>
        <p>
          <strong>The approach.</strong> Close the loop: teach, practise,
          measure, adapt. An AI tutor teaches over chat, voice, and generated
          video; an exam engine runs real timed attempts with mark-for-review,
          negative marking, and auto-submit; and what a student gets wrong feeds
          the next plan. Thirteen role-based career tracks sit on the same
          engine, with mock interviews, JD analysis, and resume review for
          students on the way out.
        </p>
        <p>
          <strong>The engineering.</strong> Every model call is grounded in
          structured records, not recall. Profile, active path, and prior tasks
          load from PocketBase and go in as explicit context; the model is
          routed to Claude or NVIDIA behind one provider interface; responses
          are schema-validated before they persist, so off-syllabus output is
          rejected rather than rendered. Each call is metered against a per-user
          daily token budget so cost can&apos;t run away.
        </p>
        <p>
          <strong>The outcome.</strong> 20+ paying users in beta on a $35/month
          AWS stack. Sub-200KB JS on critical paths, an offline-capable PWA via
          Serwist, and the same Next.js bundle wrapped as an Android TWA with
          Bubblewrap — one codebase, Play Store install, works on a weak
          connection.
        </p>
      </div>

      <div
        className="flow-container"
        role="img"
        aria-label="PrepAtlas learning-path pipeline"
      >
        <div className="flow-track">
          <FlowNode
            mode="static"
            icon={<MessageSquare size={20} />}
            title="Student Query"
            badge="UTF-8 in"
            detail="Natural-language question entered in the Next.js client. Tokenised, normalised."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">meter</span>
          </div>
          <FlowNode
            mode="static"
            icon={<Brain size={20} />}
            title="Token Budget"
            badge="per-user cap"
            detail="Daily token spend is checked before any model call. Over-budget requests are refused outright — cost can't run away on a $35/mo box."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">load</span>
          </div>
          <FlowNode
            mode="static"
            icon={<Database size={20} />}
            title="Student Context"
            badge="PocketBase"
            detail="Profile, active learning path, chapter set, and prior daily tasks are read from the self-hosted PocketBase collections and passed as explicit context."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">prompt</span>
          </div>
          <FlowNode
            mode="static"
            icon={<Bot size={20} />}
            title="LLM"
            badge="provider-routed"
            detail="Anthropic Claude or NVIDIA behind one provider interface, prompted with the loaded records plus Indian-curriculum constraints (NCERT, JEE/NEET/UPSC)."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">validate</span>
          </div>
          <FlowNode
            mode="static"
            icon={<BookOpen size={20} />}
            title="Validated Plan"
            badge="schema-checked"
            detail="Response is parsed against a schema before persisting. Invalid or off-syllabus output is rejected, never rendered to the student."
          />
        </div>
      </div>

      <ul className="project-decisions">
        <li>
          <strong>Backend</strong>
          Self-hosted PocketBase over hosted Supabase — auth, records, rules,
          and file storage in one binary on the box already being paid for,
          with no per-row quota to grow into.
        </li>
        <li>
          <strong>Mobile shipping</strong>
          Bubblewrap TWA over React Native — same Next.js bundle, no
          duplicate codebase, Play Store install in under a week.
        </li>
        <li>
          <strong>Hosting</strong>
          $35/mo AWS EC2 + nginx + pm2 — predictable cost, no surprise
          bills, easy to step up to ECS if traffic warrants it.
        </li>
        <li>
          <strong>Performance budget</strong>
          Sub-200KB JS on critical paths — measurable, enforceable, falls
          straight out of Next.js bundle analysis.
        </li>
        <li>
          <strong>Offline</strong>
          Serwist service worker over a native rewrite — the students who
          need this most are on entry-level Android and patchy data.
        </li>
      </ul>

      <div className="project-metrics">
        <span className="metric">
          <strong>20+</strong> paying users in beta
        </span>
        <span className="metric">
          <strong>$35/mo</strong> hosting cost
        </span>
        <span className="metric">
          <strong>&lt;200KB</strong> critical-path JS
        </span>
      </div>

      <div className="project-stack">
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>

      <div className="project-actions">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <span>Visit prepatlas.in →</span>
        </a>
        {project.engineeringWriteupUrl && (
          <a
            href={project.engineeringWriteupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <span>Engineering deep-dive</span>
          </a>
        )}
      </div>
    </article>
  );
}
