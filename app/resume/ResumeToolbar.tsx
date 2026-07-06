"use client";

import { Printer, FileText, ArrowLeft } from "lucide-react";
import type { ResumeRules } from "@/lib/resumeRules";

interface Props {
  rules: ResumeRules;
}

/**
 * Resume toolbar — sticky chip above the A4 page. Single comprehensive
 * resume, so no region switcher: just Print (window.print) + Download Word
 * (the pre-built universal .docx) + Back to portfolio.
 *
 * Hidden in print via `.resume-toolbar { display: none }` in print CSS.
 */
export function ResumeToolbar({ rules }: Props) {
  function printNow() {
    if (typeof window !== "undefined") window.print();
  }

  const docxHref = `/downloads/anirudh-vaka-resume-${rules.fileSlug}.docx`;

  return (
    <div className="resume-toolbar">
      <div className="resume-toolbar-left">
        <span>
          <strong>Anirudh Vaka</strong> · {rules.titleChip}
        </span>
      </div>
      <div className="resume-toolbar-actions">
        <button
          type="button"
          onClick={printNow}
          className="resume-btn is-primary"
        >
          <Printer size={14} aria-hidden="true" />
          Print / Save as PDF
        </button>
        <a href={docxHref} className="resume-btn" download>
          <FileText size={14} aria-hidden="true" />
          Download Word
        </a>
        <a href="/" className="resume-btn">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to portfolio
        </a>
      </div>
    </div>
  );
}
