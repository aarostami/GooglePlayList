import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
//   output: 'export',
  /* experimental: {
	serverActions: true,
	runtime: 'edge'
  }, */
  /* webpack: (config, { isServer }) => {
        if (!isServer) {
             config.resolve.fallback.fs = false
             config.resolve.fallback.dns = false
             config.resolve.fallback.net = false
             config.resolve.fallback.tls = false
        }

        return config;
    } */
};

export default nextConfig;
