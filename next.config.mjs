/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'mammoth', '@anthropic-ai/sdk'],
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // node: 프리픽스를 제거해 webpack fallback이 처리할 수 있도록
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        })
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        stream: false,
        crypto: false,
        buffer: false,
        process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
