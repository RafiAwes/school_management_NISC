import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // basePath: '/auth', // Uncomment and set if your app is not at the root
  // trailingSlash: true, // Try adding this if routes without a slash fail
};

export default nextConfig;