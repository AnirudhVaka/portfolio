import type { Metadata } from "next";
import { UNIVERSAL_RULES } from "@/lib/resumeRules";
import { ResumeRenderer } from "./ResumeRenderer";
import { ResumeToolbar } from "./ResumeToolbar";
import "./resume.css";

/**
 * /resume route — a single comprehensive resume for everyone.
 *
 * No region logic: renders the universal ruleset with all bullets and
 * sections. Static (no cookies/headers), so it prerenders. The pre-built
 * DOCX lives at /public/downloads/anirudh-vaka-resume-universal.docx,
 * generated at build time by scripts/build-docx.ts.
 */
export const metadata: Metadata = {
  title: "Resume",
  description:
    "Anirudh Vaka — Senior DevOps / Platform / SRE Engineer · AI Infrastructure & LLMOps. Comprehensive resume: production infra on AWS, Azure & Kubernetes, 99.9% uptime, self-hosted LLMs and RAG, and two live AI SaaS products.",
};

export default function ResumePage() {
  return (
    <div className="resume-shell">
      <ResumeToolbar rules={UNIVERSAL_RULES} />
      <ResumeRenderer rules={UNIVERSAL_RULES} />
    </div>
  );
}
