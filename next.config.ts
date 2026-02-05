import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  serverExternalPackages: ['openid-client'],
};

export default nextConfig;
