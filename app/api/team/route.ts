import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Team name is required" }, { status: 400 });
    }

    const sanitized = name.trim().slice(0, 50);
    if (sanitized.length < 2) {
      return NextResponse.json(
        { error: "Team name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Check if team already exists
    const existing = await prisma.team.findUnique({
      where: { name: sanitized },
    });

    if (existing) {
      // Return existing team (re-login)
      return NextResponse.json({
        id: existing.id,
        name: existing.name,
        token: existing.token,
        message: "Welcome back! Resuming your investigation.",
      });
    }

    const team = await prisma.team.create({
      data: { name: sanitized },
    });

    const response = NextResponse.json({
      id: team.id,
      name: team.name,
      token: team.token,
      message: "Team registered. The investigation begins.",
    });

    // Set cookie
    response.cookies.set("team_token", team.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[team/POST]", error);
    return NextResponse.json({ error: "Failed to register team" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token =
      req.headers.get("x-team-token") ||
      req.cookies.get("team_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No team token" }, { status: 401 });
    }

    const team = await prisma.team.findUnique({
      where: { token },
      include: {
        progress: { orderBy: { completedAt: "asc" } },
        hintUsages: true,
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const completedIds = team.progress.map((p) => p.challengeId);
    const hintMap: Record<string, number[]> = {};
    for (const h of team.hintUsages) {
      if (!hintMap[h.challengeId]) hintMap[h.challengeId] = [];
      hintMap[h.challengeId].push(h.hintIndex);
    }

    return NextResponse.json({
      id: team.id,
      name: team.name,
      completedChallenges: completedIds,
      completedAt: team.completedAt,
      hints: hintMap,
    });
  } catch (error) {
    console.error("[team/GET]", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}
