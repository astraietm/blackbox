"use client";

// Stage 9: THE CIPHER — ROT13
// The ROT13 text "FVTANY" decodes to "SIGNAL"

import ChallengeFrame from "@/components/ChallengeFrame";
import { useState } from "react";

const CIPHER_TEXT = "GUVF VF ABG GUR RAQ — GUR CNFFJBEQ VF: FVTANY";
// ROT13 decoded: "THIS IS NOT THE END — THE PASSWORD IS: SIGNAL"
// Answer: signal

export default function VaultPage() {
  return (
    <ChallengeFrame challengeId="the-cipher">
      <CipherContent />
    </ChallengeFrame>
  );
}

function CipherContent() {
  const [showDecoder, setShowDecoder] = useState(false);
  const [inputText, setInputText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const rot13 = (text: string) => {
    return text.replace(/[A-Za-z]/g, (char) => {
      const base = char >= 'a' ? 97 : 65;
      return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  const handleDecode = () => {
    setDecodedText(rot13(inputText));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="card">
        <div
          className="mono"
          style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: "16px" }}
        >
          VAULT INTERIOR — ENCRYPTED MESSAGE
        </div>

        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
          You&apos;re inside the vault. NULL left one final message on the wall. 
          It&apos;s not Base64 this time — it&apos;s a{" "}
          <span style={{ color: "var(--accent-cyan)" }}>Caesar cipher</span>. 
          Every letter has been shifted by a fixed number of positions in the alphabet.
        </p>

        {/* The ciphertext */}
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-dim)",
            padding: "20px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
            color: "var(--accent-amber)",
            letterSpacing: "0.1em",
            wordBreak: "break-word",
            lineHeight: 1.8,
            marginBottom: "16px",
          }}
        >
          {CIPHER_TEXT}
        </div>

        <div
          style={{
            padding: "12px 14px",
            background: "rgba(0, 212, 255, 0.04)",
            border: "1px solid rgba(0, 212, 255, 0.1)",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            fontStyle: "italic",
          }}
        >
          "Not all codes are complicated. Sometimes a message is just{" "}
          <span style={{ color: "var(--text-primary)" }}>shifted</span> — every letter moved
          13 positions forward. This one is called ROT13."
        </div>
      </div>

      {/* Built-in decoder tool */}
      <div className="card">
        <div
          className="mono"
          style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: "12px" }}
        >
          ROT13 DECODER (BUILT-IN TOOL)
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "14px" }}>
          Paste the ciphertext below and decode it:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the encoded text here..."
            className="input-cyber"
            rows={3}
            style={{ resize: "vertical", fontFamily: "'JetBrains Mono', monospace" }}
          />
          <button onClick={handleDecode} className="btn-secondary" style={{ alignSelf: "flex-start" }}>
            [ DECODE ROT13 ]
          </button>
          {decodedText && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(0, 255, 135, 0.06)",
                border: "1px solid rgba(0, 255, 135, 0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--accent-green)",
                fontSize: "0.9rem",
                wordBreak: "break-word",
              }}
            >
              {decodedText}
            </div>
          )}
        </div>
      </div>

      {/* How cipher works */}
      <div
        style={{
          padding: "14px 16px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-dim)",
          fontSize: "0.8rem",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div style={{ color: "var(--text-muted)", marginBottom: "8px" }}>// ROT13 alphabet shift</div>
        <div style={{ color: "var(--text-secondary)" }}>A → N &nbsp; B → O &nbsp; C → P &nbsp; ... &nbsp; M → Z</div>
        <div style={{ color: "var(--text-secondary)" }}>N → A &nbsp; O → B &nbsp; P → C &nbsp; ... &nbsp; Z → M</div>
      </div>
    </div>
  );
}
