import { Globe } from "lucide-react";
import { AVAILABILITY } from "@/lib/regionCopy";
import { HeroBackground } from "./HeroBackground";

/**
 * Hero. One universal version — no region view. The animated service-mesh
 * topology (HeroBackground) sits behind the content and degrades to the
 * static CSS aurora under reduced-motion.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <HeroBackground />
      {/*
        Hero content is intentionally NOT `data-reveal`-gated: it is above the
        fold and contains the LCP element (the H1). Gating it on the JS reveal
        (opacity:0 until hydration) would delay LCP. The `hero-enter` class is a
        transform-only CSS load-in (opacity stays 1) so it never delays LCP.
      */}
      <div className="hero-inner hero-enter">
        <div className="hero-tag mono">
          <Globe size={13} aria-hidden="true" />
          <span>Senior DevOps / Platform / SRE Engineer · AI Infrastructure & LLMOps</span>
        </div>
        <h1>
          Anirudh <span className="accent">Vaka</span>
        </h1>
        <p className="hero-tagline">
          Senior DevOps / Platform engineer — production infra on AWS, Azure &amp;
          Kubernetes at <strong>99.9% uptime for 1000+ customers</strong>, plus
          self-hosted LLMs and AI-in-SDLC auto-remediation. Founder of two live
          AI SaaS products.
        </p>

        <ul className="hero-cred" aria-label="Credentials">
          <li>Leads a team of 5</li>
          <li>Intern → DevOps Lead in &lt; 2 yrs</li>
          <li>200+ CI/CD pipelines</li>
          <li>ISO 27001:2022</li>
        </ul>

        <p className="hero-availability mono">
          <span className="dot" aria-hidden="true" /> {AVAILABILITY}
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary" data-magnetic>
            <span>View Projects</span>
          </a>
          <a href="/resume" className="btn btn-ghost">
            <span>Resume</span>
          </a>
          <a href="#writeups" className="btn btn-ghost">
            <span>Engineering Writeups</span>
          </a>
        </div>
      </div>
    </section>
  );
}
