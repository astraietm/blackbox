import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TOTAL_CHALLENGES } from "@/lib/challenges";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        progress: true,
      },
      orderBy: [
        { completedAt: "asc" },
        { createdAt: "asc" },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leaderboard = teams.map((team: any) => {
      const completedChallenges = team.progress.length;
      const isComplete = completedChallenges >= TOTAL_CHALLENGES && !!team.completedAt;

      let duration: number | null = null;
      if (isComplete && team.completedAt) {
        duration = Math.floor(
          (team.completedAt.getTime() - team.createdAt.getTime()) / 1000
        );
      }

      return {
        name: team.name,
        completedChallenges,
        totalChallenges: TOTAL_CHALLENGES,
        isComplete,
        completedAt: team.completedAt,
        durationSeconds: duration,
        startedAt: team.createdAt,
      };
    });

    // Sort: completed first (by duration), then by progress
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    leaderboard.sort((a: any, b: any) => {
      if (a.isComplete && b.isComplete) {
        return (a.durationSeconds ?? Infinity) - (b.durationSeconds ?? Infinity);
      }
      if (a.isComplete) return -1;
      if (b.isComplete) return 1;
      return b.completedChallenges - a.completedChallenges;
    });

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("[leaderboard/GET]", error);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
