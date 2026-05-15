import type { Region } from "@/lib/geo";
import { introParagraph } from "@/lib/regionCopy";

interface Props {
  region: Region;
}

/**
 * Single intro paragraph below the hero. Reads region-aware copy from
 * lib/regionCopy.ts. The visa-eligibility clause changes per visitor;
 * everything else is constant.
 */
export function IntroSection({ region }: Props) {
  return (
    <section className="intro-section" data-reveal>
      <div className="intro-card container">
        <p>{introParagraph(region)}</p>
      </div>
    </section>
  );
}
