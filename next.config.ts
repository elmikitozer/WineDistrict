import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ⚠️ Désactive Strict Mode (retire les warnings mais cache des bugs potentiels)
  // reactStrictMode: false,

  compress: true, // Active la compression Gzip/Brotli
  images: {
    formats: ['image/avif', 'image/webp'], // ⬅️ Next servira AVIF/WebP si possible
    // Autorise les images hébergées sur Supabase Storage (public bucket)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
