import type { NextConfig } from "next";

// Allow configuring the backend origin for Next.js rewrites.
// In docker-compose, leave unset to use "http://backend:8000" (service DNS).
// For local non-docker dev, set BACKEND_ORIGIN=http://localhost:8000 in frontend/.env.local
const backendOrigin = process.env.BACKEND_ORIGIN || "http://localhost:8000";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;