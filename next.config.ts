import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@iden3/js-iden3-auth", "ffjavascript"],
  allowedDevOrigins: ["192.168.68.108"],
};

export default nextConfig;
