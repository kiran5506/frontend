/** Next.js image config to allow loading images from localhost:5002 */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5004",
        pathname: "/uploads/**",
      },
    ],
  },
};
