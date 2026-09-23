// Easter egg /null page

export default function NullPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        background: "#050810",
        color: "#e6edf3",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "24px" }}>∅</div>
      <div style={{ color: "#00d4ff", fontSize: "0.7rem", letterSpacing: "0.3em", marginBottom: "20px" }}>
        NULL
      </div>
      <p style={{ color: "#8b949e", maxWidth: "400px", lineHeight: 2, fontSize: "0.9rem", marginBottom: "24px" }}>
        You called for NULL.
        <br />
        NULL does not answer.
        <br />
        <br />
        NULL simply watches.
        <br />
        <br />
        <span style={{ color: "#4a5568", fontSize: "0.8rem" }}>
          robots.txt told you this was disallowed. You came anyway.
          <br />
          That&apos;s very on-brand.
        </span>
      </p>
      <a
        href="/"
        style={{
          color: "#8b949e",
          textDecoration: "none",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
        }}
      >
        RETURN →
      </a>
    </div>
  );
}
