import { NextRequest } from "next/server";

export function getAdminToken(req: NextRequest): string | null {
  return req.headers.get("x-admin-token");
}

export function validateAdminToken(token: string | null): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !token) return false;
  return token === adminPassword;
}

export function getTeamToken(req: NextRequest): string | null {
  return (
    req.headers.get("x-team-token") ||
    req.cookies.get("team_token")?.value ||
    null
  );
}
