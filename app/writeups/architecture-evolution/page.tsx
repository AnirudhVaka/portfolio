import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * "Architecture evolution — three lessons from migrating live systems."
 *
 * The flagship internal writeup promised by the Writeups section (brief A1).
 * Server-rendered for SEO; all facts drawn from real migrations
 * (IIS→Kubernetes, TeamCity→Azure DevOps, sequential-branch→label-driven
 * GitOps). First-person, honest — "what broke, what didn't, what I'd undo".
 */

export const metadata: Metadata = {
  title: "Architecture evolution — three lessons from migrating live systems",
  description:
    "What broke, what didn't, and what I'd undo — migrating live systems from IIS to Kubernetes, TeamCity to Azure DevOps, and a sequential-branch model to label-driven GitOps.",
  openGraph: {
    title: "Architecture evolution — three lessons from migrating live systems",
    description:
      "IIS→Kubernetes, TeamCity→Azure DevOps, and sequential-branch→label-driven GitOps. What broke, what didn't, what I'd undo.",
    type: "article",
  },
};

export default function ArchitectureEvolutionWriteup() {
  return (
    <main className="article-shell">
      <article className="article">
        <Link href="/#writeups" className="article-back mono">
          <ArrowLeft size={14} aria-hidden="true" /> Back to writeups
        </Link>

        <header className="article-header">
          <div className="article-meta mono">
            <span className="article-status">● Published</span>
            <span>~9 min read</span>
            <span>anirudhvaka.dev</span>
          </div>
          <h1>Architecture evolution — three lessons from migrating live systems</h1>
          <p className="article-lede">
            Over three years I&apos;ve moved production systems off three
            architectures that had all stopped paying rent: IIS, TeamCity, and a
            sequential branch model. None of the migrations were greenfield — they
            all happened under live customer traffic. Here&apos;s what actually
            broke, what turned out to be a non-event, and the calls I&apos;d make
            differently.
          </p>
        </header>

        <section className="article-body">
          <h2>1. IIS → Docker + Kubernetes</h2>
          <p>
            The starting point was a Windows monolith on IIS, deployed by hand,
            with no observability and a release cadence gated by how long a manual
            deploy took. Customer growth was capped less by the product and more
            by how nervous everyone was to ship. We moved it to Docker +
            Kubernetes on an on-prem cluster (~15 nodes, 100+ containers on
            Hyper-V) and cut release cycle time by roughly 60% with zero-downtime
            deployments.
          </p>
          <h3>What broke</h3>
          <p>
            The application was never written to be stateless. The first real
            outage in staging came from in-process session state that quietly
            assumed a single host — the moment there were two replicas behind an
            ingress, users bounced between pods and lost their sessions. The fix
            wasn&apos;t glamorous: externalize session and cache state (Redis),
            make the container genuinely restart-safe, and treat &quot;can this
            pod be killed at any instant?&quot; as an acceptance criterion rather
            than an afterthought. Windows-container base image sizes were the
            second tax — pull times were long enough to matter to rollout speed
            until we got the layering and multi-arch builds right.
          </p>
          <h3>What didn&apos;t break</h3>
          <p>
            The business logic. The instinct going into a migration like this is
            to &quot;fix everything while we&apos;re in here.&quot; We didn&apos;t
            rewrite the app — we containerized it as-is and changed the
            environment around it. That restraint is the reason it shipped. The
            rewrite temptation is where these projects go to die.
          </p>
          <h3>What I&apos;d undo</h3>
          <p>
            I&apos;d wire up observability <em>before</em> the cutover, not after.
            We deployed Prometheus, Grafana, and Loki as part of the migration,
            but for the first couple of weeks we were flying with less visibility
            than we should have had during the single riskiest window. Metrics and
            logs are cheapest to install when nothing is on fire.
          </p>

          <h2>2. TeamCity + Octopus Deploy → Azure DevOps</h2>
          <p>
            The legacy CI/CD stack was TeamCity for builds and Octopus for
            deploys, spread across multiple product lines. We consolidated onto
            Azure DevOps — 200+ pipelines by the end. The goal wasn&apos;t
            novelty; it was one place to reason about builds, releases, and
            approvals instead of three.
          </p>
          <h3>What broke</h3>
          <p>
            Hidden coupling. A surprising amount of &quot;how we ship&quot; lived
            in TeamCity build-step configuration and Octopus variables that
            nobody had written down. Re-expressing those as pipeline YAML forced
            every implicit assumption into the open — which is the point, but it
            meant the first few migrated pipelines were slower to land than
            estimated because we were reverse-engineering intent, not just
            translating syntax.
          </p>
          <h3>What didn&apos;t break</h3>
          <p>
            Developers&apos; day-to-day. Because we migrated pipeline-by-pipeline
            rather than flipping everything at once, most engineers only noticed
            when <em>their</em> product line moved. A big-bang cutover would have
            turned a manageable migration into a company-wide incident.
          </p>
          <h3>What I&apos;d undo</h3>
          <p>
            I&apos;d templatize sooner. We initially ported pipelines one at a
            time, which meant the same fixes got applied 200 times. Investing in
            shared pipeline templates earlier would have paid for itself long
            before pipeline number fifty.
          </p>

          <h2>3. Sequential branches → label-driven GitOps</h2>
          <p>
            This is the migration I&apos;m proudest of. The old model was a
            sequential branch topology with manual cherry-picking between{" "}
            <code>release</code> and <code>main</code>, hand-written ServiceNow
            change tickets, and ECS deploys done by hand. Release errors were
            frequent and slow to attribute. We replaced it with a label-driven
            GitOps flow: labels on a PR drive the pipeline. Add <code>fbe</code>{" "}
            and a full-stack ephemeral environment (ECS + RDS + S3 + SQS + SNS)
            gets provisioned via Terraform; add <code>staging</code> and it
            deploys to staging; merge to main and the pipeline auto-opens a
            ServiceNow change request, authenticates to AWS with OIDC (no
            long-lived keys), deploys, and closes the CR. Result: roughly 70%
            fewer release errors and PR environment setup down from days to
            minutes.
          </p>
          <h3>What broke</h3>
          <p>
            Cost, at first. Ephemeral environments are wonderful right up until
            you have a dozen of them idling over a weekend. The failure mode
            wasn&apos;t technical — it was the AWS bill. The answer was scheduled
            teardown: a Friday-night job that destroys every FBE, plus
            scale-to-zero on non-prod. Ephemeral has to actually be ephemeral or
            it&apos;s just more always-on infrastructure with extra steps.
          </p>
          <h3>What didn&apos;t break</h3>
          <p>
            Change management. I expected the ServiceNow integration to be the
            fragile part — automating a compliance process usually is. But
            modeling the CR lifecycle as something the pipeline opens and closes
            in lockstep with the deploy turned out to be more reliable than humans
            filing tickets, because the pipeline never forgets and never
            back-dates.
          </p>
          <h3>What I&apos;d undo</h3>
          <p>
            Nothing structural — but I&apos;d document the label contract on day
            one. The labels (<code>fbe</code>, <code>staging</code>,{" "}
            <code>prod</code>) <em>are</em> the interface to the whole deployment
            system, and for a while that contract lived in my head and a pinned
            message. A system this powerful deserves a README, not tribal
            knowledge.
          </p>

          <h2>The through-line</h2>
          <p>
            Three different migrations, one repeated lesson: change the
            environment, not the thing running in it, and change it in slices you
            can roll back. The wins came from restraint — containerize as-is,
            migrate pipeline-by-pipeline, let labels drive the flow — and the
            scars all came from the parts I tried to leave for &quot;later&quot;:
            observability, templates, documentation. Later is more expensive than
            it looks when the system is already live.
          </p>
        </section>

        <footer className="article-footer">
          <p className="mono">
            Want the deeper version of any of these? I&apos;m happy to walk through
            them —{" "}
            <a href="mailto:anirudhvaka@gmail.com">anirudhvaka@gmail.com</a>.
          </p>
          <Link href="/#writeups" className="article-back mono">
            <ArrowLeft size={14} aria-hidden="true" /> Back to writeups
          </Link>
        </footer>
      </article>
    </main>
  );
}
