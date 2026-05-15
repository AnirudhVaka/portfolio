import type { Region } from "@/lib/geo";
import { CONTACT_CTA } from "@/lib/regionCopy";
import { resume } from "@/data/resume";

interface Props {
  region: Region;
}

/**
 * Contact CTA + footer. Region-aware role-pitch sentence reads from
 * lib/regionCopy.ts. LinkedIn URL is the canonical /in/anirudhvaka
 * (fixed from the v1 legacy URL).
 */
export function ContactFooter({ region }: Props) {
  return (
    <>
      <section className="cta-section" id="contact" data-reveal>
        <h2 className="cta-title">
          Let&apos;s <span className="cta-gradient">build together</span>
        </h2>
        <p className="cta-sub">{CONTACT_CTA[region]}</p>
        <div className="cta-actions">
          <a
            href={`mailto:${resume.contact.email}`}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            <span>Get in touch</span>
          </a>
          <a
            href={`https://${resume.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <i className="fa-brands fa-linkedin" aria-hidden="true" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-terminal">
          <div className="footer-prompt">$ ssh anirudh@connect</div>
          <div className="footer-links">
            <a href={`mailto:${resume.contact.email}`}>
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              {resume.contact.email}
            </a>
            <a href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}>
              <i className="fa-solid fa-phone" aria-hidden="true" />
              {resume.contact.phone}
            </a>
            <a
              href={`https://${resume.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin" aria-hidden="true" />
              {resume.contact.linkedin}
            </a>
            <a
              href={`https://${resume.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github" aria-hidden="true" />
              {resume.contact.github}
            </a>
            <a
              href="https://github.com/AnirudhVaka/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-code" aria-hidden="true" />
              view this site's source
            </a>
          </div>
        </div>
        <div className="footer-copy">
          // SENIOR DEVOPS &amp; PRODUCT ENGINEER · 2026 ANIRUDH VAKA
        </div>
      </footer>
    </>
  );
}
