"use client";

import { useEffect } from "react";

/**
 * Pointer micro-interactions (brief C, polish): magnetic primary buttons,
 * a cursor-follow glow in the hero, and a subtle 3–5° tilt on `.tilt` cards.
 * All pointer-driven and GPU-friendly (transform only). Entirely disabled
 * under prefers-reduced-motion and on coarse (touch) pointers.
 */
export function Interactions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const cleanups: Array<() => void> = [];
    const bind = (
      el: HTMLElement,
      type: string,
      fn: (e: Event) => void
    ) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };

    // Magnetic buttons
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const move = (e: Event) => {
        const m = e as MouseEvent;
        const r = el.getBoundingClientRect();
        const x = m.clientX - (r.left + r.width / 2);
        const y = m.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.35}px)`;
      };
      bind(el, "mousemove", move);
      bind(el, "mouseleave", () => (el.style.transform = ""));
    });

    // Hero cursor-follow glow
    const hero = document.querySelector<HTMLElement>(".hero");
    if (hero) {
      bind(hero, "mousemove", (e) => {
        const m = e as MouseEvent;
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${((m.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty("--my", `${((m.clientY - r.top) / r.height) * 100}%`);
        hero.classList.add("glow-on");
      });
      bind(hero, "mouseleave", () => hero.classList.remove("glow-on"));
    }

    // Card tilt
    document.querySelectorAll<HTMLElement>(".tilt").forEach((el) => {
      const move = (e: Event) => {
        const m = e as MouseEvent;
        const r = el.getBoundingClientRect();
        const px = (m.clientX - r.left) / r.width - 0.5;
        const py = (m.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
      };
      bind(el, "mousemove", move);
      bind(el, "mouseleave", () => (el.style.transform = ""));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
