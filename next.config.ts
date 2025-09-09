import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable Turbo mode for faster builds
    turbo: {},
  },
  eslint: {
    // ❗ This allows production builds to succeed
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
    dirs: [], // Only run ESLint on the 'pages', 'utils', and 'lib' directories during production builds (next build)
  },
  typescript: {
    // ❗ This allows production builds to succeed
    // even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
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
