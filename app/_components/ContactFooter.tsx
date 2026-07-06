import { Mail, Phone, Code } from "lucide-react";
import { CONTACT_CTA, AVAILABILITY } from "@/lib/regionCopy";
import { resume } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ContactTerminal } from "./ContactTerminal";

/**
 * Contact CTA + footer. One universal role-pitch + availability line from
 * lib/regionCopy.ts. Icons are self-hosted (lucide + inline brand marks) —
 * no Font Awesome CDN. The interactive terminal (ContactTerminal) is the hero
 * of this section; the `ssh anirudh@connect` block below is the static / no-JS
 * fallback.
 */
export function ContactFooter() {
  return (
    <>
      <section className="cta-section" id="contact" data-reveal>
        <h2 className="cta-title">
          Let&apos;s <span className="cta-gradient">build together</span>
        </h2>
        <p className="cta-sub">{CONTACT_CTA}</p>
        <p className="cta-availability mono" data-reveal>
          <span className="dot" aria-hidden="true" /> {AVAILABILITY}
        </p>

        <ContactTerminal />

        <div className="cta-actions">
          <a href={`mailto:${resume.contact.email}`} className="btn btn-primary" data-magnetic>
            <Mail size={16} aria-hidden="true" />
            <span>Get in touch</span>
          </a>
          <a
            href={`https://${resume.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <LinkedinIcon size={16} />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-terminal">
          <div className="footer-prompt">$ ssh anirudh@connect</div>
          <div className="footer-links">
            <a href={`mailto:${resume.contact.email}`}>
              <Mail size={13} aria-hidden="true" />
              {resume.contact.email}
            </a>
            <a href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}>
              <Phone size={13} aria-hidden="true" />
              {resume.contact.phone}
            </a>
            <a
              href={`https://${resume.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={13} />
              {resume.contact.linkedin}
            </a>
            <a
              href={`https://${resume.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={13} />
              {resume.contact.github}
            </a>
            <a
              href="https://github.com/AnirudhVaka/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code size={13} aria-hidden="true" />
              view this site&apos;s source
            </a>
          </div>
        </div>
        <div className="footer-copy">
          // SENIOR DEVOPS / PLATFORM / SRE ENGINEER · 2026 ANIRUDH VAKA
        </div>
      </footer>
    </>
  );
}
