import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!validateAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { teamId } = await req.json();

    if (!teamId) {
      return NextResponse.json({ error: "teamId is required" }, { status: 400 });
    }

    // Reset a single team's progress
    await prisma.progress.deleteMany({ where: { teamId } });
    await prisma.hintUsage.deleteMany({ where: { teamId } });
    await prisma.team.update({
      where: { id: teamId },
      data: { completedAt: null },
    });

    return NextResponse.json({ message: "Team progress reset successfully" });
  } catch (error) {
    console.error("[admin/reset/POST]", error);
    return NextResponse.json({ error: "Failed to reset team" }, { status: 500 });
  }
}
