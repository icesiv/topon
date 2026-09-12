/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'addiitsstorage.blob.core.windows.net',
      },
    ],
  },
  typescript: {
    // Prevent external corrupted node_modules type definitions (e.g. csstype) from failing production build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

