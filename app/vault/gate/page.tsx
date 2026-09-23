"use client";

// Stage 8: THE IMAGE — image metadata/EXIF comment contains "cipher"

import ChallengeFrame from "@/components/ChallengeFrame";

export default function VaultGatePage() {
  return (
    <ChallengeFrame challengeId="the-image">
      <ImageContent />
    </ChallengeFrame>
  );
}

function ImageContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="card">
        <div
          className="mono"
          style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: "16px" }}
        >
          EVIDENCE FILE — IMAGE ARTIFACT
        </div>

        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
          This image was found in NULL&apos;s archive directory. It appears to be an ordinary
          photograph. But files carry more than pixels — they carry{" "}
          <span style={{ color: "var(--accent-cyan)" }}>metadata</span>. Hidden information
          embedded in the file itself, invisible to the naked eye.
        </p>

        {/* The image */}
        <div
          style={{
            border: "1px solid var(--border-dim)",
            padding: "8px",
            background: "var(--bg-elevated)",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              background: "linear-gradient(135deg, #0d1117 0%, #131a26 50%, #0d1117 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Stylized placeholder image */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(0,212,255,0.03) 0px, rgba(0,212,255,0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(124,58,237,0.03) 0px, rgba(124,58,237,0.03) 1px, transparent 1px, transparent 20px)",
              }}
            />
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "8px",
                  filter: "grayscale(1) brightness(0.4)",
                }}
              >
                🖼️
              </div>
              <div
                className="mono"
                style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.2em" }}
              >
                null_archive_photo.jpg
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              null_archive_photo.jpg
            </span>
            <a
              href="/images/null_archive_photo.jpg"
              download
              className="btn-ghost"
              style={{ fontSize: "0.7rem", textDecoration: "none", display: "inline-block" }}
            >
              ↓ DOWNLOAD
            </a>
          </div>
        </div>

        <div
          style={{
            padding: "14px 16px",
            background: "rgba(124, 58, 237, 0.05)",
            border: "1px solid rgba(124, 58, 237, 0.15)",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}
        >
          "Files can remember more than pictures. Every image carries a hidden record —
          the camera model, date taken, GPS location... and sometimes, a{" "}
          <span style={{ color: "var(--text-primary)" }}>comment</span>."
        </div>
      </div>

      {/* How to view metadata guide */}
      <div className="card">
        <div
          className="mono"
          style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: "14px" }}
        >
          HOW TO READ FILE METADATA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <MetadataStep
            os="Windows"
            step="Right-click the downloaded file → Properties → Details tab → Look for 'Comments'"
          />
          <MetadataStep
            os="macOS"
            step="Right-click the file → Get Info → Look for 'Comments' or 'More Info'"
          />
          <MetadataStep
            os="Any OS"
            step="Search online for 'EXIF viewer' and upload the image. Many free tools exist."
          />
        </div>
      </div>
    </div>
  );
}

function MetadataStep({ os, step }: { os: string; step: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "10px 14px",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-dim)",
        fontSize: "0.8rem",
      }}
    >
      <span
        className="mono"
        style={{
          color: "var(--accent-cyan)",
          minWidth: "70px",
          fontSize: "0.7rem",
          letterSpacing: "0.05em",
        }}
      >
        {os}
      </span>
      <span style={{ color: "var(--text-secondary)" }}>{step}</span>
    </div>
  );
}
