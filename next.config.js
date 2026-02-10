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
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Workaround for undici private fields
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/undici/,
      use: {
        loader: 'swc-loader',
      },
    });

    return config;
  },
  experimental: {
    // This helps with Firebase compatibility
    esmExternals: 'loose',
  },
}


module.exports = nextConfig;
