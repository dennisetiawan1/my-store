/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Atur lokasi src sebagai root pages
  experimental: {
    appDir: false,
  },
};
