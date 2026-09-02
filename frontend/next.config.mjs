/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'illustrations.popsy.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8006'}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/advocacia', destination: '/sites-para-advocacia', permanent: true },
      { source: '/clinicas', destination: '/sites-para-clinicas', permanent: true },
      { source: '/contabilidade', destination: '/sites-para-contabilidade', permanent: true },
      { source: '/ecommerce', destination: '/sites-para-ecommerce', permanent: true },
      { source: '/estetica', destination: '/sites-para-estetica', permanent: true },
      { source: '/odontologia', destination: '/sites-para-odontologia', permanent: true },
    ];
  },
};

export default nextConfig;
