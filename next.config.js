/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static files are served from the public directory
  output: 'standalone',
  // Disable image optimization completely
  images: {
    unoptimized: true,
  },
  // Disable caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
  // Force reload on every request
  reactStrictMode: true,
  // Disable static optimization
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig
