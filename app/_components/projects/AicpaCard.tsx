import { GitBranch, Server, GitPullRequest, Rocket } from "lucide-react";
import { FlowNode } from "./FlowNode";
import { RunnableFlow } from "./RunnableFlow";

/**
 * AICPA & CIMA — third in the projects list. Existing FBE flow preserved
 * from v1 design system; brief asked to keep the visual + add the 70%
 * release-error reduction metric prominently + "London-based enterprise"
 * context + correct stack tags.
 */
export function AicpaCard() {
  return (
    <article className="project-card" id="aicpa" data-reveal>
      <div className="project-head">
        <span className="project-tag blue mono">Client engagement · Ongoing</span>
        <h2 className="project-title">AICPA &amp; CIMA Enterprise Platform</h2>
      </div>
      <p className="project-tagline">
        Multi-region AWS deployment + label-driven GitOps for a London-based
        enterprise SaaS client.
      </p>

      <div className="project-body">
        <p>
          <strong>The problem.</strong> Sequential branch model, manual
          cherry-picking between release and main, manual SNOW change tickets,
          ECS deploys done by hand. Release errors were frequent and slow to
          attribute.
        </p>
        <p>
          <strong>The approach.</strong> Replaced the sequential model with a
          label-driven GitOps topology. Labels on PRs drive the pipeline —
          adding <code>fbe</code> spawns a full-stack ephemeral environment
          (ECS + RDS + S3 + SQS + SNS) provisioned via Terraform; adding{" "}
          <code>staging</code> deploys to ECS staging; merging to main
          auto-opens a ServiceNow Change Request, authenticates to AWS via
          OIDC keyless, deploys, and closes the CR.
        </p>
        <p>
          <strong>The outcome.</strong> ~70% reduction in release errors. PR
          setup time from days to minutes. Scheduled Friday-night cleanup
          auto-destroys all FBEs to save weekend spend.
        </p>
      </div>

      <RunnableFlow ariaLabel="AICPA GitOps deployment flow" label="Run a PR">
        <FlowNode
          icon={<GitBranch size={20} />}
          title="Feature Branch"
          badge="PR to release"
          detail="Developers create feature branches and open PRs to the release branch for review and CI checks."
        />
        <div className="flow-connector">
          <span className="flow-connector-label">label: fbe</span>
        </div>
        <FlowNode
          icon={<Server size={20} />}
          title="FBE Spawn"
          badge="ECS + RDS + S3 + SQS"
          detail="Full-Stack Feature Branch Environment provisioned per PR via Terraform. Friday-night cleanup auto-destroys all FBEs to save weekend costs."
        />
        <div className="flow-connector">
          <span className="flow-connector-label">auto PR</span>
        </div>
        <FlowNode
          icon={<GitPullRequest size={20} />}
          title="Release → Main"
          badge="label: staging"
          detail="Auto-generated PR from release to main. Staging label triggers ECS staging deployment for final validation."
        />
        <div className="flow-connector">
          <span className="flow-connector-label">merge</span>
        </div>
        <FlowNode
          icon={<Rocket size={20} />}
          title="Production Deploy"
          badge="SNOW CR + OIDC + ECS"
          detail="ServiceNow Change Request auto-created, OIDC keyless auth to AWS, ECS prod deployment, E2E validation, CR auto-closed."
        />
      </RunnableFlow>

      <div className="flow-sidecars">
        <div className="sidecar">
          <div className="sidecar-title">ServiceNow ITSM</div>
          <div className="sidecar-desc">CR lifecycle automated end-to-end via REST</div>
        </div>
        <div className="sidecar" style={{ borderLeftColor: "var(--cyan)" }}>
          <div className="sidecar-title">Teams ChatOps</div>
          <div className="sidecar-desc">Deploy + incident notifications</div>
        </div>
        <div className="sidecar" style={{ borderLeftColor: "var(--purple)" }}>
          <div className="sidecar-title">Trivy + Grype</div>
          <div className="sidecar-desc">Shift-left container CVE scanning</div>
        </div>
      </div>

      <ul className="project-decisions">
        <li>
          <strong>Trigger model</strong>
          PR labels — fbe, staging, prod — over branch-per-environment.
          No drift between branches, label removal cleans up.
        </li>
        <li>
          <strong>AWS auth</strong>
          OIDC keyless from GitHub Actions to AWS — no long-lived access
          keys to rotate, no leaked-secret blast radius.
        </li>
        <li>
          <strong>Region strategy</strong>
          Multi-region with Route 53 latency routing + active-active
          failover. Verified failover via game day.
        </li>
        <li>
          <strong>Change management</strong>
          ServiceNow CR opened + closed by the pipeline — no manual ticket
          toil, deploy + CR are atomic.
        </li>
      </ul>

      <div className="project-metrics">
        <span className="metric">
          <strong>~70%</strong> release errors reduced
        </span>
        <span className="metric">
          <strong>days → minutes</strong> PR env setup
        </span>
        <span className="metric">
          <strong>200+</strong> CI/CD pipelines
        </span>
      </div>

      <div className="project-stack">
        <span>GitHub Actions</span>
        <span>AWS ECS</span>
        <span>AWS RDS</span>
        <span>Lerna</span>
        <span>Terraform</span>
        <span>ServiceNow</span>
        <span>OIDC</span>
        <span>Trivy / Grype</span>
        <span>Route 53</span>
      </div>

      <div className="project-actions">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="btn btn-ghost"
          title="Client engagement — under NDA"
        >
          <span>Client work · details on request</span>
        </button>
      </div>
    </article>
  );
}
