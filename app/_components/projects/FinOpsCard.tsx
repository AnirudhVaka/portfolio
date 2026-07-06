/**
 * FinOps / cost-engineering story (brief A3). Compact card surfacing the
 * weekend scale-to-zero automation, Reserved Instances / Savings Plans,
 * rightsizing, biweekly reviews, and the AICPA & CIMA (London) savings.
 * Server component — the count-up animation lives on the metrics strip.
 */

const WEEK = [
  { d: "Mon", on: true },
  { d: "Tue", on: true },
  { d: "Wed", on: true },
  { d: "Thu", on: true },
  { d: "Fri", on: true },
  { d: "Sat", on: false },
  { d: "Sun", on: false },
];

export function FinOpsCard() {
  return (
    <article className="project-card finops-card" id="finops" data-reveal>
      <div className="project-head">
        <span className="project-tag green mono">FinOps · Cost Engineering</span>
        <h2 className="project-title">Cloud Cost Engineering</h2>
      </div>
      <p className="project-tagline">
        Treating the cloud bill as an SLO. Non-prod that pays rent only when
        someone&apos;s using it, plus the boring commitment work that compounds.
      </p>

      <div className="project-body">
        <p>
          <strong>The headline lever.</strong> All non-prod AWS scales to zero
          every Friday at midnight and auto-restores Monday at 6&nbsp;AM — roughly{" "}
          <strong>54 idle hours a week</strong> that used to bill for nothing.
          It&apos;s scheduled automation, so it never depends on someone
          remembering to shut things down before the weekend.
        </p>
      </div>

      <figure className="finops-week" aria-label="Non-prod runs Monday to Friday; scaled to zero across the weekend">
        <div className="finops-week-row">
          {WEEK.map((day) => (
            <div key={day.d} className={`finops-day ${day.on ? "on" : "off"}`}>
              <span className="finops-day-bar" aria-hidden="true" />
              <span className="finops-day-label mono">{day.d}</span>
              <span className="finops-day-state mono">{day.on ? "running" : "0 replicas"}</span>
            </div>
          ))}
        </div>
        <figcaption className="mono">
          Fri 00:00 → Mon 06:00 · scale-to-zero window
        </figcaption>
      </figure>

      <ul className="project-decisions">
        <li>
          <strong>Commitment coverage</strong>
          Reserved Instances + Savings Plans on the steady-state baseline so
          predictable load isn&apos;t paying on-demand rates.
        </li>
        <li>
          <strong>Rightsizing</strong>
          Instances matched to real utilization, not the size someone picked
          once and never revisited.
        </li>
        <li>
          <strong>Biweekly reviews</strong>
          A recurring AWS cost-optimization review — cost is a metric with an
          owner and a cadence, not a quarterly surprise.
        </li>
        <li>
          <strong>Ephemeral cleanup</strong>
          Friday-night teardown of PR environments so &quot;ephemeral&quot;
          actually means ephemeral.
        </li>
      </ul>

      <div className="project-metrics">
        <span className="metric">
          <strong>~54 hrs/wk</strong> idle spend eliminated
        </span>
        <span className="metric">
          <strong>~25%</strong> monthly cloud cost cut
        </span>
        <span className="metric">
          <strong>AICPA &amp; CIMA</strong> AWS savings delivered
        </span>
      </div>

      <div className="project-stack">
        <span>AWS</span>
        <span>Reserved Instances</span>
        <span>Savings Plans</span>
        <span>Scale-to-zero automation</span>
        <span>Rightsizing</span>
      </div>
    </article>
  );
}
