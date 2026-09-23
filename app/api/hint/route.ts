import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CHALLENGES } from "@/lib/challenges";

export async function POST(req: NextRequest) {
  try {
    const token =
      req.headers.get("x-team-token") ||
      req.cookies.get("team_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const team = await prisma.team.findUnique({
      where: { token },
      include: { hintUsages: true },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const { challengeId } = await req.json();

    const challenge = CHALLENGES.find((c) => c.id === challengeId);
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const usedHints = team.hintUsages
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((h: any) => h.challengeId === challengeId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((h: any) => h.hintIndex)
      .sort((a: number, b: number) => a - b);

    const nextHintIndex = usedHints.length;

    if (nextHintIndex >= challenge.hints.length) {
      return NextResponse.json({
        hint: null,
        hintIndex: nextHintIndex,
        allRevealed: true,
        hints: challenge.hints,
      });
    }

    // Record hint usage
    await prisma.hintUsage.upsert({
      where: {
        teamId_challengeId_hintIndex: {
          teamId: team.id,
          challengeId,
          hintIndex: nextHintIndex,
        },
      },
      update: {},
      create: {
        teamId: team.id,
        challengeId,
        hintIndex: nextHintIndex,
      },
    });

    return NextResponse.json({
      hint: challenge.hints[nextHintIndex],
      hintIndex: nextHintIndex,
      allRevealed: nextHintIndex === challenge.hints.length - 1,
      hints: challenge.hints.slice(0, nextHintIndex + 1),
    });
  } catch (error) {
    console.error("[hint/POST]", error);
    return NextResponse.json({ error: "Failed to get hint" }, { status: 500 });
  }
}
