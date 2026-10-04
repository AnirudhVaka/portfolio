import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  // Trimmed to the weights actually used (dropped 300 + 900) to shrink the
  // font payload on the LCP path — the hero heading is the LCP element.
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-fira",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anirudhvaka.dev"),
  title: {
    default: "Anirudh Vaka — Senior DevOps & AI Infrastructure Engineer",
    template: "%s · Anirudh Vaka",
  },
  // Site-wide default (~155 chars — within Google's snippet window). Pages
  // that set their own `description` (e.g. /resume) replace it, so each page
  // gets exactly one description <meta>.
  description:
    "Senior DevOps & AI Infrastructure engineer — AWS, Azure & Kubernetes at 99.9% uptime for 1000+ customers; self-hosted LLMs, RAG, LLMOps. Founder of PrepAtlas.",
  keywords: [
    "Senior DevOps Engineer",
    "AI Infrastructure Engineer",
    "MLOps",
    "LLMOps",
    "Platform Engineer",
    "SRE",
    "AWS",
    "Azure",
    "Kubernetes",
    "Terraform",
    "GitOps",
    "GitHub Actions",
    "FinOps",
    "Self-hosted LLMs",
    "RAG",
    "Hyderabad",
    "Remote DevOps",
  ],
  authors: [{ name: "Anirudh Vaka", url: "https://anirudhvaka.dev" }],
  openGraph: {
    title: "Anirudh Vaka — Senior DevOps & AI Infrastructure Engineer",
    description:
      "Production infra on AWS, Azure & Kubernetes at 99.9% uptime for 1000+ customers, plus self-hosted LLMs, RAG and AI-in-SDLC auto-remediation. Founder of two live AI SaaS products.",
    url: "https://anirudhvaka.dev",
    siteName: "Anirudh Vaka",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh Vaka — Senior DevOps & AI Infrastructure Engineer",
    description:
      "Production infra on AWS, Azure & Kubernetes at 99.9% uptime for 1000+ customers, plus self-hosted LLMs, RAG and AI-in-SDLC auto-remediation. Founder of two live AI SaaS products.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

/**
 * Person structured data (schema.org/Person). Rendered as JSON-LD so search
 * engines + rich results understand who this is. Kept in sync with the hero
 * + resume — no fabricated fields.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anirudh Vaka",
  url: "https://anirudhvaka.dev",
  jobTitle: "Senior DevOps / Platform / SRE Engineer · AI Infrastructure & LLMOps",
  email: "mailto:anirudhvaka@gmail.com",
  worksFor: { "@type": "Organization", name: "Snovasys Software Solutions" },
  knowsAbout: [
    "DevOps",
    "Platform Engineering",
    "Site Reliability Engineering",
    "AWS",
    "Azure",
    "Kubernetes",
    "Terraform",
    "GitOps",
    "FinOps",
    "AI Infrastructure",
    "MLOps",
    "LLMOps",
    "Retrieval-Augmented Generation",
    "Self-hosted large language models",
  ],
  sameAs: [
    "https://www.linkedin.com/in/anirudhvaka",
    "https://github.com/AnirudhVaka",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {/*
         * Icons are now self-hosted (lucide-react + inline brand SVGs) — no
         * third-party icon CDN (brief A10). Fonts self-host via next/font.
         *
         * Noscript fallback: if JavaScript is disabled, every [data-reveal]
         * stays at opacity:0 because the IntersectionObserver never runs.
         * This forces them visible so the page is still readable + crawlable.
         */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#projects">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
