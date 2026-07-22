import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iili.io",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // devIndicators: false,
};

export default nextConfig;
