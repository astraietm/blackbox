"use client";

import { useState, useEffect, useCallback } from "react";
import { CHALLENGES } from "@/lib/challenges";

interface TeamAdmin {
  id: string;
  name: string;
  completedChallenges: number;
  totalChallenges: number;
  isComplete: boolean;
  durationSeconds: number | null;
  startedAt: string;
  hintsUsed: number;
  progress: { challengeId: string; completedAt: string }[];
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [teams, setTeams] = useState<TeamAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamAdmin | null>(null);
  const [resetMsg, setResetMsg] = useState("");

  const fetchTeams = useCallback(
    async (adminToken: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/teams", {
          headers: { "x-admin-token": adminToken },
        });
        if (res.ok) {
          const data = await res.json();
          setTeams(data.teams || []);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    // Test the password by making an admin API call
    const res = await fetch("/api/admin/teams", {
      headers: { "x-admin-token": password },
    });
    if (res.ok) {
      setToken(password);
      setAuthed(true);
      const data = await res.json();
      setTeams(data.teams || []);
    } else {
      setAuthError("Invalid admin password");
    }
  };

  const handleReset = async (teamId: string) => {
    if (!confirm("Reset this team's progress? This cannot be undone.")) return;
    const res = await fetch("/api/admin/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ teamId }),
    });
    if (res.ok) {
      setResetMsg("Team reset successfully");
      setSelectedTeam(null);
      fetchTeams(token);
      setTimeout(() => setResetMsg(""), 3000);
    }
  };

  useEffect(() => {
    if (authed) {
      const interval = setInterval(() => fetchTeams(token), 30000);
      return () => clearInterval(interval);
    }
  }, [authed, token, fetchTeams]);

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "420px", width: "100%" }}>
          <div className="card">
            <div
              className="mono"
              style={{
                color: "var(--accent-red)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                marginBottom: "20px",
              }}
            >
              ⚠ ADMIN ACCESS REQUIRED
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: "24px",
                color: "var(--text-primary)",
              }}
            >
              ADMIN DASHBOARD
            </h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="password"
                className="input-cyber"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password..."
                autoComplete="current-password"
              />
              {authError && (
                <div className="mono" style={{ color: "var(--accent-red)", fontSize: "0.8rem" }}>
                  ✕ {authError}
                </div>
              )}
              <button type="submit" className="btn-primary">
                [ ACCESS DASHBOARD ]
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const completedTeams = teams.filter((t) => t.isComplete);
  const inProgressTeams = teams.filter((t) => !t.isComplete);

  return (
    <div style={{ minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "6px" }}>
              BLACK BOX ASSOCIATION
            </div>
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--text-primary)",
              }}
            >
              ADMIN DASHBOARD
            </h1>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => fetchTeams(token)}
              className="btn-secondary"
              style={{ fontSize: "0.75rem" }}
            >
              ↻ REFRESH
            </button>
            <a href="/leaderboard" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ fontSize: "0.75rem" }}>
                LEADERBOARD ↗
              </button>
            </a>
          </div>
        </div>

        {resetMsg && (
          <div
            className="mono"
            style={{
              color: "var(--accent-green)",
              padding: "10px 16px",
              background: "rgba(0,255,135,0.08)",
              border: "1px solid rgba(0,255,135,0.2)",
              marginBottom: "20px",
              fontSize: "0.85rem",
            }}
          >
            ✓ {resetMsg}
          </div>
        )}

        {/* Stats summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <StatCard label="TOTAL TEAMS" value={teams.length.toString()} color="var(--accent-cyan)" />
          <StatCard label="COMPLETED" value={completedTeams.length.toString()} color="var(--accent-green)" />
          <StatCard label="IN PROGRESS" value={inProgressTeams.length.toString()} color="var(--accent-amber)" />
          <StatCard
            label="COMPLETION RATE"
            value={teams.length ? `${Math.round((completedTeams.length / teams.length) * 100)}%` : "0%"}
            color="var(--accent-purple)"
          />
        </div>

        {loading ? (
          <div className="mono" style={{ color: "var(--accent-cyan)", padding: "40px 0", textAlign: "center" }}>
            LOADING TEAM DATA...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: selectedTeam ? "1fr 380px" : "1fr", gap: "20px" }}>
            {/* Teams table */}
            <div>
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                <div
                  style={{
                    padding: "14px 20px",
                    borderBottom: "1px solid var(--border-dim)",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
                    gap: "12px",
                  }}
                >
                  {["TEAM", "PROGRESS", "TIME", "HINTS", "ACTION"].map((h) => (
                    <div key={h} className="mono" style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                      {h}
                    </div>
                  ))}
                </div>
                {teams.length === 0 ? (
                  <div className="mono" style={{ padding: "32px", color: "var(--text-muted)", textAlign: "center" }}>
                    No teams registered yet
                  </div>
                ) : (
                  teams.map((team) => (
                    <div
                      key={team.id}
                      style={{
                        padding: "12px 20px",
                        borderBottom: "1px solid var(--border-dim)",
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
                        gap: "12px",
                        alignItems: "center",
                        cursor: "pointer",
                        background: selectedTeam?.id === team.id ? "rgba(0,212,255,0.05)" : "transparent",
                        transition: "background 0.15s",
                      }}
                      onClick={() => setSelectedTeam(selectedTeam?.id === team.id ? null : team)}
                    >
                      <div
                        className="mono"
                        style={{
                          color: team.isComplete ? "var(--accent-green)" : "var(--text-primary)",
                          fontSize: "0.85rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {team.isComplete && "✓ "}
                        {team.name}
                      </div>
                      <div style={{ fontSize: "0.8rem" }}>
                        <span className="mono" style={{ color: "var(--accent-cyan)" }}>
                          {team.completedChallenges}
                        </span>
                        <span className="mono" style={{ color: "var(--text-muted)" }}>
                          /{team.totalChallenges}
                        </span>
                      </div>
                      <div className="mono" style={{ color: team.isComplete ? "var(--accent-green)" : "var(--text-muted)", fontSize: "0.8rem" }}>
                        {team.isComplete && team.durationSeconds !== null
                          ? formatDuration(team.durationSeconds)
                          : "—"}
                      </div>
                      <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        {team.hintsUsed}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReset(team.id);
                        }}
                        className="btn-ghost"
                        style={{ fontSize: "0.65rem", padding: "4px 10px", color: "var(--accent-red)", borderColor: "rgba(255,71,87,0.3)" }}
                      >
                        RESET
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Team detail panel */}
            {selectedTeam && (
              <div className="card" style={{ alignSelf: "start", position: "sticky", top: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                    TEAM DETAIL
                  </div>
                  <button onClick={() => setSelectedTeam(null)} className="btn-ghost" style={{ fontSize: "0.7rem", padding: "3px 8px" }}>
                    ✕
                  </button>
                </div>
                <div className="mono" style={{ color: "var(--text-primary)", fontSize: "1rem", marginBottom: "16px" }}>
                  {selectedTeam.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                  {CHALLENGES.map((c) => {
                    const done = selectedTeam.progress.find((p) => p.challengeId === c.id);
                    return (
                      <div
                        key={c.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "5px 8px",
                          background: done ? "rgba(0,255,135,0.04)" : "transparent",
                          border: "1px solid",
                          borderColor: done ? "rgba(0,255,135,0.15)" : "var(--border-dim)",
                        }}
                      >
                        <span
                          className="mono"
                          style={{ color: done ? "var(--accent-green)" : "var(--text-muted)", fontSize: "0.7rem", minWidth: "12px" }}
                        >
                          {done ? "✓" : "○"}
                        </span>
                        <span style={{ color: done ? "var(--text-primary)" : "var(--text-muted)", fontSize: "0.75rem" }}>
                          {c.title}
                        </span>
                        {done && (
                          <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.6rem", marginLeft: "auto" }}>
                            {new Date(done.completedAt).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => handleReset(selectedTeam.id)}
                  className="btn-secondary"
                  style={{ width: "100%", color: "var(--accent-red)", borderColor: "rgba(255,71,87,0.4)", fontSize: "0.75rem" }}
                >
                  RESET TEAM PROGRESS
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="card"
      style={{ textAlign: "center", padding: "20px 16px" }}
    >
      <div
        className="mono"
        style={{ fontSize: "1.8rem", fontWeight: 700, color, marginBottom: "6px" }}
      >
        {value}
      </div>
      <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
        {label}
      </div>
    </div>
  );
}
