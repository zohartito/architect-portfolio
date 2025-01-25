/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
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
    ]
  },
}

module.exports = nextConfig
