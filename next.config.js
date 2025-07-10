/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // 🔥 Ini WAJIB agar Vercel tahu pages kamu ada di `src/pages`
  // Tapi sebenarnya Next.js sudah autodetect kalau folder `src` ada
};

module.exports = nextConfig;
