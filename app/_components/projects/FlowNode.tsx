"use client";

import { useState } from "react";

interface Props {
  /** Font Awesome class string (e.g. "fa-solid fa-database"). */
  icon: string;
  title: string;
  badge: string;
  detail: string;
  /**
   * Render mode: "expand" makes the node click-to-expand (used on AICPA flow),
   * "static" disables interaction (used on PrepAtlas RAG diagram).
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
        <i className={icon} />
      </div>
      <div className="flow-node-title">{title}</div>
      <div className="flow-node-badge">{badge}</div>
      <div className="flow-node-detail">
        <p>{detail}</p>
      </div>
    </div>
  );
}
