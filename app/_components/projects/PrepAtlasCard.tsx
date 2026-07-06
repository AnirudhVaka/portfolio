import { MessageSquare, Brain, Database, Bot, BookOpen } from "lucide-react";
import { resume } from "@/data/resume";
import { FlowNode } from "./FlowNode";

/**
 * PrepAtlas — the headline side product, first in the projects list.
 *
 * Diagram: 5-stage RAG flow (Query → Embed → pgvector retrieve →
 * Claude with grounded context → Cited answer) — matches what the
 * engineering writeup at prepatlas.in/engineering describes.
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
          <strong>The problem.</strong> Indian exam prep platforms surface
          confident-but-unsourced answers — students can't verify what they're
          memorising, and hallucinated facts get propagated as truth.
        </p>
        <p>
          <strong>The approach.</strong> Retrieval-Augmented Generation grounded
          in a curated corpus. Every answer cites the source passage(s) it was
          generated from. Queries are embedded, matched against pgvector in
          Supabase Postgres, and the top-K passages are passed as context to
          Claude — answers that can't be grounded are refused rather than
          hallucinated.
        </p>
        <p>
          <strong>The outcome.</strong> 20+ paying users in beta on a $35/month
          AWS stack. Sub-200KB JS on critical paths. Wrapped as an Android TWA
          via Bubblewrap so the same Next.js bundle ships native-feel on Play
          Store.
        </p>
      </div>

      <div className="flow-container" role="img" aria-label="PrepAtlas RAG pipeline">
        <div className="flow-track">
          <FlowNode
            mode="static"
            icon={<MessageSquare size={20} />}
            title="Student Query"
            badge="UTF-8 in"
            detail="Natural-language question entered in the Next.js client. Tokenised, normalised."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">embed</span>
          </div>
          <FlowNode
            mode="static"
            icon={<Brain size={20} />}
            title="Embed"
            badge="Claude embed"
            detail="Query embedded into a 1536-dim vector. Cached on the user record for repeat hits."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">pgvector</span>
          </div>
          <FlowNode
            mode="static"
            icon={<Database size={20} />}
            title="Retrieve"
            badge="Top-K passages"
            detail="Cosine-similarity search against the curated corpus stored in Supabase Postgres + pgvector. K = 5."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">ground</span>
          </div>
          <FlowNode
            mode="static"
            icon={<Bot size={20} />}
            title="Claude"
            badge="grounded prompt"
            detail="Anthropic Claude prompted with retrieved passages as context and a strict 'refuse if not in context' instruction."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">cite</span>
          </div>
          <FlowNode
            mode="static"
            icon={<BookOpen size={20} />}
            title="Cited Answer"
            badge="source-linked"
            detail="Returned answer links every claim back to the passage it was generated from. Ungrounded claims are blocked."
          />
        </div>
      </div>

      <ul className="project-decisions">
        <li>
          <strong>Vector DB</strong>
          pgvector inside Supabase over Pinecone — one fewer service, RLS on
          the same Postgres, and quotas covered by the existing free tier.
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
