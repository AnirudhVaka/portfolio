import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <p
        className="mono"
        style={{
          color: "var(--cyan)",
          fontSize: 13,
          letterSpacing: "0.2em",
          marginBottom: 16,
        }}
      >
        HTTP 404 · NOT FOUND
      </p>
      <h1
        style={{
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          marginBottom: 14,
        }}
      >
        Pipeline stage{" "}
        <span
          style={{
            backgroundImage: "linear-gradient(135deg,var(--cyan),var(--purple))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          missing
        </span>
      </h1>
      <p style={{ color: "var(--text2)", maxWidth: 520, marginBottom: 32 }}>
        This route isn&apos;t in the deployment graph. Head back to the
        portfolio or jump straight to the resume.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">
          <span>Back to portfolio</span>
        </Link>
        <Link href="/resume" className="btn btn-ghost">
          <span>View resume</span>
        </Link>
      </div>
    </main>
  );
}
