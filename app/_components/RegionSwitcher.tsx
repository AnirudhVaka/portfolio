"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  REGION_FLAG,
  REGION_LABEL,
  REGIONS,
  type Region,
} from "@/lib/geo";

interface Props {
  /** Currently-rendered region (computed by the Server Component). */
  current: Region;
  /** Where the current value came from — drives the "Showing X view" copy. */
  source: "override" | "detected" | "header" | "fallback";
  /** Optional className passed through so callers can position it. */
  className?: string;
}

/**
 * Region switcher — small dropdown anchored top-right of the page.
 *
 * Behaviour:
 *   - Shows the flag + label of whatever the Server Component decided to render.
 *   - On select, POSTs to /api/set-region. Server sets the override cookie.
 *   - Calls router.refresh() so the Server Component re-renders with the
 *     new region. No full page reload, no FOUC.
 *   - "Auto-detect" option clears the override and falls back to detection.
 */
export function RegionSwitcher({ current, source, className }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!detailsRef.current) return;
      if (!detailsRef.current.contains(e.target as Node)) {
        detailsRef.current.open = false;
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && detailsRef.current) {
        detailsRef.current.open = false;
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function pick(next: Region | "auto") {
    startTransition(async () => {
      try {
        const res = await fetch("/api/set-region", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ region: next }),
        });
        if (!res.ok) {
          // Silent fail: keep the user's current view, log for triage.
          console.warn("region switch failed", await res.text());
          return;
        }
        if (detailsRef.current) detailsRef.current.open = false;
        setOpen(false);
        router.refresh();
      } catch (err) {
        console.warn("region switch error", err);
      }
    });
  }

  const sourceCopy: Record<Props["source"], string> = {
    override: "Showing your chosen view",
    detected: "Detected from your location",
    header: "Detected from your location",
    fallback: "Default view (no location signal)",
  };

  return (
    <details
      ref={detailsRef}
      className={`region-switcher ${className ?? ""}`}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary aria-label={`Region: ${REGION_LABEL[current]}. Click to switch.`}>
        <span className="rs-flag" aria-hidden="true">
          {REGION_FLAG[current]}
        </span>
        <span className="rs-label">{REGION_LABEL[current]}</span>
        <span className="rs-caret" aria-hidden="true">
          {open ? "▴" : "▾"}
        </span>
      </summary>

      <div className="rs-menu" role="menu">
        <div className="rs-menu-source mono">{sourceCopy[source]}</div>

        {REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            role="menuitemradio"
            aria-checked={r === current}
            className={`rs-menu-item ${r === current ? "is-current" : ""}`}
            onClick={() => pick(r)}
            disabled={pending}
          >
            <span aria-hidden="true">{REGION_FLAG[r]}</span>
            <span>{REGION_LABEL[r]}</span>
            {r === current && (
              <span className="rs-check" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        ))}

        {source === "override" && (
          <button
            type="button"
            className="rs-menu-item rs-menu-reset"
            onClick={() => pick("auto")}
            disabled={pending}
          >
            ↺ Reset to auto-detect
          </button>
        )}
      </div>

      <style jsx>{`
        details.region-switcher {
          position: relative;
          font-size: 12px;
        }
        details.region-switcher > summary {
          list-style: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border2);
          border-radius: 8px;
          color: var(--text);
          user-select: none;
          backdrop-filter: blur(10px);
          transition: border-color 0.2s, color 0.2s;
        }
        details.region-switcher > summary::-webkit-details-marker {
          display: none;
        }
        details.region-switcher > summary:hover,
        details.region-switcher[open] > summary {
          border-color: var(--cyan);
          color: var(--cyan);
        }
        .rs-flag {
          font-size: 14px;
          line-height: 1;
        }
        .rs-label {
          font-weight: 500;
        }
        .rs-caret {
          font-size: 10px;
          color: var(--text3);
          margin-left: 2px;
        }
        .rs-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 240px;
          background: rgba(15, 15, 35, 0.92);
          backdrop-filter: var(--glass);
          border: 1px solid var(--border2);
          border-radius: 10px;
          padding: 6px;
          z-index: 200;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
        }
        .rs-menu-source {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text3);
          padding: 6px 10px 8px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 4px;
        }
        button.rs-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 10px;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: var(--text2);
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        button.rs-menu-item:hover:not(:disabled) {
          background: rgba(0, 229, 255, 0.08);
          color: var(--text);
        }
        button.rs-menu-item.is-current {
          color: var(--cyan);
        }
        .rs-check {
          margin-left: auto;
          color: var(--cyan);
        }
        button.rs-menu-reset {
          border-top: 1px solid var(--border);
          margin-top: 4px;
          color: var(--text3);
          font-size: 11px;
        }
        @media (max-width: 480px) {
          .rs-menu {
            right: auto;
            left: 0;
            min-width: 220px;
          }
        }
      `}</style>
    </details>
  );
}
