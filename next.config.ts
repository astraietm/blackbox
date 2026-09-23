import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow server-side only imports to be excluded from client bundle
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
