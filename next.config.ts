import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
