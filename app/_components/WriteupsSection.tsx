import Link from "next/link";

/**
 * Engineering writeups — deeper reading for technical interviewers.
 *
 * The flagship post ("Architecture evolution") is published internally at
 * /writeups/architecture-evolution (brief A1). No dead "coming soon" cards —
 * every card is either live (internal or external) or an honestly-labelled
 * roadmap item.
 */

interface WriteupItem {
  status: "live" | "planned";
  title: string;
  desc: string;
  host: string;
  href?: string;
  /** internal = client-routed Next link; external = new tab. */
  kind?: "internal" | "external";
}

const WRITEUPS: WriteupItem[] = [
  {
    status: "live",
    title: "Architecture evolution — three lessons from migrating live systems",
    desc: "IIS→Kubernetes, TeamCity→Azure DevOps, and sequential-branch to label-driven GitOps. What broke, what didn't, and what I'd undo — migrating under live traffic.",
    host: "anirudhvaka.dev/writeups",
    href: "/writeups/architecture-evolution",
    kind: "internal",
  },
  {
    status: "planned",
    title: "Building a production on-prem K8s data center from bare metal",
    desc: "Racking Dell PowerEdge at CtrlS Hyderabad, VLAN segmentation, FortiGate failover, choosing Hyper-V under Kubernetes, and what 99.9% uptime for two years actually cost.",
    host: "anirudhvaka.dev",
  },
];

const STATUS_COPY: Record<WriteupItem["status"], string> = {
  live: "● Live",
  planned: "○ Planned",
};

export function WriteupsSection() {
  return (
    <section className="writeups-section" id="writeups">
      <div className="container">
        <h2 className="section-title" data-reveal>
          Engineering <span className="gradient">Writeups</span>
        </h2>
        <p className="section-sub" data-reveal>
          Longer-form posts on the technical decisions behind my products and
          infrastructure work. Useful pre-reading for an interview.
        </p>
        <div className="writeups-grid" data-reveal>
          {WRITEUPS.map((w) => {
            const inner = (
              <>
                <span className={`writeup-status ${w.status}`}>{STATUS_COPY[w.status]}</span>
                <h3 className="writeup-title">{w.title}</h3>
                <p className="writeup-desc">{w.desc}</p>
                <p className="writeup-host">{w.host}</p>
              </>
            );

            if (w.kind === "internal" && w.href) {
              return (
                <Link key={w.title} href={w.href} className="writeup-card is-featured tilt">
                  {inner}
                </Link>
              );
            }
            if (w.kind === "external" && w.href) {
              return (
                <a
                  key={w.title}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="writeup-card tilt"
                >
                  {inner}
                </a>
              );
            }
            return (
              <div key={w.title} className="writeup-card draft" aria-disabled="true">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
