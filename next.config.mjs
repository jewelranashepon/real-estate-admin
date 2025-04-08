/** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     webpackBuildWorker: true,
//     parallelServerBuildTraces: true,
//     parallelServerCompiles: true,
//   },
// };

// export default nextConfig;


import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true }, 
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow images over HTTPS
        hostname: "**", // Allow any domain
        pathname: "/**", // Allow images from any path on the domain
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);