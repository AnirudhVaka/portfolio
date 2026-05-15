/**
 * Engineering writeups — small section linking to deeper reading for
 * technical interviewers. Two live + two planned.
 */

interface WriteupItem {
  status: "live" | "coming" | "planned";
  title: string;
  desc: string;
  host: string;
  href?: string; // omitted for non-clickable items
}

const WRITEUPS: WriteupItem[] = [
  {
    status: "live",
    title: "PrepAtlas engineering deep-dive",
    desc: "Grounded RAG with citations, pgvector over Pinecone, TWA over React Native, sub-200KB performance budget, and a $35/mo hosting story.",
    host: "prepatlas.in/engineering",
    href: "https://prepatlas.in/engineering",
  },
  {
    status: "coming",
    title: "HumanifyCV engineering deep-dive",
    desc: "Production-grade auth (passkeys, 2FA, AES-256-GCM), Razorpay events as a discriminated union, the AWS ECS layout, and which 31 tests I wrote first.",
    host: "humanifycv.com/engineering",
  },
  {
    status: "planned",
    title: "How I built a production on-prem K8s data center from bare metal",
    desc: "Racking Dell PowerEdge at CtrlS Hyderabad, VLAN segmentation, FortiGate failover, choosing Hyper-V under Kubernetes, and what 99.9% uptime for two years actually cost.",
    host: "anirudhvaka.dev",
  },
  {
    status: "planned",
    title: "Architecture evolution — three lessons from migrating live systems",
    desc: "Lessons from IIS-to-Kubernetes, TeamCity-to-Azure-DevOps, and sequential-branch to label-driven GitOps. What broke, what didn't, what I'd undo.",
    host: "anirudhvaka.dev",
  },
];

const STATUS_COPY: Record<WriteupItem["status"], string> = {
  live: "● Live",
  coming: "◐ Coming soon",
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
          {WRITEUPS.map((w) =>
            w.href ? (
              <a
                key={w.title}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="writeup-card"
              >
                <span className={`writeup-status ${w.status}`}>{STATUS_COPY[w.status]}</span>
                <h3 className="writeup-title">{w.title}</h3>
                <p className="writeup-desc">{w.desc}</p>
                <p className="writeup-host">{w.host}</p>
              </a>
            ) : (
              <div
                key={w.title}
                className={`writeup-card ${w.status === "planned" ? "draft" : ""}`}
                aria-disabled="true"
              >
                <span className={`writeup-status ${w.status}`}>{STATUS_COPY[w.status]}</span>
                <h3 className="writeup-title">{w.title}</h3>
                <p className="writeup-desc">{w.desc}</p>
                <p className="writeup-host">{w.host}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
