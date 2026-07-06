"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "writeups", label: "Writeups" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`} aria-label="Primary">
      <div className="container nav-inner">
        <a href="#top" className="nav-brand" aria-label="Anirudh Vaka — home">
          <span className="nav-cursor" aria-hidden="true" />
          <span>Anirudh Vaka</span>
        </a>
        <div className="nav-links" role="navigation">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "active" : ""}
              aria-current={active === s.id ? "location" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <span className="nav-status mono" aria-label="Status: available">
            <span className="dot" aria-hidden="true" /> Available
          </span>
          <a href="/resume" className="btn-nav mono">
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
