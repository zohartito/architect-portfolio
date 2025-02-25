/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static files are served from the public directory
  output: 'standalone',
  // Configure static file serving
  async headers() {
    return [
      {
        source: '/:file(favicon\\.ico|robots\\.txt|manifest\\.json)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        // Disable caching for image files
        source: '/:path*.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
  // Disable image optimization for local development
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
