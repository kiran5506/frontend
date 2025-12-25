import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bsfye.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
    ],
    unoptimized: true
  },
};

export default nextConfig;
