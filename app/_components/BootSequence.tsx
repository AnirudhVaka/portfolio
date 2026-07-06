"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Boot sequence intro (brief C1). A fast kubectl-style "system coming online"
 * that resolves into the hero. Shown ONCE per visitor (localStorage-gated),
 * never under prefers-reduced-motion, skippable (button / click / Esc), and
 * always under ~1.2s.
 *
 * Rendered only after hydration (SSR renders nothing) so it never blocks the
 * hero's paint — the hero is the LCP element and stays first to render.
 */

const LINES: { text: string; cls?: string; symbol?: string }[] = [
  { text: "kubectl apply -f anirudh-vaka.dev", symbol: "$" },
  { text: "namespace/portfolio created", cls: "ok" },
  { text: "pod/hero            ● Running", cls: "ok" },
  { text: "pod/projects        ● Running", cls: "ok" },
  { text: "pod/ai-platform     ● Running", cls: "ok" },
  { text: "kubectl rollout status deploy/portfolio", symbol: "$" },
  { text: 'deployment "portfolio" successfully rolled out', cls: "ok" },
  { text: "system status ......... READY", cls: "ok" },
];

const STEP_MS = 110;
const HOLD_MS = 220;
const STORAGE_KEY = "av-booted";

export function BootSequence() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let booted = false;
    try {
      booted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      booted = false;
    }
    if (reduced || booted) return; // never show

    setShow(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — show once, don't persist */
    }

    LINES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setVisible(i + 1), i * STEP_MS));
    });
    const total = LINES.length * STEP_MS + HOLD_MS;
    timers.current.push(setTimeout(() => setDone(true), total));
    // Hard unmount after the fade, and a safety cap.
    timers.current.push(setTimeout(() => setShow(false), total + 400));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    function finish() {
      setDone(true);
      setTimeout(() => setShow(false), 400);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") finish();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;

  function skip() {
    setDone(true);
    setTimeout(() => setShow(false), 400);
  }

  return (
    <div
      className={`boot ${done ? "done" : ""}`}
      role="status"
      aria-label="System booting"
      onClick={skip}
    >
      <div className="boot-inner">
        {LINES.slice(0, visible).map((line, i) => (
          <div className="boot-line" key={i}>
            {line.symbol && <span className="sym">{line.symbol}</span>}
            <span className={line.cls}>{line.text}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="boot-skip"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
      >
        skip ↵
      </button>
    </div>
  );
}
