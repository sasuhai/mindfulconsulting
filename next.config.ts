import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable API routes for Google Photos integration
  // Static export doesn't support server-side API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
