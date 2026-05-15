import type { Region } from "@/lib/geo";
import { REGION_FLAG, REGION_LABEL } from "@/lib/geo";

interface Props {
  region: Region;
}

export function Hero({ region }: Props) {
  return (
    <section className="hero" id="top">
      <div className="hero-tag mono" data-reveal>
        <span aria-hidden="true">{REGION_FLAG[region]}</span>
        <span>Senior DevOps Engineer · {REGION_LABEL[region]} view</span>
      </div>
      <h1 data-reveal>
        Anirudh <span className="accent">Vaka</span>
      </h1>
      <p className="hero-tagline" data-reveal>
        Production infrastructure on AWS + on-prem Kubernetes.
        <br />
        Founder of PrepAtlas + HumanifyCV.
      </p>
      <div className="hero-actions" data-reveal>
        <a href="#projects" className="btn btn-primary">
          <span>View Projects</span>
        </a>
        <a href="/resume" className="btn btn-ghost">
          <span>Resume</span>
        </a>
        <a href="#writeups" className="btn btn-ghost">
          <span>Engineering Writeups</span>
        </a>
      </div>
    </section>
  );
}
