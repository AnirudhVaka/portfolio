"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Play, Hammer, ShieldCheck, KeyRound, Box, FlaskConical } from "lucide-react";

/**
 * production-release.yml — a CI pipeline that "runs" as you scroll (brief C3).
 * Build → SAST → IAM → Deploy → E2E light up in sequence tied to scroll
 * position, logs stream in, and the header status flips to green on completion.
 *
 * Reduced-motion: everything renders complete + passing, no scroll wiring.
 */

interface StageDef {
  icon: ReactNode;
  label: string;
  detail: string;
  log: string;
}

const STAGES: StageDef[] = [
  { icon: <Hammer size={18} />, label: "Build", detail: "42s · multi-arch", log: "build · multi-arch image pushed (42s)" },
  { icon: <ShieldCheck size={18} />, label: "SAST", detail: "1m 08s · Trivy + Grype", log: "sast · Trivy + Grype — 0 criticals (1m 08s)" },
  { icon: <KeyRound size={18} />, label: "IAM", detail: "12s · OIDC keyless", log: "iam · OIDC assume-role ok — no static keys (12s)" },
  { icon: <Box size={18} />, label: "Deploy", detail: "1m 34s · ECS rolling", log: "deploy · ECS rolling update, healthy (1m 34s)" },
  { icon: <FlaskConical size={18} />, label: "E2E", detail: "smoke suite", log: "e2e · smoke suite green — release gated" },
];

export function PipelineWidget() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedRef = useRef(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) setActive(STAGES.length);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reducedRef.current) return;
    setActive(Math.max(0, Math.min(STAGES.length, Math.round(v * (STAGES.length + 0.4)))));
  });

  const complete = active >= STAGES.length;

  return (
    <section className="pipeline-section" ref={sectionRef} data-reveal aria-hidden="true">
      <div className="pipeline-box container">
        <div className="pipeline-header mono">
          <span>
            <Play size={10} style={{ color: "var(--green)", marginRight: 6, verticalAlign: "middle" }} aria-hidden="true" />
            production-release.yml
          </span>
          <span className="status" style={{ color: complete ? "var(--green)" : "var(--amber)" }}>
            <span
              className="dot"
              style={{ background: complete ? "var(--green)" : "var(--amber)", boxShadow: `0 0 6px ${complete ? "var(--green)" : "var(--amber)"}` }}
            />
            {complete ? "Passing" : "Running"}
          </span>
          <span>4m 12s</span>
        </div>

        <div className="pipeline-track">
          <div className="pipeline-rail" />
          <motion.div className="pipeline-rail-fill" style={{ scaleX: fillScale }} />
          {STAGES.map((s, i) => {
            const status = i < active ? "pass" : i === active && !complete ? "running" : "";
            return (
              <div className="pipeline-stage" key={s.label}>
                <div className={`stage-ring ${status}`}>{s.icon}</div>
                <span className="stage-name mono">{s.label}</span>
                <span className="stage-detail mono">{s.detail}</span>
              </div>
            );
          })}
        </div>

        <div className="pipeline-logs mono" aria-hidden="true">
          {STAGES.map((s, i) => (
            <div className={`pipeline-log-line ${i < active ? "show" : ""}`} key={s.label}>
              <span className="ok">▸</span> {s.log}
            </div>
          ))}
          <div className={`pipeline-log-line ${complete ? "show" : ""}`}>
            <span className="ok">✔</span> <span className="ok">release complete — 0 failures</span>
          </div>
        </div>
      </div>
    </section>
  );
}
