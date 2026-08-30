import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ❗ This allows production builds to succeed even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**",
      },
    ],
  },
};

export default nextConfig;

// Enables Cloudflare bindings in `next dev`. Only runs during local dev.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
