// Custom 404 page
// Contains an Easter egg HTML comment

import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body>
        {/* 
          👁️ You found the void.
          But voids sometimes speak.
          Try /dev if you dare.
          
          This is an Easter egg. It won't help you solve the mystery.
          But it proves you look everywhere. That's the spirit.
        */}
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "'JetBrains Mono', monospace",
            background: "#050810",
            color: "#e6edf3",
          }}
        >
          <div
            style={{
              fontSize: "6rem",
              fontWeight: 700,
              color: "#1e2d3d",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            404
          </div>
          <div
            style={{
              color: "#00d4ff",
              fontSize: "0.8rem",
              letterSpacing: "0.25em",
              marginBottom: "24px",
            }}
          >
            FILE NOT FOUND
          </div>
          <p
            style={{
              color: "#8b949e",
              fontSize: "0.9rem",
              textAlign: "center",
              maxWidth: "360px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            This page doesn&apos;t exist. Or does it?
            <br />
            <span style={{ color: "#4a5568", fontSize: "0.8rem" }}>
              (Check the page source — curious minds always do.)
            </span>
          </p>
          <Link
            href="/"
            style={{
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              border: "1px solid #1e2d3d",
              padding: "10px 24px",
              transition: "all 0.2s",
            }}
          >
            ← RETURN TO BASE
          </Link>
        </div>
      </body>
    </html>
  );
}
