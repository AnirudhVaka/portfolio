/**
 * Hardcoded metrics strip. NO counter animation, NO JS — these are the
 * 6 headline numbers from the brief, identical across all regions.
 *
 * Brief: "Hardcoded static text — do NOT use JS counter animation"
 */
const METRICS = [
  { value: "99.9%", label: "Uptime", sub: "on-prem K8s, 2 years" },
  { value: "200+", label: "Pipelines", sub: "GitHub Actions + Azure DevOps" },
  { value: "60%", label: "Faster releases", sub: "via containerization" },
  { value: "25%", label: "Cloud cost cut", sub: "AWS + Azure right-sizing" },
  { value: "2", label: "Paid SaaS products", sub: "PrepAtlas, HumanifyCV" },
  { value: "3+ yrs", label: "Production DevOps", sub: "since Jan 2023" },
] as const;

export function MetricsStrip() {
  return (
    <section className="metrics-section" data-reveal aria-label="Headline metrics">
      <div className="metrics-bar container">
        {METRICS.map((m) => (
          <div className="metric-cell" key={m.label}>
            <div className="metric-label mono">{m.label}</div>
            <div className="metric-val mono">{m.value}</div>
            <div className="metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
