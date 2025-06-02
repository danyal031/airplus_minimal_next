/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ["storage.service01.ir", "images.pexels.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "storage.service01.ir",
    //     pathname: "/**", // همه مسیرها در این دامنه مجاز هستند
    //   },
    // ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

export default nextConfig;
