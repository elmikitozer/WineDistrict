import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/:owner/:repo/:branch/**" },
      { protocol: "https", hostname: "media.githubusercontent.com", pathname: "/media/**" },
      { protocol: "https", hostname: "images.githubusercontent.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
