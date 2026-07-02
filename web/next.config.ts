import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.64"],
  experimental: {
    viewTransition: true,
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      // { hostname: "source.unsplash.com" },
    ],
  },
};

export default nextConfig;
