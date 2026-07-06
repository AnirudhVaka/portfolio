"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background — a lightweight animated service-mesh / topology (brief C6).
 * Nodes drift, near nodes link with edges, subtle cursor parallax. Built for
 * the perf budget:
 *   - pure 2D canvas, no library, DPR capped at 1.5
 *   - FPS capped at ~30
 *   - paused when the tab is hidden OR the hero scrolls out of view
 *   - not started at all under prefers-reduced-motion (CSS aurora shows instead)
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const mouse = { x: 0.5, y: 0.5 };

    function resize() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 22000), 46);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let running = true;
    let raf = 0;
    let last = 0;
    const LINK = 130;

    function frame(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return; // ~30fps cap
      last = now;

      ctx!.clearRect(0, 0, w, h);
      const px = (mouse.x - 0.5) * 16;
      const py = (mouse.y - 0.5) * 16;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const o = (1 - dist / LINK) * 0.4;
            ctx!.strokeStyle = `rgba(0, 229, 255, ${o})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x + px, a.y + py);
            ctx!.lineTo(b.x + px, b.y + py);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = "rgba(179, 136, 255, 0.7)";
        ctx!.beginPath();
        ctx!.arc(n.x + px, n.y + py, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    function start() {
      if (raf) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    // Pause when the hero scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(parent);

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
