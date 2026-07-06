"use client";

import { useRef, useState, type ReactNode } from "react";
import { Play } from "lucide-react";

/**
 * Wraps a horizontal flow (FlowNodes + connectors) with a "▶ Run" control
 * that animates a unit of work travelling through it (brief C4). On run, each
 * node and edge lights up in DOM order, then clears. Hover-highlight of edges
 * is handled in CSS. Reduced-motion: activates everything at once, briefly.
 */
export function RunnableFlow({
  children,
  ariaLabel,
  label = "Run",
}: {
  children: ReactNode;
  ariaLabel: string;
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function run() {
    if (running || !containerRef.current) return;
    const els = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".flow-node, .flow-connector")
    );
    if (!els.length) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    els.forEach((el) => el.classList.remove("is-active"));
    setRunning(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      els.forEach((el) => el.classList.add("is-active"));
      timers.current.push(
        setTimeout(() => {
          els.forEach((el) => el.classList.remove("is-active"));
          setRunning(false);
        }, 1200)
      );
      return;
    }

    const STEP = 240;
    els.forEach((el, i) => {
      timers.current.push(setTimeout(() => el.classList.add("is-active"), i * STEP));
      // Trailing fade so the pulse "travels" rather than accumulating.
      timers.current.push(
        setTimeout(() => el.classList.remove("is-active"), i * STEP + STEP * 3)
      );
    });
    timers.current.push(
      setTimeout(() => setRunning(false), els.length * STEP + STEP * 3)
    );
  }

  return (
    <div className="flow-runnable">
      <button type="button" className="flow-run" onClick={run} disabled={running}>
        <Play size={12} aria-hidden="true" />
        {running ? "Running…" : label}
      </button>
      <div className="flow-container" ref={containerRef} role="img" aria-label={ariaLabel}>
        <div className="flow-track">{children}</div>
      </div>
    </div>
  );
}
