import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    default: "Anirudh Vaka — Senior DevOps Engineer",
    template: "%s · Anirudh Vaka",
  },
  description:
    "Senior DevOps Engineer running production infrastructure on AWS and on-prem Kubernetes. Founder of PrepAtlas and HumanifyCV.",
  keywords: [
    "Senior DevOps Engineer",
    "Platform Engineer",
    "SRE",
    "AWS",
    "Kubernetes",
    "Terraform",
    "GitHub Actions",
    "Hyderabad",
    "Remote DevOps",
  ],
  authors: [{ name: "Anirudh Vaka", url: "https://anirudhvaka.dev" }],
  openGraph: {
    title: "Anirudh Vaka — Senior DevOps Engineer",
    description:
      "Production infrastructure on AWS + on-prem Kubernetes. Founder of PrepAtlas + HumanifyCV.",
    url: "https://anirudhvaka.dev",
    siteName: "Anirudh Vaka",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh Vaka — Senior DevOps Engineer",
    description:
      "Production infrastructure on AWS + on-prem Kubernetes. Founder of PrepAtlas + HumanifyCV.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
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
         * Font Awesome 6 — used for icons in the pipeline widget, project
         * flow diagrams, and footer. Loaded from cdnjs (same as the v1
         * site). No SRI hash so an FA point-release patch doesn't brick
         * the icons; cdnjs over HTTPS is the trust anchor.
         */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          referrerPolicy="no-referrer"
        />
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
          crossOrigin="anonymous"
        />
        {/*
         * Noscript fallback: if JavaScript is disabled, every [data-reveal]
         * stays at opacity:0 because the IntersectionObserver never runs.
         * This forces them visible so the page is still readable + crawlable.
         */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
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
