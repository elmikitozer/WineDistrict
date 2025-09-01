import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],   // ⬅️ Next servira AVIF/WebP si possible
    // rien d'autre à config pour des images locales dans /public
  },
};

export default nextConfig;
