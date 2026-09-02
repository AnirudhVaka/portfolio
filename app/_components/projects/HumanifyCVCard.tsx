import { resume } from "@/data/resume";

/**
 * HumanifyCV — second in the projects list. Layered architecture diagram
 * (matching TimeChamp's visual vocabulary) highlights production-grade
 * auth + payments + observability rather than just the AI bits.
 */
export function HumanifyCVCard() {
  const project = resume.sideProjects.find((p) => p.id === "humanifycv")!;

  return (
    <article className="project-card" id="humanifycv" data-reveal>
      <div className="project-head">
        <span className="project-tag purple mono">Product · Live</span>
        <h2 className="project-title">{project.name}</h2>
      </div>
      <p className="project-tagline">{project.tagline}</p>

      <div className="project-body">
        <p>
          <strong>The problem.</strong> Resume builders solve templates, which
          was never the hard part. The hard part is keeping one true record of
          what someone actually did and re-cutting it per job description
          without the model quietly inventing an employer, a date, or a metric.
        </p>
        <p>
          <strong>The approach.</strong> A structured Career Vault is the source
          of truth — experience, projects, metrics, education, all typed. The
          model writes, humanises, and tailors <em>from</em> that vault instead
          of from its own recall, and a proof-check pass exists to catch claims
          that aren&apos;t backed by it. On top: JD matching, ATS analysis
          against Workday / Greenhouse / Lever / Taleo / iCIMS parsing
          heuristics, cover letters, an interview kit, and PDF export. A
          separate multi-tenant console lets colleges run cohorts, programs,
          certificates, and missions over the same platform.
        </p>
        <p>
          <strong>The engineering.</strong> Auth treated as a feature, not an
          afterthought: NextAuth v5 with email verification, TOTP 2FA backed by
          AES-256-GCM-encrypted secrets, WebAuthn passkeys, Google OAuth.
          Razorpay events modelled as a discriminated union so captures,
          refunds, and disputes can&apos;t silently miscompile. A multi-model
          Claude router runs the generation.
        </p>
        <p>
          <strong>The outcome.</strong> 30–40 paying users on AWS EC2, shipped
          by GitHub Actions to a Docker Compose stack behind Cloudflare. Sentry
          for runtime, Amazon SES SMTP for transactional email, Jest / Testing
          Library tests on the auth + payment paths specifically.
        </p>
      </div>

      <div className="infra-layers">
        <div className="infra-layer l-auth">
          <div className="layer-header">
            <span className="layer-label">Auth Layer</span>
            <span className="layer-location">production-grade</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">NextAuth v5</span>
            <span className="layer-pill">Email verification</span>
            <span className="layer-pill">TOTP 2FA</span>
            <span className="layer-pill">AES-256-GCM secrets</span>
            <span className="layer-pill">WebAuthn passkeys</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" />
          </div>
        </div>
        <div className="infra-layer l-app">
          <div className="layer-header">
            <span className="layer-label">App Layer</span>
            <span className="layer-location">AWS EC2</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Next.js 16</span>
            <span className="layer-pill">React 19</span>
            <span className="layer-pill">TypeScript strict</span>
            <span className="layer-pill">Prisma 7</span>
            <span className="layer-pill">Postgres</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
        <div className="infra-layer l-int">
          <div className="layer-header">
            <span className="layer-label">Integration Layer</span>
            <span className="layer-location">typed boundaries</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Claude Sonnet 4.6</span>
            <span className="layer-pill">Razorpay (discriminated union)</span>
            <span className="layer-pill">Nodemailer → SES SMTP</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" style={{ animationDelay: "1.2s" }} />
          </div>
        </div>
        <div className="infra-layer l-ops">
          <div className="layer-header">
            <span className="layer-label">Observability & Quality</span>
            <span className="layer-location">never-silent failures</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Sentry</span>
            <span className="layer-pill">Jest + Testing Library</span>
            <span className="layer-pill">25 test files</span>
          </div>
        </div>
      </div>

      <ul className="project-decisions">
        <li>
          <strong>Payment model</strong>
          Razorpay events as a TypeScript discriminated union — captured /
          refunded / disputed can't be confused at the type level.
        </li>
        <li>
          <strong>2FA storage</strong>
          TOTP secrets AES-256-GCM-encrypted at rest with a key from secret
          manager. Plaintext never touches Postgres.
        </li>
        <li>
          <strong>Passkeys</strong>
          WebAuthn FIDO2 over passwords — phishing-resistant, no shared
          secret, signs in with the device biometric.
        </li>
        <li>
          <strong>Test priorities</strong>
          Tests concentrated on the auth + payment paths — the most damaging
          failure modes are the regressions caught here first.
        </li>
      </ul>

      <div className="project-metrics">
        <span className="metric">
          <strong>30–40</strong> paying users
        </span>
        <span className="metric">
          <strong>5</strong> ATS engines modelled
        </span>
        <span className="metric">
          <strong>0</strong> plaintext secrets at rest
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
          <span>Visit humanifycv.com →</span>
        </a>
      </div>
    </article>
  );
}
