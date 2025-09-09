import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❗ This allows production builds to succeed
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ❗ This allows production builds to succeed
    // even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['media.licdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/dms/image/**',
      },
    ],
  },
};

export default nextConfig;
