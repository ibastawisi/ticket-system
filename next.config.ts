import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ["packt.local"],
  redirects: async () => [
    {
      source: "/login",
      destination: "/auth/login",
      permanent: true,
    },
    {
      source: "/logout",
      destination: "/auth/logout",
      permanent: true,
    },
  ],
};

export default nextConfig;
