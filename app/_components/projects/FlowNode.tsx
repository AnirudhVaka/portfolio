"use client";

import { useState, type ReactNode } from "react";

interface Props {
  /** Pre-rendered icon element (lucide-react component). */
  icon: ReactNode;
  title: string;
  badge: string;
  detail: string;
  /**
   * Render mode: "expand" makes the node click-to-expand (used on AICPA flow),
   * "static" disables interaction (used on the PrepAtlas pipeline diagram).
   */
  mode?: "expand" | "static";
}

/**
 * One node in a horizontal flow diagram. Used by PrepAtlas + AICPA cards.
 * Brief required keeping the "click to expand" behaviour for visualisations
 * — this component encapsulates that.
 */
export function FlowNode({ icon, title, badge, detail, mode = "expand" }: Props) {
  const [expanded, setExpanded] = useState(false);
  const clickable = mode === "expand";

  return (
    <div
      className={`flow-node ${expanded ? "expanded" : ""}`}
      data-clickable={clickable || undefined}
      onClick={clickable ? () => setExpanded((v) => !v) : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-expanded={clickable ? expanded : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded((v) => !v);
              }
            }
          : undefined
      }
    >
      <div className="flow-node-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="flow-node-title">{title}</div>
      <div className="flow-node-badge">{badge}</div>
      <div className="flow-node-detail">
        <p>{detail}</p>
      </div>
    </div>
  );
}
