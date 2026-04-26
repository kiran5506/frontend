import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb'
    }
  },
  images: {
    domains: ['bsfye.com', 'localhost', 'bsfye-bucket.s3.amazonaws.com', 'api.bsfye.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bsfye.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5003",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5004",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "api.bsfye.com",
        pathname: "/**",
      },
    ],
    localPatterns: [
      {
        pathname: '/assets/**',
      },
      {
        pathname: '/images/**',
      },
      {
        pathname: '/api/image-proxy',
        search: '**',
      },
    ],
    unoptimized: true
  },
};

export default nextConfig;
