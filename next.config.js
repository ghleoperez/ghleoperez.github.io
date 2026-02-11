/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '',
  basePath: '',
  images: {
    domains: [
      'github.com',
      'raw.githubusercontent.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
