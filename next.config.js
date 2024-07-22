const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const webpackConfig = (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };
  }

  return config;
};

module.exports = withBundleAnalyzer({
  webpack: webpackConfig,
  // Additional Next.js configuration options can be added here
  // Example: images: { domains: ['example.com'] },
});
