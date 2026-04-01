import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Exposes `VERCEL_ENV` to the client as `NEXT_PUBLIC_VERCEL_ENV` (ads: real vs test). */
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? "development",
  },
  turbopack: {
    root: __dirname,
  },
  /** CSP `frame-ancestors` for Contentful Live Preview is set in `src/middleware.ts` (also strips `X-Frame-Options`). */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
