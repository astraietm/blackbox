"use client";

import { useEffect, useState, useCallback } from "react";

interface LeaderboardEntry {
  name: string;
  completedChallenges: number;
  totalChallenges: number;
  isComplete: boolean;
  durationSeconds: number | null;
  startedAt: string;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setEntries(data.leaderboard || []);
      setLastUpdated(new Date());
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            className="mono"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              marginBottom: "16px",
            }}
          >
            BLACK BOX ASSOCIATION · INVESTIGATION SYSTEM
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.08em",
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            LEADERBOARD
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <div style={{ height: "1px", width: "80px", background: "var(--border-dim)" }} />
            <span
              className="mono"
              style={{ color: "var(--accent-cyan)", fontSize: "0.65rem", letterSpacing: "0.15em" }}
            >
              LIVE · AUTO-REFRESH
            </span>
            <div style={{ height: "1px", width: "80px", background: "var(--border-dim)" }} />
          </div>
          {lastUpdated && (
            <div
              className="mono"
              style={{ color: "var(--text-muted)", fontSize: "0.6rem", marginTop: "8px" }}
            >
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div className="mono" style={{ color: "var(--accent-cyan)", letterSpacing: "0.1em" }}>
              LOADING RANKINGS...
            </div>
          </div>
        ) : entries.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: "center", padding: "60px 24px" }}
          >
            <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              NO TEAMS REGISTERED YET
            </div>
            <p style={{ color: "var(--text-muted)", marginTop: "12px", fontSize: "0.85rem" }}>
              The investigation hasn&apos;t started yet.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {entries.map((entry, index) => (
              <LeaderboardRow
                key={entry.name}
                entry={entry}
                rank={index + 1}
              />
            ))}
          </div>
        )}

        {/* Footer actions */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ fontSize: "0.75rem" }}>
              ← HOME
            </button>
          </a>
          <button
            onClick={fetchLeaderboard}
            className="btn-ghost"
            style={{ fontSize: "0.75rem" }}
          >
            [ REFRESH ]
          </button>
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({
  entry,
  rank,
}: {
  entry: LeaderboardEntry;
  rank: number;
}) {
  const progressPercent = (entry.completedChallenges / entry.totalChallenges) * 100;

  const rankColor =
    rank === 1
      ? "#ffd700"
      : rank === 2
      ? "#c0c0c0"
      : rank === 3
      ? "#cd7f32"
      : "var(--text-muted)";

  return (
    <div
      className="card animate-fade-in"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px 20px",
        borderColor: entry.isComplete
          ? "rgba(0, 255, 135, 0.25)"
          : "var(--border-dim)",
        background: entry.isComplete
          ? "rgba(0, 255, 135, 0.03)"
          : "var(--bg-surface)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Rank */}
      <div
        className="mono"
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: rankColor,
          minWidth: "36px",
          textAlign: "center",
        }}
      >
        {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `#${rank}`}
      </div>

      {/* Team name + progress */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span
            className="mono"
            style={{
              fontWeight: 600,
              color: entry.isComplete ? "var(--accent-green)" : "var(--text-primary)",
              fontSize: "0.9rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {entry.name}
          </span>
          <span
            className="mono"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.7rem",
              marginLeft: "12px",
              flexShrink: 0,
            }}
          >
            {entry.completedChallenges}/{entry.totalChallenges}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Time or status */}
      <div
        className="mono"
        style={{
          fontSize: "0.85rem",
          color: entry.isComplete ? "var(--accent-green)" : "var(--text-muted)",
          minWidth: "90px",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {entry.isComplete && entry.durationSeconds !== null
          ? formatDuration(entry.durationSeconds)
          : entry.isComplete
          ? "COMPLETE"
          : "IN PROGRESS"}
      </div>
    </div>
  );
}
