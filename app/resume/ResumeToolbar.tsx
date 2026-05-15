"use client";

import type { Region } from "@/lib/geo";
import { REGION_FLAG, REGION_LABEL } from "@/lib/geo";
import type { ResumeRules } from "@/lib/resumeRules";
import { RegionSwitcher } from "../_components/RegionSwitcher";

interface Props {
  region: Region;
  source: "override" | "detected" | "header" | "fallback";
  rules: ResumeRules;
}

/**
 * Resume toolbar — sticky chip above the A4 page. Shows the active
 * variant, lets the visitor switch region, and offers Print (window.print)
 * + Download Word (static link to pre-built /downloads/...docx).
 *
 * Hidden in print via `.resume-toolbar { display: none }` in print CSS.
 */
export function ResumeToolbar({ region, source, rules }: Props) {
  function printNow() {
    if (typeof window !== "undefined") window.print();
  }

  const docxHref = `/downloads/anirudh-vaka-resume-${rules.fileSlug}.docx`;

  return (
    <div className="resume-toolbar">
      <div className="resume-toolbar-left">
        <span aria-hidden="true" style={{ fontSize: 18 }}>
          {REGION_FLAG[region]}
        </span>
        <span>
          <strong>{REGION_LABEL[region]} variant</strong> · {rules.lengthLabel}
        </span>
        <RegionSwitcher current={region} source={source} />
      </div>
      <div className="resume-toolbar-actions">
        <button
          type="button"
          onClick={printNow}
          className="resume-btn is-primary"
        >
          <i className="fa-solid fa-print" aria-hidden="true" />
          Print / Save as PDF
        </button>
        <a href={docxHref} className="resume-btn" download>
          <i className="fa-regular fa-file-word" aria-hidden="true" />
          Download Word
        </a>
        <a href="/" className="resume-btn">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Back to portfolio
        </a>
      </div>
    </div>
  );
}
