import { INTRO_PARAGRAPH } from "@/lib/regionCopy";

/**
 * Single intro paragraph below the hero. One universal version.
 */
export function IntroSection() {
  return (
    <section className="intro-section" data-reveal>
      <div className="intro-card container">
        <p>{INTRO_PARAGRAPH}</p>
      </div>
    </section>
  );
}
