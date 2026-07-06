import { Activity, Brain, Wrench, GitPullRequest, ShieldCheck, Rocket } from "lucide-react";
import { FlowNode } from "./FlowNode";
import { RunnableFlow } from "./RunnableFlow";

/**
 * AI-Infrastructure — the strongest differentiator (brief A2). Self-hosted
 * open LLMs on bare metal, a multi-provider AI router, and an AI-in-SDLC
 * auto-remediation pipeline. Follows the Problem/Approach/Outcome + metric-chip
 * pattern of the other project cards; marked `is-featured` for the border-beam.
 */
export function AiInfraCard() {
  return (
    <article className="project-card is-featured" id="ai-infra" data-reveal>
      <div className="project-head">
        <span className="project-tag cyan mono">AI Infrastructure · Production</span>
        <h2 className="project-title">
          Self-Hosted LLM Platform &amp; AI-in-SDLC Auto-Remediation
        </h2>
      </div>
      <p className="project-tagline">
        Open LLMs on bare metal, a multi-provider AI router, and an
        auto-remediation pipeline that detects, diagnoses, and ships its own
        fixes behind a QA gate.
      </p>

      <div className="project-body">
        <p>
          <strong>The problem.</strong> Sending internal code and logs to a
          third-party API is a non-starter for some workloads, and paying
          per-token for high-volume internal tooling doesn&apos;t scale. Separately,
          the slowest part of an incident is rarely the fix itself — it&apos;s the
          human round-trip from &quot;something&apos;s wrong&quot; to &quot;here&apos;s the
          diagnosis&quot; to &quot;here&apos;s a PR.&quot;
        </p>
        <p>
          <strong>The approach.</strong> I run open models (DeepSeek, Qwen)
          self-hosted on the on-prem bare-metal cluster via Ollama — powering an
          internal chatbot and a Copilot-style coding assistant with grounded RAG
          over pgvector. A custom AI router sits in front of everything, handling
          prompt caching, model routing, vision, and abort-signal cancellation
          across Anthropic Claude, Azure OpenAI, and Azure Speech. On top of that
          runs an AI-in-SDLC auto-remediation pipeline: an LLM reads the error
          from logs, diagnoses the root cause, generates a fix, opens a PR, and
          lets automated QA gate the release.
        </p>
        <p>
          <strong>The outcome.</strong> Sensitive workloads never leave the data
          center, high-volume internal AI runs at zero marginal token cost, and
          the detect→PR loop measurably reduced MTTR — humans review the fix
          instead of authoring it from scratch.
        </p>
      </div>

      <RunnableFlow ariaLabel="AI-in-SDLC auto-remediation flow" label="Run remediation">
          <FlowNode
            icon={<Activity size={20} />}
            title="Detect"
            badge="from logs"
            detail="An LLM watches the log/alert stream and classifies real errors out of the noise — the entry point of the remediation loop."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">parse</span>
          </div>
          <FlowNode
            icon={<Brain size={20} />}
            title="Diagnose"
            badge="root cause"
            detail="Grounded against the codebase + prior incidents via RAG, the model proposes a root-cause hypothesis rather than just restating the symptom."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">reason</span>
          </div>
          <FlowNode
            icon={<Wrench size={20} />}
            title="Generate Fix"
            badge="code diff"
            detail="The model produces a concrete patch scoped to the diagnosed cause — a diff, not a suggestion."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">open</span>
          </div>
          <FlowNode
            icon={<GitPullRequest size={20} />}
            title="Open PR"
            badge="human-in-loop"
            detail="The fix lands as a pull request with the diagnosis attached, so a human reviews an explained change instead of a raw alert."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">gate</span>
          </div>
          <FlowNode
            icon={<ShieldCheck size={20} />}
            title="QA Gate"
            badge="automated"
            detail="Automated QA must pass before the change is eligible to release — the safety valve that makes auto-generated fixes trustworthy."
          />
          <div className="flow-connector">
            <span className="flow-connector-label">ship</span>
          </div>
          <FlowNode
            icon={<Rocket size={20} />}
            title="Release"
            badge="MTTR ↓"
            detail="Gated changes release through the normal pipeline. The loop turns incident time from author-from-scratch into review-and-approve."
          />
      </RunnableFlow>

      <div className="infra-layers">
        <div className="infra-layer l-model">
          <div className="layer-header">
            <span className="layer-label">Model Layer</span>
            <span className="layer-location">on-prem · bare metal</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Ollama</span>
            <span className="layer-pill">DeepSeek</span>
            <span className="layer-pill">Qwen</span>
            <span className="layer-pill">$0 marginal token cost</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" />
          </div>
        </div>
        <div className="infra-layer l-router">
          <div className="layer-header">
            <span className="layer-label">Router Layer</span>
            <span className="layer-location">custom AI router</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Prompt caching</span>
            <span className="layer-pill">Model routing</span>
            <span className="layer-pill">Vision</span>
            <span className="layer-pill">Abort-signal cancellation</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
        <div className="infra-layer l-providers">
          <div className="layer-header">
            <span className="layer-label">Providers</span>
            <span className="layer-location">multi-cloud</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Anthropic Claude</span>
            <span className="layer-pill">Azure OpenAI</span>
            <span className="layer-pill">Azure Speech</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" style={{ animationDelay: "1.2s" }} />
          </div>
        </div>
        <div className="infra-layer l-surfaces">
          <div className="layer-header">
            <span className="layer-label">Surfaces</span>
            <span className="layer-location">grounded on pgvector RAG</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Internal chatbot</span>
            <span className="layer-pill">Copilot-style coding assistant</span>
            <span className="layer-pill">RAG (pgvector)</span>
          </div>
        </div>
      </div>

      <ul className="project-decisions">
        <li>
          <strong>Self-hosted first</strong>
          Open models on-prem via Ollama for anything sensitive or
          high-volume — data stays in the data center, no per-token bill.
        </li>
        <li>
          <strong>One router, many providers</strong>
          A single AI router abstracts Claude, Azure OpenAI, and Azure Speech —
          prompt caching, routing, and abort-signal handling live in one place.
        </li>
        <li>
          <strong>Grounded, not guessing</strong>
          RAG over pgvector so assistants answer from the actual codebase and
          docs instead of hallucinating.
        </li>
        <li>
          <strong>Auto-remediation, gated</strong>
          LLMs open PRs, but automated QA — not the model — decides what ships.
          Human reviews an explained diff, not a raw alert.
        </li>
      </ul>

      <div className="project-metrics">
        <span className="metric">
          <strong>$0</strong> marginal token cost on self-hosted
        </span>
        <span className="metric">
          <strong>3 → 1</strong> providers behind one router
        </span>
        <span className="metric">
          <strong>MTTR ↓</strong> via detect → PR loop
        </span>
      </div>

      <div className="project-stack">
        <span>Ollama</span>
        <span>DeepSeek</span>
        <span>Qwen</span>
        <span>pgvector</span>
        <span>Anthropic Claude</span>
        <span>Azure OpenAI</span>
        <span>Azure Speech</span>
        <span>RAG</span>
        <span>GitHub Actions</span>
      </div>

      <div className="project-actions">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="btn btn-ghost"
          title="Internal platform — details on request"
        >
          <span>Internal platform · details on request</span>
        </button>
      </div>
    </article>
  );
}
