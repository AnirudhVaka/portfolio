"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Headline metrics that count up when the strip scrolls into view (brief C5),
 * each with a small sparkline for the observability aesthetic. Values are the
 * same 6 numbers as before — only the presentation animates.
 *
 * Reduced-motion: renders the final values immediately, no counting.
 */

interface Metric {
  to: number;
  dec: number;
  suffix: string;
  label: string;
  sub: string;
  spark: string; // sparkline path (viewBox 0 0 44 12)
}

const METRICS: Metric[] = [
  { to: 99.9, dec: 1, suffix: "%", label: "Uptime", sub: "on-prem K8s, 2 years", spark: "M1 10 L9 8 L17 9 L25 5 L33 6 L43 2" },
  { to: 200, dec: 0, suffix: "+", label: "Pipelines", sub: "GitHub Actions + Azure DevOps", spark: "M1 9 L11 7 L20 8 L29 4 L36 5 L43 2" },
  { to: 60, dec: 0, suffix: "%", label: "Faster releases", sub: "via containerization", spark: "M1 8 L10 9 L19 6 L27 7 L35 4 L43 3" },
  { to: 25, dec: 0, suffix: "%", label: "Cloud cost cut", sub: "FinOps + right-sizing", spark: "M1 3 L10 5 L18 4 L27 7 L35 6 L43 9" },
  { to: 2, dec: 0, suffix: "", label: "Paid SaaS products", sub: "PrepAtlas, HumanifyCV", spark: "M1 10 L14 10 L14 4 L28 4 L28 2 L43 2" },
  { to: 3, dec: 0, suffix: "+ yrs", label: "Production DevOps", sub: "since Jan 2023", spark: "M1 9 L11 8 L21 6 L30 6 L37 4 L43 3" },
];

function format(v: number, dec: number, suffix: string) {
  return `${v.toFixed(dec)}${suffix}`;
}

function CountUp({ to, dec, suffix, run }: { to: number; dec: number; suffix: string; run: boolean }) {
  const [val, setVal] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!run || doneRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(to);
      doneRef.current = true;
      return;
    }
    doneRef.current = true;
    const DURATION = 1300;
    let raf = 0;
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return <>{format(val, dec, suffix)}</>;
}

export function MetricsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="metrics-section" ref={ref} data-reveal aria-label="Headline metrics">
      <div className="metrics-bar container">
        {METRICS.map((m) => (
          <div className="metric-cell" key={m.label}>
            <div className="metric-label mono">{m.label}</div>
            <div className="metric-val mono">
              <CountUp to={m.to} dec={m.dec} suffix={m.suffix} run={run} />
            </div>
            <svg className="metric-spark" viewBox="0 0 44 12" aria-hidden="true">
              <path d={m.spark} />
            </svg>
            <div className="metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
