/** Next.js image config to allow loading images from various sources */
module.exports = {
  images: {
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
