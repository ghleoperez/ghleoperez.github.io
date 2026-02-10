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
  // Exclude problematic modules from being processed by webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Exclude Firebase storage from being processed (if not needed on client)
    // OR mark it as external
    config.externals = [...(config.externals || []), 
      // Add specific Firebase modules if they're server-only
    ];

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Try disabling modularizeImports for Firebase
  modularizeImports: {
    'firebase/app': {
      transform: 'firebase/app',
    },
    'firebase/auth': {
      transform: 'firebase/auth',
    },
    'firebase/firestore': {
      transform: 'firebase/firestore',
    },
    'firebase/storage': {
      transform: 'firebase/storage',
    },
  },
}

module.exports = nextConfig
