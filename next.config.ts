import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@iden3/js-iden3-auth", "ffjavascript"],
};

export default nextConfig;
