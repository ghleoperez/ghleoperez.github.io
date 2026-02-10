/** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   assetPrefix: '',
//   basePath: '',
// };

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig


module.exports = nextConfig;
