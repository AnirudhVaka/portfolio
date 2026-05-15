"use client";

import { useEffect } from "react";

/**
 * RevealController — registers a single IntersectionObserver that toggles
 * the `.revealed` class on every `[data-reveal]` element as it scrolls
 * into view. Mounted once, near the top of the tree.
 *
 * Honors `prefers-reduced-motion` — if reduced motion is requested, every
 * `[data-reveal]` is marked revealed immediately so no movement happens.
 */
export function RevealController() {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduced) {
      targets.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
