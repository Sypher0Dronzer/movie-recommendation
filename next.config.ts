// import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
//@ts-nocheck
import { PrismaPlugin} from '@prisma/nextjs-monorepo-workaround-plugin'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "davidkoepp.com",
      },
    ],

  },
  devIndicators: false,
    experimental: {
        authInterrupts: true,
    },
    turbopack: {},
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }
        return config;
    },
};

export default nextConfig;
