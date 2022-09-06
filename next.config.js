/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.themealdb.com"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
