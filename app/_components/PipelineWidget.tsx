"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative pipeline widget below the hero. Animates packets along the
 * rail to evoke a passing CI/CD pipeline. Honors prefers-reduced-motion.
 *
 * The static content (5 stages) reflects an actual deploy pipeline shape
 * I run: build → SAST → IAM (OIDC) → ECS deploy → E2E.
 */
export function PipelineWidget() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const rail = railRef.current;
    if (!rail) return;
    const packets = rail.querySelectorAll<HTMLDivElement>(".pipeline-packet");
    let cancelled = false;
    const animations: Animation[] = [];

    function startWhenVisible(railEl: HTMLDivElement) {
      const obs = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting || cancelled) return;
          obs.disconnect();
          packets.forEach((p, i) => {
            p.style.opacity = "1";
            const delay = i * 1400;
            const loop = () => {
              if (cancelled) return;
              const anim = p.animate(
                [
                  { left: "0%", opacity: 0 },
                  { left: "5%", opacity: 1 },
                  { left: "85%", opacity: 1 },
                  { left: "100%", opacity: 0 },
                ],
                { duration: 4000, delay, easing: "ease-in-out" }
              );
              animations.push(anim);
              anim.onfinish = loop;
            };
            loop();
          });
        },
        { threshold: 0.3 }
      );
      if (railEl.parentElement) obs.observe(railEl.parentElement);
    }

    startWhenVisible(rail);
    return () => {
      cancelled = true;
      animations.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <section className="pipeline-section" data-reveal aria-hidden="true">
      <div className="pipeline-box container">
        <div className="pipeline-header mono">
          <span>
            <i
              className="fa-solid fa-play"
              style={{ color: "var(--green)", fontSize: 10, marginRight: 6 }}
              aria-hidden="true"
            />
            production-release.yml
          </span>
          <span className="status">
            <span className="dot" /> Passing
          </span>
          <span>4m 12s</span>
        </div>
        <div className="pipeline-track">
          <div className="pipeline-rail" ref={railRef}>
            <div className="pipeline-packet" />
            <div className="pipeline-packet" />
            <div className="pipeline-packet" />
          </div>
          <Stage status="pass" icon="fa-solid fa-hammer" label="Build" detail="42s · multi-arch" />
          <Stage status="pass" icon="fa-solid fa-shield" label="SAST" detail="1m 08s · Trivy + Grype" />
          <Stage status="pass" icon="fa-solid fa-key" label="IAM" detail="12s · OIDC keyless" />
          <Stage status="pass" icon="fa-solid fa-cube" label="Deploy" detail="1m 34s · ECS rolling" />
          <Stage status="running" icon="fa-solid fa-vial" label="E2E" detail="running…" />
        </div>
      </div>
    </section>
  );
}

interface StageProps {
  status: "pass" | "running";
  icon: string;
  label: string;
  detail: string;
}

function Stage({ status, icon, label, detail }: StageProps) {
  return (
    <div className="pipeline-stage">
      <div className={`stage-ring ${status}`}>
        <i className={icon} aria-hidden="true" />
      </div>
      <span className="stage-name mono">{label}</span>
      <span className="stage-detail mono">{detail}</span>
    </div>
  );
}
