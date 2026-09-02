import { ImageResponse } from "next/og";

/**
 * Open Graph image — rendered at build/edge via @vercel/og (built into Next 15).
 *
 * Linked automatically as <meta property="og:image"> on every page of
 * the site. Twitter card uses the same image.
 *
 * Kept simple: name + role + aurora-tinted background that matches the
 * portfolio's visual identity. No fonts loaded over the wire to keep
 * generation fast.
 */
export const runtime = "edge";
export const alt = "Anirudh Vaka — Senior DevOps & AI Infrastructure Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 96px",
          color: "#F1F5F9",
          backgroundColor: "#0A0A0B",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(0,229,255,0.20), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#00E5FF",
            fontSize: 22,
            letterSpacing: 2,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              border: "3px solid #00E5FF",
              borderRadius: 4,
            }}
          />
          ANIRUDHVAKA.DEV
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            marginBottom: 24,
            display: "flex",
          }}
        >
          Anirudh{" "}
          <span
            style={{
              marginLeft: 24,
              backgroundImage: "linear-gradient(135deg, #00E5FF, #B388FF)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Vaka
          </span>
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#A8B2C4",
            lineHeight: 1.3,
            maxWidth: 940,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Senior DevOps / Platform / SRE · AI Infrastructure &amp; LLMOps · AWS,
          Azure &amp; Kubernetes · Founder of PrepAtlas + HumanifyCV
        </div>
        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 60,
            color: "#6B7A90",
            fontSize: 22,
          }}
        >
          <span>99.9% uptime · 1000+ customers</span>
          <span style={{ color: "#3a3f55" }}>·</span>
          <span>200+ pipelines</span>
          <span style={{ color: "#3a3f55" }}>·</span>
          <span>leads a team of 5</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
